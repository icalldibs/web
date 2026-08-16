import { act, cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ScenarioDemo } from "./scenario-demo";

const matchMedia = vi.fn();

beforeEach(() => {
  vi.useFakeTimers();
  matchMedia.mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
  vi.stubGlobal("matchMedia", matchMedia);
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("ScenarioDemo", () => {
  it("rotates the request, phone conversation, and result together", () => {
    render(<ScenarioDemo />);

    let request = screen.getByRole("article", { name: "Your request" });
    let result = screen.getByRole("article", { name: "Dibs result" });
    let phone = screen.getByLabelText("A text conversation with Dibs");
    expect(within(request).getByText(/find me a PS5 under \$300/)).toBeInTheDocument();
    expect(within(result).getByText("PS5 Slim")).toBeInTheDocument();
    expect(within(phone).getByText("Found the best match.")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(4_600));
    act(() => vi.advanceTimersByTime(360));

    request = screen.getByRole("article", { name: "Your request" });
    result = screen.getByRole("article", { name: "Dibs result" });
    phone = screen.getByLabelText("A text conversation with Dibs");
    expect(within(request).getByText(/find me some good running shoes/)).toBeInTheDocument();
    expect(within(result).getByText("Nike Pegasus")).toBeInTheDocument();
    expect(within(phone).getByText("Found a few worth looking at.")).toBeInTheDocument();
    expect(screen.queryByText("PS5 Slim")).not.toBeInTheDocument();
  });

  it("keeps the first scenario static when reduced motion is preferred", () => {
    matchMedia.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    render(<ScenarioDemo />);

    act(() => vi.advanceTimersByTime(13_800));

    expect(screen.getAllByText(/find me a PS5 under \$300/)).toHaveLength(2);
    expect(screen.queryByText("Nike Pegasus")).not.toBeInTheDocument();
  });

  it("removes media listeners and rotation timers on unmount", () => {
    const removeEventListener = vi.fn();
    matchMedia.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener,
    });
    const clearIntervalSpy = vi.spyOn(window, "clearInterval");
    const { unmount } = render(<ScenarioDemo />);

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});