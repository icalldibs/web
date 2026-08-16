import Image from "next/image";
import { HeroShowcase } from "@/components/hero-showcase";
import { HomeHeader } from "@/components/home-header";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <main className="blank-page">
      <HomeHeader />

      <Image
        className="home-location-badge"
        src="/branding/miami-live.png"
        alt="Miami, Florida — Live"
        width={1774}
        height={887}
        unoptimized
        priority
      />

      <HeroShowcase />
      <SiteFooter />
    </main>
  );
}