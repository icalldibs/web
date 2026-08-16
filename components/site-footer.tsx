import Link from "next/link";

export function SiteFooter({ currentPage }: { currentPage?: "privacy" | "terms" | "company" }) {
  return (
    <footer className={`site-footer${currentPage ? " site-footer--legal-page" : ""}`}>
      <nav aria-label="Legal">
        <Link href="/privacy" aria-current={currentPage === "privacy" ? "page" : undefined}>Privacy</Link>
        <Link href="/terms" aria-current={currentPage === "terms" ? "page" : undefined}>Terms of Service</Link>
        <Link href="/company" aria-current={currentPage === "company" ? "page" : undefined}>Company</Link>
      </nav>
    </footer>
  );
}