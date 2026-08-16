import type { Metadata } from "next";
import { LegalHeader } from "@/components/legal-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Company — Dibs",
  description: "The Dibs company page is under construction.",
};

export default function CompanyPage() {
  return (
    <div className="privacy-page">
      <LegalHeader currentPage="company" />
      <main id="main-content" className="company-main">
        <h1>Building this page rn!</h1>
      </main>
      <SiteFooter currentPage="company" />
    </div>
  );
}