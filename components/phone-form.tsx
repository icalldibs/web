"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import {
  looksLikePhone,
  OnboardingError,
  submitOnboarding,
} from "@/lib/onboarding";

type FormState = "idle" | "submitting" | "accepted" | "already-onboarded";

function formatNorthAmericanPhone(digits: string) {
  const nationalDigits = (digits.startsWith("1") ? digits.slice(1) : digits).slice(0, 10);
  let formatted = "+1";

  if (nationalDigits.length > 0) formatted += ` (${nationalDigits.slice(0, 3)}`;
  if (nationalDigits.length >= 3) formatted += ")";
  if (nationalDigits.length > 3) formatted += ` ${nationalDigits.slice(3, 6)}`;
  if (nationalDigits.length > 6) formatted += `-${nationalDigits.slice(6)}`;

  return formatted;
}

function formatPhoneInput(value: string, previousValue: string) {
  const plusCount = value.match(/\+/g)?.length ?? 0;
  if (plusCount > 1 || (plusCount === 1 && !value.startsWith("+"))) {
    return previousValue;
  }

  const hasInternationalPrefix = value.startsWith("+");
  const digits = value.replace(/\D/g, "");

  if (!digits) return hasInternationalPrefix ? "+" : "";
  if (hasInternationalPrefix && !digits.startsWith("1")) {
    return `+${digits.slice(0, 15)}`;
  }

  return formatNorthAmericanPhone(digits);
}

function normalizePhone(phone: string) {
  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (trimmed.startsWith("+")) return `+${digits}`;

  return digits.startsWith("1") && digits.length === 11
    ? `+${digits}`
    : `+1${digits}`;
}

const errorMessages: Record<OnboardingError["code"], string> = {
  "invalid-phone": "that number doesn’t look right.",
  "rate-limited": "too many tries. wait a minute and try again.",
  unavailable: "something went wrong. try again.",
  timeout: "that took too long. try again.",
  unexpected: "something went wrong. try again.",
};

export function PhoneForm({ id }: { id: string }) {
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const submissionInFlight = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submissionInFlight.current) return;

    const submittedPhone = normalizePhone(phone);

    if (!looksLikePhone(submittedPhone)) {
      setError("that number doesn’t look right.");
      return;
    }

    submissionInFlight.current = true;
    setState("submitting");
    setError("");

    try {
      const result = await submitOnboarding(submittedPhone);
      setState(result.status);
      setPhone("");
    } catch (caught) {
      setState("idle");
      setError(
        caught instanceof OnboardingError
          ? errorMessages[caught.code]
          : errorMessages.unexpected,
      );
    } finally {
      submissionInFlight.current = false;
    }
  }

  if (state === "accepted") {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <strong>you’re in.</strong>
        <span>check your phone. Dibs is texting you.</span>
      </div>
    );
  }

  if (state === "already-onboarded") {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <strong>you’re already in.</strong>
        <span>check your phone for Dibs.</span>
      </div>
    );
  }

  return (
    <form className="phone-form" onSubmit={handleSubmit} noValidate>
      <label className="sr-only" htmlFor={id}>Phone number</label>
      <div className="form-row">
        <Image
          className="phone-form__icon"
          src="/images.jpeg"
          alt=""
          width={42}
          height={42}
          aria-hidden="true"
        />
        <div className="phone-form__field">
          <input
            className="phone-input"
            id={id}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+1 (555) 000-0000"
            aria-describedby={`${id}-hint${error ? ` ${id}-message` : ""}`}
            aria-invalid={Boolean(error)}
            value={phone}
            onChange={(event) => {
              setPhone(formatPhoneInput(event.target.value, phone));
              if (error) setError("");
            }}
            maxLength={18}
            disabled={state === "submitting"}
          />
          <p className="phone-form__hint" id={`${id}-hint`}>
            <span className="phone-form__hint-action phone-form__hint-action--buy">Buy</span>{" "}
            or{" "}
            <span className="phone-form__hint-action phone-form__hint-action--sell">Sell</span>{" "}
            anything by texting dibs
          </p>
        </div>
        <button
          className="phone-form__submit"
          type="submit"
          disabled={state === "submitting"}
          aria-label={state === "submitting" ? "Sending" : "Text me!"}
        >
          <span>{state === "submitting" ? "Sending" : "Text me!"}</span>
          {state !== "submitting" && (
            <span className="phone-form__submit-arrow" aria-hidden="true">→</span>
          )}
        </button>
      </div>
      {error && (
        <p className="form-message" id={`${id}-message`} aria-live="polite">
          {error}
        </p>
      )}
    </form>
  );
}