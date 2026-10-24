'use client';

import { useEffect, useRef, useState } from 'react';
import type { CodeLanguage } from '@/lib/code';

/** Tải CodeMirror một lần, khi trang đầu tiên cần tới; các trang khác không phải tải. */
let loading: Promise<CodeMirror> | null = null;

async function importCodeMirror() {
  const [core, state, view, commands, language, cpp, java, python] = await Promise.all([
    import('codemirror'),
    import('@codemirror/state'),
    import('@codemirror/view'),
    import('@codemirror/commands'),
    import('@codemirror/language'),
    import('@codemirror/lang-cpp'),
    import('@codemirror/lang-java'),
    import('@codemirror/lang-python'),
  ]);
  return { core, state, view, commands, language, cpp, java, python };
}

type CodeMirror = Awaited<ReturnType<typeof importCodeMirror>>;

function loadCodeMirror() {
  loading ??= importCodeMirror();
  return loading;
}

function languageExtension(cm: CodeMirror, language: CodeLanguage) {
  switch (language) {
    case 'java':
      return cm.java.java();
    case 'python':
      return cm.python.python();
    default:
      return cm.cpp.cpp();
  }
}

/**
 * Ô soạn code kiểu IDE (CodeMirror 6): số dòng, tô màu cú pháp, tự đóng ngoặc và dấu nháy, tự thụt lề khi xuống
 * dòng, Tab / Shift+Tab thụt lề, tô cặp ngoặc khớp, gập khối, Ctrl+F tìm/thay, Ctrl+/ comment, gợi ý từ.
 * Ctrl+Enter gọi onRun (chạy thử). readOnly: chỉ xem (mã nguồn bài đã nộp).
 */
export function CodeEditor({
  value,
  onChange,
  language,
  readOnly = false,
  onRun,
  label,
  fontSize = 14,
  minHeight = 360,
}: {
  value: string;
  onChange?: (value: string) => void;
  language: CodeLanguage;
  readOnly?: boolean;
  onRun?: () => void;
  label: string;
  fontSize?: number;
  minHeight?: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const editor = useRef<{
    cm: CodeMirror;
    view: InstanceType<CodeMirror['view']['EditorView']>;
    language: InstanceType<CodeMirror['state']['Compartment']>;
    options: InstanceType<CodeMirror['state']['Compartment']>;
  } | null>(null);
  const [ready, setReady] = useState(false);
  const callbacks = useRef({ onChange, onRun });
  useEffect(() => {
    callbacks.current = { onChange, onRun };
  });
  // Giá trị lúc tạo trình soạn; sau đó đồng bộ ở effect bên dưới
  const initial = useRef({ value, language, readOnly, fontSize, minHeight, label });

  useEffect(() => {
    let cancelled = false;
    void loadCodeMirror().then((cm) => {
      if (cancelled || !host.current) return;
      const { EditorState, Compartment, Prec } = cm.state;
      const { EditorView, keymap } = cm.view;
      const start = initial.current;
      const languageSlot = new Compartment();
      const optionsSlot = new Compartment();
      const view = new EditorView({
        parent: host.current,
        state: EditorState.create({
          doc: start.value,
          extensions: [
            // Ctrl+Enter chạy thử, Tab thụt lề (thay vì chuyển ô) — ưu tiên hơn phím tắt mặc định
            Prec.highest(
              keymap.of([
                {
                  key: 'Mod-Enter',
                  run: () => {
                    callbacks.current.onRun?.();
                    return !!callbacks.current.onRun;
                  },
                },
                cm.commands.indentWithTab,
              ]),
            ),
            cm.core.basicSetup,
            cm.language.indentUnit.of('    '),
            EditorState.tabSize.of(4),
            languageSlot.of(languageExtension(cm, start.language)),
            optionsSlot.of(editorOptions(cm, start.readOnly, start.fontSize, start.minHeight)),
            EditorView.contentAttributes.of({
              'aria-label': start.label,
              autocapitalize: 'off',
              autocorrect: 'off',
            }),
            EditorView.updateListener.of((update) => {
              if (update.docChanged) callbacks.current.onChange?.(update.state.doc.toString());
            }),
          ],
        }),
      });
      editor.current = { cm, view, language: languageSlot, options: optionsSlot };
      setReady(true);
    });
    return () => {
      cancelled = true;
      editor.current?.view.destroy();
      editor.current = null;
    };
  }, []);

  // Giá trị đổi từ ngoài (đổi ngôn ngữ, chọn lần nộp khác): thay toàn bộ nội dung
  useEffect(() => {
    const e = editor.current;
    if (!e) return;
    const current = e.view.state.doc.toString();
    if (current !== value)
      e.view.dispatch({ changes: { from: 0, to: current.length, insert: value } });
  }, [value, ready]);

  useEffect(() => {
    const e = editor.current;
    if (!e) return;
    e.view.dispatch({
      effects: [
        e.language.reconfigure(languageExtension(e.cm, language)),
        e.options.reconfigure(editorOptions(e.cm, readOnly, fontSize, minHeight)),
      ],
    });
  }, [language, readOnly, fontSize, minHeight, ready]);

  return (
    <div className={`code-editor${readOnly ? ' readonly' : ''}`} ref={host}>
      {!ready && (
        <pre className="code-editor-loading" style={{ minHeight }} aria-label={label}>
          {value}
        </pre>
      )}
    </div>
  );
}

function editorOptions(cm: CodeMirror, readOnly: boolean, fontSize: number, minHeight: number) {
  const { EditorState } = cm.state;
  const { EditorView } = cm.view;
  return [
    EditorState.readOnly.of(readOnly),
    EditorView.editable.of(!readOnly),
    EditorView.theme({
      '&': { fontSize: `${fontSize}px` },
      '.cm-content, .cm-gutter': { minHeight: `${minHeight}px` },
      '.cm-scroller': { fontFamily: 'var(--mono)', lineHeight: '1.55', maxHeight: '70vh' },
    }),
  ];
}
