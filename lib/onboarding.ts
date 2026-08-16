export const ONBOARDING_TIMEOUT_MS = 12_000;

export type OnboardingResult =
  | { status: "accepted" }
  | { status: "already-onboarded" };

export class OnboardingError extends Error {
  constructor(
    public readonly code:
      | "invalid-phone"
      | "rate-limited"
      | "unavailable"
      | "timeout"
      | "unexpected",
  ) {
    super(code);
    this.name = "OnboardingError";
  }
}

function endpointFor(baseUrl: string | undefined) {
  const trimmed = baseUrl?.trim();

  if (!trimmed) {
    throw new OnboardingError("unavailable");
  }

  try {
    return `${new URL(trimmed).toString().replace(/\/$/, "")}/api/onboarding`;
  } catch {
    throw new OnboardingError("unavailable");
  }
}

export async function submitOnboarding(
  phone: string,
  options: {
    apiUrl?: string;
    fetchImpl?: typeof fetch;
    timeoutMs?: number;
  } = {},
): Promise<OnboardingResult> {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? ONBOARDING_TIMEOUT_MS,
  );

  try {
    const response = await (options.fetchImpl ?? fetch)(
      endpointFor(options.apiUrl ?? process.env.NEXT_PUBLIC_DIBS_API_URL),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, source: "website" }),
        signal: controller.signal,
      },
    );

    if (response.status === 409) {
      return { status: "already-onboarded" };
    }

    if (response.status === 400 || response.status === 422) {
      throw new OnboardingError("invalid-phone");
    }

    if (response.status === 429) {
      throw new OnboardingError("rate-limited");
    }

    if (!response.ok) {
      throw new OnboardingError("unavailable");
    }

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      throw new OnboardingError("unexpected");
    }

    if (
      typeof data !== "object" ||
      data === null ||
      !("accepted" in data) ||
      data.accepted !== true
    ) {
      throw new OnboardingError("unexpected");
    }

    return { status: "accepted" };
  } catch (error) {
    if (error instanceof OnboardingError) {
      throw error;
    }
    if (error instanceof Error && error.name === "AbortError") {
      throw new OnboardingError("timeout");
    }
    throw new OnboardingError("unavailable");
  } finally {
    clearTimeout(timeout);
  }
}

export function looksLikePhone(value: string) {
  const trimmed = value.trim();
  if (!trimmed || value.length > 32 || !/^\+?[0-9().\-\s]+$/.test(trimmed)) {
    return false;
  }

  const digits = value.replace(/\D/g, "");
  let parenthesisDepth = 0;

  for (const character of trimmed) {
    if (character === "(") parenthesisDepth += 1;
    if (character === ")") parenthesisDepth -= 1;
    if (parenthesisDepth < 0 || parenthesisDepth > 1) return false;
  }

  return digits.length >= 8 && digits.length <= 15 && parenthesisDepth === 0;
}