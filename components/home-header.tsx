import Image from "next/image";
import Link from "next/link";
import legalHeaderLogo from "@/public/branding/legal-header-logo.png";

export function HomeHeader() {
  return (
    <header className="home-header">
      <Link className="home-header__brand" href="/" aria-label="Dibs home">
        <Image
          className="home-header__logo"
          src={legalHeaderLogo}
          alt=""
          width={64}
          height={64}
          priority
        />
      </Link>
    </header>
  );
}