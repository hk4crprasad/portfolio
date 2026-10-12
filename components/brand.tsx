import Link from "next/link";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Haraprasad Hota home">
      <span className="brand-mark" aria-hidden="true">
        <svg width="34" height="34" viewBox="0 0 34 34" focusable="false">
          <path d="M9 8h3v6h6V8h3v17h-3v-8h-6v8H9z" fill="currentColor" />
          <path d="M15 14h3v5h5v-5h3v14h-3v-6h-5v6h-3z" fill="var(--lime)" />
        </svg>
      </span>
      <span className="brand-name">Haraprasad Hota</span>
    </Link>
  );
}
