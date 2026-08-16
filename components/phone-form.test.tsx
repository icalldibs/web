import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PhoneForm } from "./phone-form";

afterEach(cleanup);

describe("PhoneForm", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.stubEnv("NEXT_PUBLIC_DIBS_API_URL", "https://api.example.test");
  });

  it("renders the phone field, supporting copy, and submit action", () => {
    render(<PhoneForm id="test-phone" />);

    expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
    const hint = document.getElementById("test-phone-hint");
    expect(hint).toHaveClass("phone-form__hint");
    expect(hint).toHaveTextContent("Buy or Sell anything by texting dibs");
    expect(screen.getByText("Buy")).toHaveClass("phone-form__hint-action--buy");
    expect(screen.getByText("Sell")).toHaveClass("phone-form__hint-action--sell");
    expect(screen.queryByText("if he wants too.")).not.toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(document.querySelector(".phone-form__icon")).toHaveAttribute("src", expect.stringContaining("images.jpeg"));
    expect(screen.getByLabelText("Phone number")).toHaveAttribute("aria-describedby", "test-phone-hint");
    expect(screen.getByLabelText("Phone number")).toHaveAttribute("placeholder", "+1 (555) 000-0000");
    expect(screen.getByRole("button", { name: "Text me!" })).toHaveTextContent("Text me!");
  });

  it("preserves an international number and shows accepted copy only after API acceptance", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ accepted: true }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<PhoneForm id="test-phone" />);

    const input = screen.getByLabelText("Phone number");
    fireEvent.change(input, { target: { value: "+919769760891" } });
    expect(input).toHaveValue("+919769760891");
    await user.click(screen.getByRole("button", { name: "Text me!" }));

    expect(await screen.findByText("you’re in.")).toBeInTheDocument();
    expect(screen.getByText("check your phone. Dibs is texting you.")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.test/api/onboarding",
      expect.objectContaining({
        body: JSON.stringify({ phone: "+919769760891", source: "website" }),
      }),
    );
  });

  it("formats a North American number while it is entered", async () => {
    const user = userEvent.setup();
    render(<PhoneForm id="test-phone" />);

    const input = screen.getByLabelText("Phone number");
    await user.type(input, "3055550123");

    expect(input).toHaveValue("+1 (305) 555-0123");
  });

  it("filters non-phone characters and rejects duplicate plus signs", () => {
    render(<PhoneForm id="test-phone" />);

    const input = screen.getByLabelText("Phone number");
    fireEvent.change(input, { target: { value: "305.call.DIBS.5550123" } });
    expect(input).toHaveValue("+1 (305) 555-0123");

    fireEvent.change(input, { target: { value: "++447911123456" } });
    expect(input).toHaveValue("+1 (305) 555-0123");
  });

  it("adds the US country code to a local number for the backend", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ accepted: true }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<PhoneForm id="test-phone" />);

    await user.type(screen.getByLabelText("Phone number"), "3055550123");
    expect(screen.getByLabelText("Phone number")).toHaveValue("+1 (305) 555-0123");
    await user.click(screen.getByRole("button", { name: "Text me!" }));

    expect(await screen.findByText("you’re in.")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example.test/api/onboarding",
      expect.objectContaining({
        body: JSON.stringify({ phone: "+13055550123", source: "website" }),
      }),
    );
  });

  it.each(["", "not-a-phone", "++447911123456"])(
    "rejects malformed input without calling the API: %#",
    async phone => {
      const fetchMock = vi.fn();
      vi.stubGlobal("fetch", fetchMock);
      const user = userEvent.setup();
      render(<PhoneForm id="test-phone" />);

      if (phone) {
        fireEvent.change(screen.getByLabelText("Phone number"), { target: { value: phone } });
      }
      await user.click(screen.getByRole("button", { name: "Text me!" }));

      expect(screen.getByText("that number doesn’t look right.")).toBeInTheDocument();
      expect(fetchMock).not.toHaveBeenCalled();
    },
  );

  it("prevents a second request while the first is pending", async () => {
    let resolveRequest: ((response: Response) => void) | undefined;
    const fetchMock = vi.fn().mockReturnValue(new Promise<Response>((resolve) => {
      resolveRequest = resolve;
    }));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<PhoneForm id="test-phone" />);

    await user.type(screen.getByLabelText("Phone number"), "3055550123");
    const button = screen.getByRole("button", { name: "Text me!" });
    await user.dblClick(button);

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Sending" })).toBeDisabled();
    resolveRequest?.(new Response(JSON.stringify({ accepted: true }), { status: 200 }));
    expect(await screen.findByText("you’re in.")).toBeInTheDocument();
  });

  it("shows a safe error for an unavailable backend", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("private backend detail")));
    const user = userEvent.setup();
    render(<PhoneForm id="test-phone" />);

    await user.type(screen.getByLabelText("Phone number"), "3055550123");
    await user.click(screen.getByRole("button", { name: "Text me!" }));

    expect(await screen.findByText("something went wrong. try again.")).toBeInTheDocument();
    expect(screen.queryByText("private backend detail")).not.toBeInTheDocument();
  });
});