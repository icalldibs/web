import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SiteFooter } from "./site-footer";

afterEach(cleanup);

describe("SiteFooter", () => {
  it("shows the legal links side by side", () => {
    render(<SiteFooter />);

    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy");
    expect(screen.getByRole("link", { name: "Terms of Service" })).toHaveAttribute("href", "/terms");
    expect(screen.getByRole("link", { name: "Company" })).toHaveAttribute("href", "/company");
  });

  it("marks privacy as the current page when requested", () => {
    render(<SiteFooter currentPage="privacy" />);

    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Terms of Service" })).not.toHaveAttribute("aria-current");
  });

  it("marks Terms of Service as the current page when requested", () => {
    render(<SiteFooter currentPage="terms" />);

    expect(screen.getByRole("link", { name: "Terms of Service" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Privacy" })).not.toHaveAttribute("aria-current");
  });

  it("marks Company as the current page when requested", () => {
    render(<SiteFooter currentPage="company" />);

    expect(screen.getByRole("link", { name: "Company" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Privacy" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "Terms of Service" })).not.toHaveAttribute("aria-current");
  });
});