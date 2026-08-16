import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HERO_ROTATION_MS, HeroShowcase, heroScenarios } from "./hero-showcase";

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

describe("HeroShowcase", () => {
  it("changes the image, messages, and heading together every five seconds", () => {
    render(<HeroShowcase />);

    expect(screen.getByTestId("hero-heading-ps5")).toHaveTextContent("buy that PS5");
    expect(screen.getByTestId("hero-heading-ps5").querySelector(".hero-heading__action")).toHaveClass("hero-heading__action--buy");
    expect(screen.getByTestId("hero-heading-ps5").querySelector(".hero-heading__remainder")).toHaveClass("hero-heading__remainder");
    expect(screen.getByTestId("hero-heading-ps5").querySelector(".hero-heading__remainder")).not.toHaveClass("hero-heading__remainder--buy");
    expect(screen.getByAltText("PlayStation 5 console in its box")).toBeInTheDocument();
    expect(screen.getByText("yooo lets make it happen!")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(HERO_ROTATION_MS - 1));
    expect(screen.getByTestId("hero-heading-ps5")).toHaveTextContent("buy that PS5");

    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByTestId("hero-card-jordans")).toHaveAttribute("aria-hidden", "false");
    expect(screen.getByTestId("hero-reply-jordans")).toHaveAttribute("aria-hidden", "false");
    expect(screen.getByTestId("hero-heading-jordans")).toHaveAttribute("aria-hidden", "false");
    expect(screen.getByTestId("hero-heading-jordans")).toHaveClass("is-active");
    expect(screen.getByTestId("hero-heading-ps5")).not.toHaveClass("is-active");
    expect(screen.getByTestId("hero-card-ps5")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("hero-heading-jordans")).toHaveTextContent("sell your Jordans");
    const sellActions = screen.getAllByText("sell");
    expect(sellActions).toHaveLength(2);
    sellActions.forEach((element) => expect(element).toHaveClass("hero-heading__action--sell"));
    expect(screen.getByTestId("hero-heading-jordans").querySelector(".hero-heading__remainder")).not.toHaveClass("hero-heading__remainder--sell");
    expect(screen.getByAltText("Red and white Jordan sneakers")).toBeInTheDocument();
    expect(heroScenarios[1].image).toBe("/popups/mock-jordans.jpg");
    expect(screen.queryByText("S.")).not.toBeInTheDocument();
    const jordanCard = screen.getByTestId("hero-card-jordans");
    const jordanImage = jordanCard.querySelector('[aria-label="Image sent by user"]');
    expect(jordanImage).toBeInTheDocument();
    expect(screen.getAllByText("Miami, FL")).toHaveLength(2);
    expect(jordanCard).toHaveTextContent("Miami, FL");
    expect(jordanCard).toHaveTextContent("1.1");
    expect(screen.getByText(/These Jordans are in demand nearby/)).toBeInTheDocument();
    expect(screen.getByText(/selling for around \$100/)).toBeInTheDocument();
    const userMessage = screen.getByTestId("hero-reply-jordans");
    const dibsResponse = screen.getByTestId("hero-response-jordans");
    expect(userMessage).toHaveTextContent("yoo i wanna sell my jordans");
    expect(jordanCard).toHaveClass("featured-popup-stack--user-upload");
    expect(userMessage).toHaveClass("imessage-bubble--upload-request");
    expect(userMessage).toHaveClass("imessage-bubble--jordans-request");
    expect(userMessage.querySelector(".responsive-copy--mobile")).toHaveTextContent("yoo how much for these");
    expect(userMessage.querySelectorAll("br")).toHaveLength(1);
    expect(dibsResponse).toHaveClass("imessage-bubble--upload-response");
    expect(dibsResponse).toHaveClass("imessage-bubble--jordans-response");
    expect(userMessage.compareDocumentPosition(dibsResponse) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(jordanCard).toContainElement(userMessage);
    expect(jordanImage!.compareDocumentPosition(userMessage) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(jordanCard).not.toContainElement(dibsResponse);
  });

  it("adds four buy and sell marketplace examples with desktop and shorter mobile copy", () => {
    expect(heroScenarios).toHaveLength(6);
    expect(heroScenarios.slice(2)).toEqual([
      {
        id: "tickets",
        heading: "buy those tickets",
        image: "/popups/mock-tickets.jpg",
        imageAlt: "Concert tickets in front of a live concert stage",
        width: 900,
        height: 900,
        location: "Downtown",
        rating: "2.4 mi",
        message: "Gary is selling them for $85 each. Pretty good seats too.",
        mobileMessage: "Gary has them for $85 each.",
        reply: "fs bet! connect me w him",
        mobileReply: "bet! connect us",
      },
      {
        id: "macbook",
        heading: "buy that MacBook",
        image: "/popups/mock-macbook.jpg",
        imageAlt: "Open MacBook laptop",
        width: 720,
        height: 960,
        location: "Brickell, Miami",
        rating: "3.2 mi",
        message: "Found one for $650. M1, barely used.",
        mobileMessage: "M1 MacBook, $650. Barely used.",
        reply: "yoo thanks lets make a deal!",
        mobileReply: "let’s make a deal!",
      },
      {
        id: "camera",
        heading: "sell your camera",
        image: "/popups/mock-camera.jpg",
        imageAlt: "Camera being offered for sale",
        width: 720,
        height: 960,
        location: "Miami Beach",
        rating: "2.1 mi",
        userUpload: true,
        message: "I’d say around $700. I found 8 buyers near you looking for cameras like this. I’d list it and see what happens.",
        mobileMessage: "$700. 8 nearby buyers want one.",
        reply: "yo dibs how much you think i can get for this",
        mobileReply: "what’s my camera worth?",
        replyLines: ["yo dibs how much you think", "i can get for this"],
      },
      {
        id: "bike",
        heading: "buy that bike",
        image: "/popups/mock-bike.jpg",
        imageAlt: "Blue Trek bicycle",
        width: 720,
        height: 960,
        location: "Coral Gables",
        rating: "1.8 mi",
        message: "Found a Trek for $420. Looks barely used.",
        mobileMessage: "Trek for $420. Barely used.",
        reply: "lowk needed it! tho offer $350 for it",
        mobileReply: "offer $350",
        replyLines: ["lowk needed it!", "tho offer $350 for it"],
      },
    ]);
  });

  it("places the ticket result above the new connection reply", () => {
    render(<HeroShowcase />);

    const imageStack = screen.getByTestId("hero-card-tickets");
    const reply = screen.getByTestId("hero-reply-tickets");

    expect(imageStack).toHaveClass("featured-popup-stack--tickets");
    expect(imageStack).not.toHaveClass("featured-popup-stack--request-first");
    expect(imageStack.querySelector(".imessage-bubble")).toHaveTextContent("Gary is selling them for $85 each. Pretty good seats too.");
    expect(imageStack.querySelector(".featured-popup__distance")).toHaveTextContent("· 2.4 mi");
    expect(reply).toHaveTextContent("fs bet! connect me w him");
    expect(reply).toHaveClass("imessage-bubble--tickets-reply");
    expect(reply).not.toHaveClass("imessage-bubble--request-first");
    expect(imageStack.compareDocumentPosition(reply) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("places the MacBook result above the new deal-confirmation reply", () => {
    render(<HeroShowcase />);

    const imageStack = screen.getByTestId("hero-card-macbook");
    const reply = screen.getByTestId("hero-reply-macbook");

    expect(imageStack).toHaveClass("featured-popup-stack--macbook");
    expect(imageStack).not.toHaveClass("featured-popup-stack--request-first");
    expect(imageStack.querySelector(".imessage-bubble")).toHaveTextContent("Found one for $650. M1, barely used.");
    expect(reply).toHaveTextContent("yoo thanks lets make a deal!");
    expect(reply).toHaveClass("imessage-bubble--macbook-reply");
    expect(reply).not.toHaveClass("imessage-bubble--request-first");
    expect(imageStack.compareDocumentPosition(reply) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("renders one image, one user message, and one Dibs message per example", () => {
    render(<HeroShowcase />);

    heroScenarios.forEach((scenario) => {
      const imageStack = screen.getByTestId(`hero-card-${scenario.id}`);
      const userMessage = screen.getByTestId(`hero-reply-${scenario.id}`);
      const dibsMessage = "userUpload" in scenario
        ? screen.getByTestId(`hero-response-${scenario.id}`)
        : imageStack.querySelector(".imessage-bubble");

      expect(imageStack.querySelectorAll("img")).toHaveLength(1);
      expect(userMessage.querySelector(".responsive-copy--desktop")).toHaveTextContent(scenario.reply);
      expect(userMessage.querySelector(".responsive-copy--mobile")).toHaveTextContent(scenario.mobileReply);
      expect(dibsMessage?.querySelector(".responsive-copy--desktop")).toHaveTextContent(scenario.message);
      expect(dibsMessage?.querySelector(".responsive-copy--mobile")).toHaveTextContent(scenario.mobileMessage);
      expect(imageStack).toHaveTextContent(`${scenario.location}· ${scenario.rating}`);
      if ("userUpload" in scenario) {
        expect(imageStack).toHaveClass("featured-popup-stack--user-upload");
      } else {
        expect(imageStack).not.toHaveClass("featured-popup-stack--user-upload");
      }
    });
  });

  it("keeps the camera and Jordans response positioning isolated", () => {
    render(<HeroShowcase />);

    expect(screen.getByTestId("hero-card-camera")).toHaveClass("featured-popup-stack--camera");
    expect(screen.getByTestId("hero-response-camera")).toHaveClass("imessage-bubble--camera-response");
    expect(screen.getByTestId("hero-reply-camera").querySelectorAll("br")).toHaveLength(1);
    expect(screen.getByTestId("hero-card-jordans")).not.toHaveClass("featured-popup-stack--camera");
    expect(screen.getByTestId("hero-response-jordans")).not.toHaveClass("imessage-bubble--camera-response");
    expect(screen.getByTestId("hero-response-camera")).not.toHaveClass("imessage-bubble--jordans-response");
  });

  it("places the bike result above the new offer reply", () => {
    render(<HeroShowcase />);

    expect(screen.getByTestId("hero-card-bike")).toHaveClass("featured-popup-stack--bike");
    expect(screen.getByTestId("hero-reply-bike")).toHaveClass("imessage-bubble--bike-reply");
    expect(screen.getByTestId("hero-reply-bike")).toHaveTextContent("lowk needed it! tho offer $350 for it");
    expect(screen.getByTestId("hero-reply-bike").querySelectorAll("br")).toHaveLength(1);
    expect(screen.getByTestId("hero-card-ps5")).not.toHaveClass("featured-popup-stack--bike");
    expect(screen.getByTestId("hero-reply-ps5")).not.toHaveClass("imessage-bubble--bike-reply");
  });

  it("loops back to the first scenario", () => {
    render(<HeroShowcase />);

    act(() => vi.advanceTimersByTime(HERO_ROTATION_MS * heroScenarios.length));

    expect(screen.getByTestId("hero-heading-ps5")).toHaveTextContent("buy that PS5");
    expect(screen.getByAltText("PlayStation 5 console in its box")).toBeInTheDocument();
    expect(screen.getByTestId("hero-card-ps5")).toHaveAttribute("aria-hidden", "false");
  });

  it("keeps the first scenario static when reduced motion is preferred", () => {
    matchMedia.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    render(<HeroShowcase />);

    act(() => vi.advanceTimersByTime(HERO_ROTATION_MS * 2));

    expect(screen.getByTestId("hero-heading-ps5")).toHaveTextContent("buy that PS5");
    expect(screen.getByTestId("hero-heading-ps5")).toHaveAttribute("aria-hidden", "false");
    expect(screen.getByTestId("hero-heading-jordans")).toHaveAttribute("aria-hidden", "true");
  });

  it("cleans up the rotation timer and media listener", () => {
    const removeEventListener = vi.fn();
    matchMedia.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener,
    });
    const clearIntervalSpy = vi.spyOn(window, "clearInterval");
    const { unmount } = render(<HeroShowcase />);

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});