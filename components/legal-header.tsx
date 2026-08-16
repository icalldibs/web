import Image from "next/image";
import Link from "next/link";

export function LegalHeader({ currentPage = "privacy" }: { currentPage?: "privacy" | "terms" | "company" }) {
  return (
    <header className="privacy-header">
      <Link className="privacy-header__brand" href="/" aria-label="Dibs home">
        <Image src="/branding/legal-header-logo.png" alt="" width={40} height={40} priority />
      </Link>

      <nav className="privacy-header__nav" aria-label="Primary navigation">
        <Link href="/privacy" aria-current={currentPage === "privacy" ? "page" : undefined}>Privacy</Link>
        <Link href="/terms" aria-current={currentPage === "terms" ? "page" : undefined}>Terms of Service</Link>
        <Link href="/company" aria-current={currentPage === "company" ? "page" : undefined}>Company</Link>
      </nav>

      <Link className="privacy-header__cta" href="/#hero-phone">
        <span>Home</span>
        <span className="privacy-header__cta-arrow" aria-hidden="true">→</span>
      </Link>
    </header>
  );
}