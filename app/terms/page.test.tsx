import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import TermsPage, { metadata } from "./page";

afterEach(cleanup);

describe("TermsPage", () => {
  it("renders the complete dated Terms of Service", () => {
    render(<TermsPage />);

    expect(metadata.title).toBe("Terms of Service — Dibs");
    expect(screen.getByRole("heading", { level: 1, name: "Terms of Service" })).toBeInTheDocument();
    expect(screen.getByText("August 16, 2026")).toHaveAttribute("datetime", "2026-08-16");

    const article = screen.getByRole("article");
    expect(within(article).getAllByRole("heading", { level: 2 })).toHaveLength(22);
    expect(within(article).getByRole("heading", { name: /1\. Accepting These Terms/ })).toBeInTheDocument();
    expect(within(article).getByRole("heading", { name: /22\. Contact/ })).toBeInTheDocument();
  });

  it("states the core alpha, marketplace, AI, and transaction terms", () => {
    render(<TermsPage />);

    const article = screen.getByRole("article");
    expect(article).toHaveTextContent("at least 16 years old");
    expect(article).toHaveTextContent("AI-powered marketplace");
    expect(article).toHaveTextContent("AI outputs may be incomplete, inaccurate, outdated, or wrong");
    expect(article).toHaveTextContent("does not currently process payments, hold user funds, provide escrow");
    expect(article).toHaveTextContent("You retain ownership of your User Content");
    expect(article).toHaveTextContent("US $100");
  });

  it("links to privacy and provides only the established contact information", () => {
    render(<TermsPage />);

    expect(screen.getAllByRole("link", { name: "Privacy Policy" })).not.toHaveLength(0);
    for (const link of screen.getAllByRole("link", { name: "Privacy Policy" })) {
      expect(link).toHaveAttribute("href", "/privacy");
    }
    expect(screen.getByRole("link", { name: "yutish@dibs.chat" })).toHaveAttribute("href", "mailto:yutish@dibs.chat");

    expect(document.body).not.toHaveTextContent("Draft placeholder");
    expect(document.body).not.toHaveTextContent("LLC");
    expect(document.body).not.toHaveTextContent("Inc.");
    expect(document.body).not.toHaveTextContent("Delaware");
    expect(document.body).not.toHaveTextContent("arbitration");
  });

  it("marks Terms of Service as the current legal page", () => {
    render(<TermsPage />);

    const primaryNavigation = screen.getByRole("navigation", { name: "Primary navigation" });
    expect(within(primaryNavigation).getByRole("link", { name: "Terms of Service" })).toHaveAttribute("aria-current", "page");
    expect(within(primaryNavigation).getByRole("link", { name: "Privacy" })).not.toHaveAttribute("aria-current");
  });
});