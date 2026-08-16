import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { HomeHeader } from "./home-header";

afterEach(cleanup);

describe("HomeHeader", () => {
  it("renders the Dibs brand image instead of a logo placeholder", () => {
    render(<HomeHeader />);

    const homeLink = screen.getByRole("link", { name: "Dibs home" });

    expect(homeLink).toHaveAttribute("href", "/");
    expect(homeLink.querySelector("img")).toHaveAttribute(
      "src",
      expect.stringContaining("legal-header-logo.png"),
    );
    expect(screen.queryByText("LOGO")).not.toBeInTheDocument();
  });
});