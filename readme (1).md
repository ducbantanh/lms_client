# Classroom Submission Server

A lightweight, LAN-based file submission server for classroom computer labs. Students can submit assignments through a web browser without Internet access, shared Windows folders, or additional software on student computers.

The server runs on a lecturer's Windows PC and receives submissions from multiple student computers over the local area network (LAN).

## 1. Overview

### 1.1. Main Features

* Operates entirely within a local network without Internet access.
* Supports multiple concurrent student connections.
* Provides a simple browser-based submission interface.
* Requires only Python 3 on the lecturer's computer.
* Requires no Python installation or additional software on student computers.
* Accepts student IDs and uploaded assignment files.
* Automatically creates the submission directory.
* Adds the student ID, timestamp, and original filename to each saved file.
* Prevents existing submissions from being overwritten.
* Supports a configurable maximum HTTP request size.
* Displays success or error messages after submission.

### 1.2. Intended Use

This software is intended for classroom exercises, programming labs, assignment collection, and other activities on a trusted LAN.

**Important:** This is a basic submission server, not a complete Learning Management System (LMS). It does not currently provide verified student accounts, a lecturer dashboard, online code grading, or an examination-lockdown environment.

## 2. System Architecture

```text
+-------------------------+
| Student Computer 1      |
| Chrome / Microsoft Edge |
+------------+------------+
             |
+-------------------------+
| Student Computer 2      |
| Chrome / Microsoft Edge |
+------------+------------+
             |
             | HTTP over LAN
             | TCP Port 8000
             |
+------------v------------+
| Lecturer's PC           |
| Windows 10 / Windows 11 |
| Python Submission Server|
+------------+------------+
             |
             v
+-------------------------+
| C:\LMS-Server\submissions|
|                         |
| Uploaded assignment files|
+-------------------------+
```

### How It Works

1. The lecturer starts the Python server.
2. The server listens for HTTP requests on port `8000`.
3. Students open the lecturer's IP address in their web browsers.
4. Each student enters a student ID and selects an assignment file.
5. The browser uploads the file to the lecturer's computer.
6. The server validates the request and generates a unique filename.
7. The file is saved in the `submissions` directory.
8. The browser displays the submission result.

Students do not need to access the lecturer's Windows shared folders. File transfers are handled through HTTP.

## 3. System Requirements

### Lecturer's Computer

* Windows 10 or Windows 11.
* Python 3.9 or later; Python 3.11 or later is recommended.
* A working Ethernet or Wi-Fi connection to the classroom LAN.
* Permission to configure Windows Firewall.
* Sufficient disk space for uploaded files.

### Student Computers

* Chrome, Microsoft Edge, Firefox, or another modern web browser.
* A network connection that can reach the lecturer's PC.
* No Python installation required.
* No additional client application required.

### Network Requirements

* Students and the lecturer must be on networks that permit communication between their computers.
* TCP port `8000` must be reachable on the lecturer's PC.
* Client isolation, VLAN restrictions, or network access policies must not block the connection.

Internet access is not required once the necessary files and Python installation are available.

## 4. Project Structure

Create the following directory structure:

```text
C:\LMS-Server\
├── README.md
├── submission_server.py
└── submissions\
```

The `submissions` directory is created automatically when the server starts.

Uploaded files are stored locally. They are not automatically synchronized to another computer or cloud service.

## 5. Complete Server Implementation

Create a file named `submission_server.py` and copy the following code into it.

The implementation uses Python's standard library and does not require Flask, Django, FastAPI, or third-party packages.

```python

"""
Classroom Submission Server
===========================
LAN-based exam viewer and assignment submission server.

Requirements:
    Python 3.9+
    No third-party packages required.

Run:
    python submission_server.py

Default address:
    http://127.0.0.1:8000

Folders:
    de-thi/       Exam files
    submissions/  Uploaded student assignments
"""

import html
import re
import uuid
import mimetypes

from datetime import datetime
from email import policy
from email.parser import BytesParser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import quote, unquote, urlparse


# ============================================================
# 1. CONFIGURATION
# ============================================================

HOST = "0.0.0.0"
PORT = 8000

BASE_DIR = Path(__file__).resolve().parent
EXAM_DIR = BASE_DIR / "de-thi"
UPLOAD_DIR = BASE_DIR / "submissions"

# Maximum size of the entire HTTP request, including form overhead.
MAX_REQUEST_SIZE = 50 * 1024 * 1024

# Maximum size of an original filename.
MAX_FILENAME_LENGTH = 150

# Supported exam formats.
ALLOWED_EXAM_EXTENSIONS = {
    ".pdf",
    ".txt",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
}

# Student IDs may contain letters, numbers, underscores and hyphens.
STUDENT_ID_PATTERN = re.compile(r"^[A-Za-z0-9_-]{1,30}$")

EXAM_DIR.mkdir(parents=True, exist_ok=True)
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


# ============================================================
# 2. HTML PAGE
# ============================================================

HTML_PAGE = r"""
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Classroom Submission Server</title>

<style>
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 24px 14px;
    background: #f1f5f9;
    color: #1e293b;
    font-family: Arial, Helvetica, sans-serif;
}

.container {
    max-width: 850px;
    margin: 20px auto;
}

.header {
    padding: 28px;
    background: #1e3a8a;
    color: white;
    border-radius: 12px 12px 0 0;
}

.header h1 {
    margin: 0 0 10px;
}

.header p {
    margin-bottom: 0;
    line-height: 1.6;
}

.card {
    margin-bottom: 20px;
    padding: 25px;
    background: white;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 4px 18px rgba(15, 23, 42, 0.06);
}

.card + .card {
    border-radius: 12px;
}

h2 {
    margin-top: 0;
    color: #1d4ed8;
}

label {
    display: block;
    margin: 18px 0 8px;
    font-weight: bold;
}

input[type="text"],
input[type="file"] {
    width: 100%;
    padding: 12px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background: white;
}

button {
    width: 100%;
    margin-top: 22px;
    padding: 14px;
    border: 0;
    border-radius: 6px;
    background: #2563eb;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}

button:hover {
    background: #1d4ed8;
}

.exam-list {
    padding-left: 0;
    list-style: none;
}

.exam-list li {
    margin: 10px 0;
    padding: 14px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow-wrap: anywhere;
}

.exam-list a {
    color: #1d4ed8;
    text-decoration: none;
    font-weight: bold;
}

.exam-list a:hover {
    text-decoration: underline;
}

.exam-type {
    display: block;
    margin-top: 5px;
    color: #64748b;
    font-size: 12px;
    font-weight: normal;
}

.notice {
    margin-top: 18px;
    padding: 13px;
    background: #eff6ff;
    color: #1e40af;
    border-radius: 6px;
    line-height: 1.6;
}

.footer {
    padding: 15px;
    color: #64748b;
    font-size: 12px;
    text-align: center;
}

@media (max-width: 600px) {
    .header, .card {
        padding: 20px;
    }

    .header h1 {
        font-size: 24px;
    }
}
</style>
</head>

<body>
<div class="container">

    <header class="header">
        <h1>Classroom Submission Server</h1>
        <p>
            View examination materials and submit your assignment
            through the classroom local network.
        </p>
    </header>

    <section class="card">
        <h2>Available Exams</h2>
        <p>Select an exam file below to open it in your browser.</p>

        {{EXAM_LIST}}
    </section>

    <section class="card">
        <h2>Submit Assignment</h2>

        <form action="/submit" method="post"
              enctype="multipart/form-data">

            <label for="student_id">Student ID</label>

            <input
                type="text"
                id="student_id"
                name="student_id"
                maxlength="30"
                pattern="[A-Za-z0-9_-]{1,30}"
                title="Use 1-30 letters, numbers, underscores or hyphens."
                autocomplete="off"
                required
            >

            <label for="assignment">Assignment File</label>

            <input
                type="file"
                id="assignment"
                name="assignment"
                required
            >

            <button type="submit">Submit Assignment</button>
        </form>

        <div class="notice">
            Check your student ID and selected file before submitting.
            Wait for the confirmation page after uploading.
        </div>
    </section>

    <footer class="footer">
        Classroom LAN Submission Service
    </footer>

</div>
</body>
</html>
"""


# ============================================================
# 3. EXAM FILE FUNCTIONS
# ============================================================

def get_exam_files():
    """Return supported exam files in the exam directory."""

    files = []

    try:
        for path in EXAM_DIR.iterdir():
            if not path.is_file():
                continue

            if path.suffix.lower() not in ALLOWED_EXAM_EXTENSIONS:
                continue

            # Do not expose symbolic links.
            if path.is_symlink():
                continue

            files.append(path)

    except OSError as exc:
        print(f"[ERROR] Cannot list exam files: {exc}")

    return sorted(files, key=lambda item: item.name.lower())


def make_exam_list():
    """Generate a safe HTML list of available exam files."""

    files = get_exam_files()

    if not files:
        return (
            '<p>No exam files are available.</p>'
            '<p>Please contact the lecturer.</p>'
        )

    items = []

    for path in files:
        filename = html.escape(path.name)
        extension = path.suffix.upper().lstrip(".")

        # URL-encode the filename so spaces and special characters work.
        file_url = "/exams/" + quote(path.name, safe="")

        items.append(
            '<li>'
            f'<a href="{file_url}" target="_blank" '
            'rel="noopener noreferrer">'
            f'{filename}'
            '</a>'
            f'<span class="exam-type">{extension} document</span>'
            '</li>'
        )

    return '<ul class="exam-list">' + "".join(items) + "</ul>"


# ============================================================
# 4. UPLOAD FUNCTIONS
# ============================================================

def sanitize_filename(filename):
    """Remove path components and unsafe filename characters."""

    filename = filename.replace("\\", "/").split("/")[-1]

    filename = re.sub(
        r'[\x00-\x1f<>:"|?*]',
        "_",
        filename
    )

    filename = filename.strip().strip(".")

    if not filename:
        filename = "uploaded_file"

    return filename[:MAX_FILENAME_LENGTH]


def make_result_page(title, message, success=False):
    """Generate a result page with escaped content."""

    color = "#15803d" if success else "#b91c1c"

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title>
<style>
body {{
    margin: 0;
    padding: 24px 14px;
    background: #f1f5f9;
    font-family: Arial, Helvetica, sans-serif;
}}
.box {{
    max-width: 650px;
    margin: 30px auto;
    padding: 28px;
    background: white;
    border-radius: 12px;
}}
h1 {{ color: {color}; }}
p {{ line-height: 1.7; overflow-wrap: anywhere; }}
a {{ color: #2563eb; }}
</style>
</head>
<body>
<main class="box">
<h1>{html.escape(title)}</h1>
<p>{html.escape(message)}</p>
<p><a href="/">Return to the main page</a></p>
</main>
</body>
</html>"""


# ============================================================
# 5. HTTP REQUEST HANDLER
# ============================================================

class SubmissionHandler(BaseHTTPRequestHandler):
    """Handle exam viewing and assignment submissions."""

    server_version = "ClassroomSubmissionServer"
    sys_version = ""

    def log_message(self, format_string, *args):
        message = format_string % args

        print(
            f"[{self.log_date_time_string()}] "
            f"{self.client_address[0]} - {message}"
        )

    def send_html(self, status_code, content):
        body = content.encode("utf-8")

        self.send_response(status_code)
        self.send_header(
            "Content-Type",
            "text/html; charset=utf-8"
        )
        self.send_header("Content-Length", str(len(body)))
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()

        self.wfile.write(body)

    def do_GET(self):
        """Serve the home page or an exam file."""

        path = urlparse(self.path).path

        if path == "/":
            page = HTML_PAGE.replace(
                "{{EXAM_LIST}}",
                make_exam_list()
            )

            self.send_html(200, page)
            return

        if path.startswith("/exams/"):
            self.serve_exam(path)
            return

        self.send_html(
            404,
            make_result_page(
                "Page Not Found",
                "The requested page does not exist."
            )
        )

    def serve_exam(self, request_path):
        """Serve only supported files directly inside EXAM_DIR."""

        encoded_name = request_path[len("/exams/"):]
        filename = unquote(encoded_name)

        # Reject empty names and directory traversal.
        if (
            not filename
            or filename in {".", ".."}
            or "/" in filename
            or "\\" in filename
        ):
            self.send_html(
                403,
                make_result_page(
                    "Forbidden",
                    "Invalid exam file path."
                )
            )
            return

        exam_path = EXAM_DIR / filename

        try:
            # Do not follow symbolic links.
            if exam_path.is_symlink():
                raise PermissionError("Symbolic links are not allowed.")

            resolved_path = exam_path.resolve(strict=True)

            if resolved_path.parent != EXAM_DIR.resolve():
                raise PermissionError("Invalid exam directory.")

            if not resolved_path.is_file():
                raise FileNotFoundError("Exam file not found.")

            if resolved_path.suffix.lower() not in ALLOWED_EXAM_EXTENSIONS:
                raise PermissionError("File type not allowed.")

            data = resolved_path.read_bytes()

        except FileNotFoundError:
            self.send_html(
                404,
                make_result_page(
                    "Exam Not Found",
                    "The requested exam file does not exist."
                )
            )
            return

        except (OSError, PermissionError):
            self.send_html(
                403,
                make_result_page(
                    "Access Denied",
                    "The requested exam file cannot be accessed."
                )
            )
            return

        content_type = mimetypes.guess_type(resolved_path.name)[0]

        if not content_type:
            content_type = "application/octet-stream"

        # Treat text files as UTF-8.
        if resolved_path.suffix.lower() == ".txt":
            content_type = "text/plain; charset=utf-8"

        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Content-Disposition", "inline")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()

        self.wfile.write(data)

        print(f"[EXAM] Viewed: {resolved_path.name}")

    def do_POST(self):
        """Receive and save a student assignment."""

        path = urlparse(self.path).path

        if path != "/submit":
            self.send_html(
                404,
                make_result_page(
                    "Page Not Found",
                    "The requested endpoint does not exist."
                )
            )
            return

        content_length = self.headers.get("Content-Length")

        if content_length is None:
            self.send_html(
                411,
                make_result_page(
                    "Invalid Request",
                    "Content-Length is required."
                )
            )
            return

        try:
            request_size = int(content_length)
        except ValueError:
            self.send_html(
                400,
                make_result_page(
                    "Invalid Request",
                    "Invalid Content-Length."
                )
            )
            return

        if request_size <= 0:
            self.send_html(
                400,
                make_result_page(
                    "Invalid Request",
                    "The request body is empty."
                )
            )
            return

        if request_size > MAX_REQUEST_SIZE:
            self.send_html(
                413,
                make_result_page(
                    "File Too Large",
                    "The request exceeds the 50 MiB limit."
                )
            )
            return

        content_type = self.headers.get("Content-Type", "")

        if not content_type.lower().startswith("multipart/form-data"):
            self.send_html(
                415,
                make_result_page(
                    "Unsupported Request",
                    "Please use the assignment submission form."
                )
            )
            return

        try:
            body = self.rfile.read(request_size)

            if len(body) != request_size:
                self.send_html(
                    400,
                    make_result_page(
                        "Incomplete Upload",
                        "The upload was incomplete. Please try again."
                    )
                )
                return

            # Parse multipart form data using Python's standard library.
            message_bytes = (
                b"Content-Type: "
                + content_type.encode("latin-1")
                + b"\r\nMIME-Version: 1.0\r\n\r\n"
                + body
            )

            message = BytesParser(
                policy=policy.default
            ).parsebytes(message_bytes)

            if not message.is_multipart():
                raise ValueError("Invalid multipart form data.")

            student_id = None
            uploaded_filename = None
            uploaded_data = None

            for part in message.iter_parts():
                if part.get_content_disposition() != "form-data":
                    continue

                field_name = part.get_param(
                    "name",
                    header="content-disposition"
                )

                filename = part.get_filename()

                if field_name == "student_id" and filename is None:
                    raw_value = part.get_payload(decode=True) or b""

                    charset = part.get_content_charset() or "utf-8"

                    student_id = raw_value.decode(
                        charset,
                        errors="replace"
                    ).strip()

                elif field_name == "assignment" and filename is not None:
                    uploaded_filename = sanitize_filename(filename)
                    uploaded_data = part.get_payload(decode=True)

            if (
                not student_id
                or not STUDENT_ID_PATTERN.fullmatch(student_id)
            ):
                self.send_html(
                    400,
                    make_result_page(
                        "Invalid Student ID",
                        "Use 1-30 letters, numbers, underscores or hyphens."
                    )
                )
                return

            if uploaded_data is None or not uploaded_filename:
                self.send_html(
                    400,
                    make_result_page(
                        "Missing File",
                        "Please select an assignment file."
                    )
                )
                return

            if len(uploaded_data) == 0:
                self.send_html(
                    400,
                    make_result_page(
                        "Empty File",
                        "The selected file is empty."
                    )
                )
                return

            timestamp = datetime.now().strftime(
                "%Y%m%d-%H%M%S-%f"
            )

            unique_suffix = uuid.uuid4().hex[:8]

            saved_filename = (
                f"{student_id}_{timestamp}_"
                f"{unique_suffix}_{uploaded_filename}"
            )

            saved_path = UPLOAD_DIR / saved_filename

            # Exclusive creation prevents overwriting existing files.
            with saved_path.open("xb") as output_file:
                output_file.write(uploaded_data)

            print(
                f"[UPLOAD] Student ID: {student_id} | "
                f"File: {saved_filename} | "
                f"Size: {len(uploaded_data)} bytes"
            )

            self.send_html(
                200,
                make_result_page(
                    "Submission Successful",
                    f"Your file has been received. "
                    f"Student ID: {student_id}. "
                    f"Saved filename: {saved_filename}. "
                    f"Please keep this page as confirmation.",
                    success=True
                )
            )

        except (BrokenPipeError, ConnectionResetError):
            print("[WARNING] Client disconnected during upload.")

        except Exception as exc:
            print(f"[ERROR] Upload failed: {exc}")

            try:
                self.send_html(
                    500,
                    make_result_page(
                        "Submission Failed",
                        "The server could not save your file. "
                        "Please contact the lecturer."
                    )
                )
            except (BrokenPipeError, ConnectionResetError):
                pass


# ============================================================
# 6. SERVER STARTUP
# ============================================================

def main():
    """Start the classroom submission server."""

    print("=" * 60)
    print("CLASSROOM SUBMISSION SERVER")
    print("=" * 60)
    print(f"Server port : {PORT}")
    print(f"Exam folder : {EXAM_DIR}")
    print(f"Upload folder: {UPLOAD_DIR}")
    print(f"Request limit: {MAX_REQUEST_SIZE // (1024 * 1024)} MiB")
    print()
    print(f"Local URL: http://127.0.0.1:{PORT}")
    print("LAN URL  : http://<LECTURER_IP>:8000")
    print()
    print("Press Ctrl+C to stop the server.")
    print("=" * 60)

    try:
        server = ThreadingHTTPServer(
            (HOST, PORT),
            SubmissionHandler
        )
    except OSError as exc:
        print(f"[ERROR] Could not start server: {exc}")
        print("Check whether port 8000 is already in use.")
        return

    server.daemon_threads = True

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
    finally:
        server.server_close()
        print("Server stopped.")


if __name__ == "__main__":
    main()

### 5.1. Implementation Notes

* `ThreadingHTTPServer` allows multiple clients to be handled concurrently.
* `BytesParser` parses multipart form submissions using Python's standard library, avoiding dependence on the removed `cgi` module in newer Python versions.
* `STUDENT_ID_PATTERN` restricts the characters accepted in student IDs.
* `sanitize_filename()` removes path components and problematic filename characters.
* The generated filename includes a timestamp and random suffix to reduce collisions.
* Files are created using exclusive mode (`"xb"`), which refuses to overwrite an existing file.
* The request-size limit applies to the entire HTTP request, including multipart form overhead.
* The server logs successful uploads and HTTP activity in the Command Prompt window.

The code does not verify whether a student ID belongs to the official class list. A student can enter another student's ID, so the server should not be treated as an authenticated examination system.

## 6. Installation

### Step 1. Check Python

Open Command Prompt and run:

```bat
python --version
```

If that command does not work, try:

```bat
py --version
```

If Python is not installed, install a compatible Python 3 release before the classroom session. For a fully offline environment, prepare the installer beforehand.

### Step 2. Create the Project Directory

Run:

```bat
mkdir C:\LMS-Server
cd /d C:\LMS-Server
```

Save the Python implementation in:

```text
C:\LMS-Server\submission_server.py
```

Save this documentation as:

```text
C:\LMS-Server\README.md
```

**Important:** Windows may hide filename extensions. Verify that the script is named `submission_server.py`, not `submission_server.py.txt`.

### Step 3. Verify the Script

Run:

```bat
cd /d C:\LMS-Server
python -m py_compile submission_server.py
```

If the command completes without an error message, the file passes Python's syntax compilation check.

This check does not guarantee that the server will start successfully, but it helps detect syntax errors before class.

### Step 4. Check the Upload Directory

The server automatically creates:

```text
C:\LMS-Server\submissions
```

The Windows account running Python must have permission to write to this directory.

## 7. Start the Server

Open Command Prompt and execute:

```bat
cd /d C:\LMS-Server
python submission_server.py
```

Expected output resembles:

```text
============================================================
CLASSROOM SUBMISSION SERVER
============================================================
Server port : 8000
Upload path : C:\LMS-Server\submissions
Request limit: 50 MiB

Open this address on the lecturer's computer:
    http://127.0.0.1:8000

Find the lecturer's LAN IP using: ipconfig
Students should open: http://<LECTURER_IP>:8000

Press Ctrl+C to stop the server.
============================================================
```

The exact upload path depends on where the script is saved.

Keep the Command Prompt window open throughout the submission period. Closing it will stop the server.

To stop the server safely, press:

```text
Ctrl+C
```

## 8. Configure Windows Firewall

Windows Firewall may block incoming connections even when the server is running correctly.

### Step 1. Open PowerShell as Administrator

Open the Start menu, search for PowerShell, right-click it, and select **Run as administrator**.

### Step 2. Check the Network Profile

Run:

```powershell
Get-NetConnectionProfile
```

If the classroom LAN is a trusted network and your institution permits it, configure the relevant network profile as Private.

For example, after confirming the correct interface:

```powershell
Set-NetConnectionProfile `
  -InterfaceIndex 12 `
  -NetworkCategory Private
```

Replace `12` with the actual interface index. Do not change the profile blindly on a managed university network.

### Step 3. Create a Firewall Rule

Run PowerShell as Administrator:

```powershell
New-NetFirewallRule `
  -DisplayName "Classroom Submission Server" `
  -Direction Inbound `
  -Protocol TCP `
  -LocalPort 8000 `
  -Action Allow `
  -Profile Private
```

This rule permits inbound TCP traffic on port `8000` for the Private network profile.

It does not guarantee that institutional network policies or endpoint-security software will permit the connection.

### Step 4. Verify the Rule

```powershell
Get-NetFirewallRule `
  -DisplayName "Classroom Submission Server"
```

### Step 5. Remove the Rule After Class

If the server is no longer needed:

```powershell
Remove-NetFirewallRule `
  -DisplayName "Classroom Submission Server"
```

Do not disable Windows Firewall entirely just to make the server accessible.

## 9. Find the Lecturer's IP Address

On the lecturer's PC, open Command Prompt and run:

```bat
ipconfig
```

Identify the network adapter connected to the classroom LAN. Look for its IPv4 address.

Example:

```text
Ethernet adapter Ethernet:

   IPv4 Address. . . . . . . . . . . : 192.168.1.10
```

The address above is only an example. Use the actual IPv4 address shown on the lecturer's PC.

If the computer has multiple network adapters, do not automatically select an address belonging to a VPN, Docker network, virtual machine, or disconnected adapter.

## 10. Access the Submission Page

### 10.1. Test on the Lecturer's PC

Open a browser and visit:

```text
http://127.0.0.1:8000
```

If the submission form appears, the local web service is responding.

### 10.2. Test from a Student Computer

On each student computer:

1. Open Chrome, Microsoft Edge, Firefox, or another modern browser.
2. Enter the lecturer's IPv4 address and port.
3. Open the submission page.
4. Enter the student ID.
5. Select the assignment file.
6. Click **Submit Assignment**.
7. Wait for the confirmation page.

Example URL:

```text
http://192.168.1.10:8000
```

Replace `192.168.1.10` with the actual address of the lecturer's PC.

### 10.3. Confirm the Submission

After a successful upload, the browser displays a confirmation message and the saved filename.

The lecturer can inspect the `submissions` directory to verify that the file exists.

For important assessments, the lecturer should also verify the actual files and maintain an appropriate backup.

## 11. Submission Storage and Filename Format

All submissions are stored in:

```text
C:\LMS-Server\submissions
```

The generated filename follows this pattern:

```text
STUDENTID_YYYYMMDD-HHMMSS-microseconds_RANDOM_ORIGINALFILENAME
```

Example:

```text
20260001_20261010-083000-123456_a1b2c3d4_assignment.c
```

The timestamp uses the lecturer's computer's local system time.

The generated name helps distinguish submissions from the same student and makes it less likely that simultaneous uploads will have the same filename.

### Multiple Submissions

The server permits a student to submit multiple files. It does not enforce a one-submission-per-student policy.

Existing files are not overwritten intentionally. However, a successful upload is not proof that the submitted contents are correct or that the submission was made by the person identified by the student ID.

### Organizing Submissions

The current implementation saves all files in one directory. For a large class, a later version could separate files by course, class, assessment, and student ID.

## 12. Upload Limits

The default maximum request size is:

```python
MAX_REQUEST_SIZE = 50 * 1024 * 1024
```

This is 50 MiB, or 52,428,800 bytes, for the entire HTTP request. The maximum assignment file itself must be smaller than this limit because multipart form data adds overhead.

To increase the limit to approximately 100 MiB, change it to:

```python
MAX_REQUEST_SIZE = 100 * 1024 * 1024
```

Restart the server after changing the configuration.

Be cautious when increasing this limit. Concurrent large uploads consume memory because the current implementation reads the request body and parses the multipart content in memory.

## 13. Testing Multiple Students

Before the real classroom session, perform a short test with several student computers.

Recommended procedure:

1. Start the server on the lecturer's PC.
2. Verify the page using `127.0.0.1`.
3. Test access from one student computer.
4. Submit a small text file.
5. Verify the filename and file contents.
6. Submit two files using the same student ID.
7. Confirm that both files are preserved.
8. Test several simultaneous uploads.
9. Test the intended maximum file size.
10. Verify that the server remains responsive and that disk space is sufficient.

For a class of approximately 50 students, run a simultaneous submission test before relying on the server for a graded assessment. The implementation uses concurrent request handling, but actual capacity depends on computer performance, file sizes, disk speed, and network configuration.

## 14. Troubleshooting

### 14.1. The Website Does Not Open

Check the following:

* The server process is still running.
* The correct IP address and port are being used.
* The student computer can communicate with the lecturer's computer.
* Windows Firewall permits inbound TCP port `8000`.
* No other application is occupying port `8000`.
* The network does not isolate student clients from the lecturer's computer.

Test locally first:

```text
http://127.0.0.1:8000
```

Then test from a student computer using the lecturer's actual LAN IP address.

### 14.2. Ping Works, but the Website Does Not Open

A successful ping does not guarantee that TCP port `8000` is accessible.

On the student computer, open PowerShell and run:

```powershell
Test-NetConnection 192.168.1.10 -Port 8000
```

Replace the example IP address with the lecturer's actual address.

Look for:

```text
TcpTestSucceeded : True
```

If it is `False`, check the server, firewall, IP address, and network policies.

### 14.3. The Lecturer's PC Can Open the Page, but Students Cannot

The server may be running correctly, but incoming LAN connections may be blocked.

Check:

* The lecturer's LAN IPv4 address.
* The inbound firewall rule.
* The network profile.
* Whether the classroom network allows communication between student devices and the lecturer's PC.
* Whether a university-managed firewall or VLAN prevents access.

Do not assume that changing folder-sharing permissions will solve an HTTP connectivity problem.

### 14.4. The Server Cannot Start

If the server reports that the address or port is already in use, check:

```bat
netstat -ano | findstr :8000
```

The last column contains the process ID (PID). Identify the process before stopping it. Do not terminate an unknown process blindly.

If port `8000` is already in use, stop the conflicting application or change `PORT` in the Python script. Update the firewall rule and the URL accordingly.

### 14.5. The Server Cannot Save Files

Check that:

* The upload directory exists or can be created.
* The Windows account running Python has write permission.
* The disk has sufficient free space.
* The request does not exceed the configured size limit.
* The server console does not display an upload error.

### 14.6. A File Is Rejected as Too Large

The limit applies to the entire HTTP request, not just the assignment file.

Reduce the file size or adjust `MAX_REQUEST_SIZE`. Remember that large concurrent uploads may require additional memory.

### 14.7. The Student Sees an Error After Clicking Submit

Ask the student to record the error message and inform the lecturer.

Check the lecturer's Command Prompt for the corresponding request or error. If the browser disconnected before receiving a response, verify whether the file was saved before asking the student to resubmit.

## 15. Security Considerations

This software is intended for controlled classroom LAN environments.

### Current Limitations

* **No authentication:** Anyone who can reach the service may attempt to submit files.
* **Unverified student IDs:** The server does not check an official class list.
* **Unencrypted HTTP:** Files and student IDs are not encrypted in transit.
* **No malware scanning:** Uploaded files are not inspected for malicious content.
* **No deadline enforcement:** The server does not implement submission deadlines.
* **No attempt limits:** Students can submit multiple times.
* **Memory usage:** Upload bodies are buffered in memory.
* **No persistent audit database:** Activity is logged to the console but not maintained in a dedicated database.
* **No administrative dashboard:** There is no built-in interface for viewing, deleting, or exporting submissions.

### Recommended Precautions

* Run the service only on a trusted, controlled LAN.
* Restrict access through Windows Firewall and institutional network policies.
* Avoid exposing port `8000` to the public Internet.
* Back up submitted files after the session.
* Keep the operating system and Python installation updated.
* Do not execute uploaded programs directly on the lecturer's computer.
* For code grading, run student programs in appropriately isolated execution environments.

For official examinations or long-term deployment, add student authentication, class-list validation, access control, submission receipts, audit logging, backup procedures, and isolated code execution.

## 16. Frequently Asked Questions

### Do students need Python?

No. Only the lecturer's computer needs Python. Students use a web browser.

### Does the system require Internet access?

No. It operates over the LAN, provided the computers can communicate and the server is reachable.

### Do students need access to a shared Windows folder?

No. Files are uploaded through HTTP and saved by the server.

### Can multiple students submit at the same time?

Yes, the server uses threaded request handling. However, test with realistic file sizes and simultaneous clients before a graded session.

### Can students submit the same filename?

Yes. The server generates a distinct name for each submission and uses exclusive file creation to prevent overwriting an existing file.

### Can the server automatically grade programming assignments?

Not in its current form. A future version could integrate a separate grading service with isolated execution environments, test cases, time limits, and memory limits.

### Can this become part of a larger LMS?

Yes. The submission service could later be integrated with a frontend, authentication service, database, assignment management, and grading components.

## 17. Future Improvements

Potential extensions include:

* Lecturer dashboard for viewing and downloading submissions.
* Student authentication and official class-list validation.
* Assignment-specific folders.
* Submission deadlines and attempt limits.
* Configurable file extensions and file-size limits.
* ZIP archive support.
* Submission receipts and downloadable confirmation records.
* Persistent audit logs and CSV export.
* HTTPS and stronger access controls.
* Database integration.
* Automated code grading for C, C++, Java, Python, and other supported languages.
* Isolated execution environments for student code.
* Integration with a larger Learning Management System (LMS).

## License

Choose and specify an appropriate open-source license before redistributing this software.
