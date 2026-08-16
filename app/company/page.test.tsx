import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import CompanyPage, { metadata } from "./page";

afterEach(cleanup);

describe("CompanyPage", () => {
  it("shows the company page placeholder", () => {
    render(<CompanyPage />);

    expect(metadata.title).toBe("Company — Dibs");
    expect(screen.getByRole("heading", { level: 1, name: "Building this page rn!" })).toBeInTheDocument();
  });

  it("marks Company as the current page in shared navigation", () => {
    render(<CompanyPage />);

    const primaryNavigation = screen.getByRole("navigation", { name: "Primary navigation" });
    expect(within(primaryNavigation).getByRole("link", { name: "Company" })).toHaveAttribute("href", "/company");
    expect(within(primaryNavigation).getByRole("link", { name: "Company" })).toHaveAttribute("aria-current", "page");

    const footerNavigation = screen.getByRole("navigation", { name: "Legal" });
    expect(within(footerNavigation).getByRole("link", { name: "Company" })).toHaveAttribute("aria-current", "page");
  });
});