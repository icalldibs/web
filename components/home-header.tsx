import Image from "next/image";
import Link from "next/link";

export function HomeHeader() {
  return (
    <header className="home-header">
      <Link className="home-header__brand" href="/" aria-label="Dibs home">
        <Image
          className="home-header__logo"
          src="/branding/legal-header-logo.png"
          alt=""
          width={64}
          height={64}
          priority
        />
      </Link>
    </header>
  );
}