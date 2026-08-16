import { describe, expect, it, vi } from "vitest";
import {
  looksLikePhone,
  submitOnboarding,
} from "./onboarding";

describe("submitOnboarding", () => {
  it("posts the exact submitted value in the public onboarding contract", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({ accepted: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await expect(submitOnboarding("+91 97697 60891", {
      apiUrl: "https://api.example.test/",
      fetchImpl,
    })).resolves.toEqual({ status: "accepted" });

    expect(fetchImpl).toHaveBeenCalledOnce();
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://api.example.test/api/onboarding",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: "+91 97697 60891", source: "website" }),
      }),
    );
  });

  it("handles an already-onboarded response without reading backend details", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 409 }));
    await expect(submitOnboarding("3055550123", { apiUrl: "https://api.example.test", fetchImpl }))
      .resolves.toEqual({ status: "already-onboarded" });
  });

  it.each([
    [400, "invalid-phone"],
    [422, "invalid-phone"],
    [429, "rate-limited"],
    [503, "unavailable"],
  ] as const)("maps HTTP %s to %s", async (status, code) => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response("internal detail", { status }));
    await expect(submitOnboarding("3055550123", { apiUrl: "https://api.example.test", fetchImpl }))
      .rejects.toMatchObject({ code });
  });

  it("rejects a success response that does not explicitly accept onboarding", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({ accepted: false }), { status: 200 }),
    );
    await expect(submitOnboarding("3055550123", { apiUrl: "https://api.example.test", fetchImpl }))
      .rejects.toMatchObject({ code: "unexpected" });
  });
});

describe("looksLikePhone", () => {
  it.each([
    "+919769760891",
    "+14155552671",
    "+447911123456",
    "(305) 555-0123",
  ])("accepts the valid-looking international or US number %s", phone => {
    expect(looksLikePhone(phone)).toBe(true);
  });

  it.each([
    "",
    "   ",
    "not a phone",
    "+44-call-dibs",
    "44+7911123456",
    "++447911123456",
    "+44 (7911 123456",
    "+1234567",
    "+1234567890123456",
    "+1 415 555 2671 extension 4",
    "+1 415 555 2671                    ",
  ])("rejects the empty, malformed, or excessive value %#", phone => {
    expect(looksLikePhone(phone)).toBe(false);
  });
});