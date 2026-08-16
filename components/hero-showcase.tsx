"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PhoneForm } from "@/components/phone-form";

export const HERO_ROTATION_MS = 5_000;

export const heroScenarios = [
  {
    id: "ps5",
    heading: "buy that PS5",
    image: "/popups/featured-ps5.jpg",
    imageAlt: "PlayStation 5 console in its box",
    width: 1024,
    height: 796,
    location: "Miami, FL",
    rating: "1.1",
    message: "I found the cheapest PS5 near you. It’s $270 with a controller. I think that’s a steal, deal?",
    mobileMessage: "PS5 for $270, controller included.",
    detail: "1.1mi away from you!",
    reply: "yooo lets make it happen!",
    mobileReply: "deal! let’s do it",
  },
  {
    id: "jordans",
    heading: "sell your Jordans",
    image: "/popups/mock-jordans.jpg",
    imageAlt: "Red and white Jordan sneakers",
    width: 720,
    height: 960,
    location: "Miami, FL",
    rating: "1.1",
    userUpload: true,
    message: "These Jordans are in demand nearby. Similar pairs are selling for around $100. Want me to list yours?",
    mobileMessage: "Pairs like yours sell for $100.",
    detail: "12 buyers near you!",
    reply: "yoo i wanna sell my jordans",
    mobileReply: "list my Jordans",
    replyLines: ["yoo i wanna sell my", "jordans"],
  },
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
] as const;

function ResponsiveCopy({
  desktop,
  mobile,
  desktopLines,
}: {
  desktop: string;
  mobile: string;
  desktopLines?: readonly string[];
}) {
  return (
    <>
      <span className="responsive-copy responsive-copy--desktop">
        {desktopLines
          ? desktopLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < desktopLines.length - 1 && (
                  <>
                    {" "}
                    <br />
                  </>
                )}
              </span>
            ))
          : desktop}
      </span>
      <span className="responsive-copy responsive-copy--mobile">{mobile}</span>
    </>
  );
}

export function HeroShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const handleVisibility = () => setPageVisible(!document.hidden);
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window) || !rootRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || !pageVisible || !isVisible) return;
    const interval = window.setInterval(() => {
      setActiveIndex(current => (current + 1) % heroScenarios.length);
    }, HERO_ROTATION_MS);
    return () => window.clearInterval(interval);
  }, [isVisible, pageVisible, reduceMotion]);

  return (
    <div className="phone-showcase" ref={rootRef}>
      <div className="showcase-visual">
        <div className="phone-crop">
          <Image
            className="phone-mockup"
            src="/mockups/white-smartphone.png"
            alt="Top half of a white smartphone mockup with a blank screen"
            width={2400}
            height={4600}
            priority
          />
        </div>

        {heroScenarios.map((scenario, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              className={`featured-popup-stack${"userUpload" in scenario ? " featured-popup-stack--user-upload" : ""}${"requestFirst" in scenario ? " featured-popup-stack--request-first" : ""}${scenario.id === "tickets" ? " featured-popup-stack--tickets" : ""}${scenario.id === "macbook" ? " featured-popup-stack--macbook" : ""}${scenario.id === "camera" ? " featured-popup-stack--camera" : ""}${scenario.id === "bike" ? " featured-popup-stack--bike" : ""} hero-transition-layer hero-transition-layer--card${isActive ? " is-active" : ""}`}
              aria-hidden={!isActive}
              data-testid={`hero-card-${scenario.id}`}
              key={`card-${scenario.id}`}
            >
              <aside
                className={`featured-popup${"userUpload" in scenario ? " featured-popup--user-upload" : ""}`}
                aria-label={"userUpload" in scenario ? "Image sent by user" : `Marketplace image in ${scenario.location}`}
              >
                <div className="featured-popup__photo">
                  <Image
                    src={scenario.image}
                    alt={scenario.imageAlt}
                    width={scenario.width}
                    height={scenario.height}
                    sizes="(max-width: 600px) 47vw, 240px"
                    unoptimized
                    priority={index === 0}
                  />
                </div>
                <div className="featured-popup__meta">
                  <span className="featured-popup__location">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    {scenario.location}
                  </span>
                  <span className="featured-popup__distance">· {scenario.rating.endsWith("mi") ? scenario.rating : `${scenario.rating} mi`}</span>
                </div>
              </aside>
              {"userUpload" in scenario && (
                <p
                  className={`imessage-bubble imessage-bubble--sent imessage-bubble--upload-request${scenario.id === "jordans" ? " imessage-bubble--jordans-request" : ""}`}
                  aria-hidden={!isActive}
                  data-testid={`hero-reply-${scenario.id}`}
                >
                  <ResponsiveCopy desktop={scenario.reply} mobile={scenario.mobileReply} desktopLines={scenario.replyLines} />
                </p>
              )}
              {!("userUpload" in scenario) && (
                <p className="imessage-bubble">
                  <ResponsiveCopy desktop={`“${scenario.message}”`} mobile={`“${scenario.mobileMessage}”`} />
                  {"detail" in scenario && <span className="imessage-bubble__distance">{scenario.detail}</span>}
                </p>
              )}
            </div>
          );
        })}

        {heroScenarios.map((scenario, index) => {
          if (!("userUpload" in scenario)) return null;
          const isActive = index === activeIndex;
          return (
            <p
              className={`imessage-bubble imessage-bubble--upload-response${scenario.id === "camera" ? " imessage-bubble--camera-response" : ""} hero-transition-layer hero-transition-layer--reply${isActive ? " is-active" : ""}`}
              aria-hidden={!isActive}
              data-testid={`hero-response-${scenario.id}`}
              key={`response-${scenario.id}`}
            >
              <ResponsiveCopy desktop={`“${scenario.message}”`} mobile={`“${scenario.mobileMessage}”`} />
              {"detail" in scenario && <span className="imessage-bubble__distance">{scenario.detail}</span>}
            </p>
          );
        })}

        {heroScenarios.map((scenario, index) => {
          if ("userUpload" in scenario || "requestFirst" in scenario) return null;
          const isActive = index === activeIndex;
          return (
            <p
              className={`imessage-bubble imessage-bubble--sent${scenario.id === "tickets" ? " imessage-bubble--tickets-reply" : ""}${scenario.id === "macbook" ? " imessage-bubble--macbook-reply" : ""}${scenario.id === "bike" ? " imessage-bubble--bike-reply" : ""} hero-transition-layer hero-transition-layer--reply${isActive ? " is-active" : ""}`}
              aria-hidden={!isActive}
              data-testid={`hero-reply-${scenario.id}`}
              key={`reply-${scenario.id}`}
            >
              <ResponsiveCopy
                desktop={scenario.reply}
                mobile={scenario.mobileReply}
                desktopLines={"replyLines" in scenario ? scenario.replyLines : undefined}
              />
            </p>
          );
        })}
      </div>

      <div className="hero-content">
        <h1 className="hero-heading">
          <span className="hero-heading__prefix">AI marketplace to</span>
          <span className="hero-heading__phrases">
            {heroScenarios.map((scenario, index) => {
              const isActive = index === activeIndex;
              const [action, ...headingWords] = scenario.heading.split(" ");
              const isMarketplaceAction = action === "buy" || action === "sell";
              const actionClass = isMarketplaceAction ? ` hero-heading__action--${action}` : "";
              return (
                <span
                  className={`hero-heading__gradient hero-transition-layer hero-transition-layer--heading${isActive ? " is-active" : ""}`}
                  aria-hidden={!isActive}
                  data-testid={`hero-heading-${scenario.id}`}
                  key={`heading-${scenario.id}`}
                >
                  <span className={`hero-heading__action${actionClass}`}>{action}</span>{" "}
                  <span className="hero-heading__remainder">{headingWords.join(" ")}</span>
                </span>
              );
            })}
          </span>
        </h1>
        <PhoneForm id="hero-phone" />
      </div>
    </div>
  );
}