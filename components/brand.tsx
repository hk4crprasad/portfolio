import Link from "next/link";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Haraprasad Hota home">
      <span className="brand-mark" aria-hidden="true">
        <span>H</span>
        <span>H</span>
      </span>
      <span className="brand-name">Haraprasad Hota</span>
    </Link>
  );
}
