import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LegalHeader } from "./legal-header";

afterEach(cleanup);

describe("LegalHeader", () => {
  it("uses the Dibs brand image in the home link", () => {
    render(<LegalHeader />);

    expect(screen.getByRole("link", { name: "Dibs home" }).querySelector("img")).toHaveAttribute(
      "src",
      expect.stringContaining("legal-header-logo.png"),
    );
  });

  it("labels the home call to action for its destination", () => {
    render(<LegalHeader />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/#hero-phone");
    expect(screen.queryByRole("link", { name: "Text me!" })).not.toBeInTheDocument();
  });

  it("marks the requested legal page as current", () => {
    render(<LegalHeader currentPage="terms" />);

    expect(screen.getByRole("link", { name: "Terms of Service" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Privacy" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "Company" })).toHaveAttribute("href", "/company");
  });

  it("marks Company as current when requested", () => {
    render(<LegalHeader currentPage="company" />);

    expect(screen.getByRole("link", { name: "Company" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Privacy" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "Terms of Service" })).not.toHaveAttribute("aria-current");
  });
});