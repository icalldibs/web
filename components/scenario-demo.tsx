"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ROTATION_MS = 4_600;
const TRANSITION_MS = 360;

export const scenarios = [
  {
    id: "playstation",
    request: "find me a PS5 under $300",
    response: "Found the best match.",
    reply: "perfect",
    result: { name: "PS5 Slim", price: "$279", details: ["Like new", "Miami"], art: "console" },
  },
  {
    id: "running-shoes",
    request: "find me some good running shoes",
    response: "Found a few worth looking at.",
    reply: "I like those",
    result: { name: "Nike Pegasus", price: "$82", details: ["New", "Miami"], art: "shoe" },
  },
  {
    id: "barber",
    request: "find me a good barber nearby",
    response: "Found a top-rated one opening soon.",
    reply: "perfect, book it",
    result: { name: "Top-rated barber", price: "0.4 mi away", details: ["Opening at 4 PM"], art: "barber" },
  },
  {
    id: "book",
    request: "find me The Psychology of Money",
    response: "Found a copy nearby.",
    reply: "that works",
    result: { name: "The Psychology of Money", price: "$12", details: ["Excellent condition"], art: "book" },
  },
  {
    id: "flight",
    request: "find me a flight to Delhi",
    response: "Found the best options.",
    reply: "show me the details",
    result: { name: "Mumbai → Delhi", price: "₹4,821", details: ["Direct", "2h 10m"], art: "flight" },
  },
] as const;

function ResultArtwork({ type }: { type: string }) {
  return (
    <div className={`result-art result-art-${type}`} aria-hidden="true">
      <span />
      <i />
    </div>
  );
}

export function ScenarioDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
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
    const handleVisibility = () => setPageVisible(!document.hidden);
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (reduceMotion || !isVisible || !pageVisible) return;
    const interval = window.setInterval(() => {
      setIsExiting(true);
    }, ROTATION_MS);
    return () => {
      window.clearInterval(interval);
      setIsExiting(false);
    };
  }, [isVisible, pageVisible, reduceMotion]);

  useEffect(() => {
    if (!isExiting) return;
    const timeout = window.setTimeout(() => {
      setActiveIndex(current => (current + 1) % scenarios.length);
      setIsExiting(false);
    }, TRANSITION_MS);
    return () => window.clearTimeout(timeout);
  }, [isExiting]);

  const scenario = scenarios[activeIndex];

  return (
    <div
      className={`scenario-demo${isExiting ? " is-exiting" : ""}`}
      ref={rootRef}
      aria-label="How Dibs works"
    >
      <article className="floating-result scenario-transition" aria-label="Dibs result" key={`result-${scenario.id}`}>
        <p className="demo-label">Dibs found</p>
        <div className="result-content">
          <ResultArtwork type={scenario.result.art} />
          <div className="result-copy">
            <h2>{scenario.result.name}</h2>
            <strong>{scenario.result.price}</strong>
            <p>{scenario.result.details.join(" · ")}</p>
          </div>
        </div>
      </article>

      <div className="demo-phone">
        <div className="demo-phone-screen">
          <div className="messages-header">
            <span className="dibs-avatar">D</span>
            <strong>Dibs</strong>
          </div>
          <article className="phone-conversation scenario-transition" aria-label="A text conversation with Dibs" key={`phone-${scenario.id}`}>
            <p className="message-time">Today 2:14 PM</p>
            <div className="message message-user">{scenario.request}</div>
            <div className="message message-dibs">{scenario.response}</div>
            <div className="message message-user">{scenario.reply}</div>
          </article>
          <div className="message-composer" aria-hidden="true">iMessage</div>
        </div>
        <Image
          className="device-frame"
          src="/mockups/iphone-x-black.png"
          alt=""
          fill
          priority
          sizes="(max-width: 700px) 260px, 310px"
        />
      </div>

      <article className="floating-request scenario-transition" aria-label="Your request" key={`request-${scenario.id}`}>
        <p>{scenario.request}</p>
      </article>
    </div>
  );
}