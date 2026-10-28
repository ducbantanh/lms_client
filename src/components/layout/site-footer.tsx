export function SiteFooter() {
  return (
    <footer className="mx-auto w-[min(1200px,calc(100%-48px))] max-md:w-[calc(100%-32px)] flex justify-between gap-4 border-t border-line py-5 text-[13px] text-ink-muted text-xs max-md:flex-col max-md:gap-0.5 max-md:text-center">
      <span>© {new Date().getFullYear()} F LMS</span>
      <span>Khoa Công nghệ Thông tin</span>
    </footer>
  );
}
