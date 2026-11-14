// One-time passcodes for the sign-up popup.
//
// Codes live in this server's memory for 5 minutes. No SMS provider is connected yet: `sendSms` only logs the code.
// Connect a provider (for example Twilio, Vonage or a local Bangladeshi SMS gateway) inside `sendSms` before going live.
// While developing, the code is also returned to the browser so the flow can be tested without a phone.

import { randomInt } from "node:crypto";

type Entry = { code: string; expires: number; sentAt: number; tries: number };

const TTL = 5 * 60_000;
const RESEND_AFTER = 25_000;
const MAX_TRIES = 5;

const g = globalThis as typeof globalThis & { __otpStore?: Map<string, Entry> };
const store = (g.__otpStore ??= new Map<string, Entry>());

const isPhone = (v: unknown): v is string =>
  typeof v === "string" && /^\+\d{8,16}$/.test(v);

async function sendSms(phone: string, text: string) {
  console.log(`[otp] to ${phone}: ${text}`);
}

export async function POST(request: Request) {
  let body: { action?: string; phone?: unknown; code?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }
  const { action, phone, code } = body;
  if (!isPhone(phone))
    return Response.json(
      { ok: false, error: "Please enter a valid mobile number." },
      { status: 422 },
    );

  const now = Date.now();
  // Drop expired codes now and then, so the map does not grow.
  for (const [k, e] of store) if (e.expires < now) store.delete(k);

  if (action === "send") {
    const prev = store.get(phone);
    if (prev && now - prev.sentAt < RESEND_AFTER) {
      return Response.json(
        {
          ok: false,
          error: "Please wait a moment before asking for a new code.",
          retryIn: Math.ceil((RESEND_AFTER - (now - prev.sentAt)) / 1000),
        },
        { status: 429 },
      );
    }
    const otp = randomInt(0, 1_000_000).toString().padStart(6, "0");
    store.set(phone, { code: otp, expires: now + TTL, sentAt: now, tries: 0 });
    await sendSms(
      phone,
      `${otp} is your Root Education verification code. It expires in 5 minutes.`,
    );
    return Response.json({
      ok: true,
      ...(process.env.NODE_ENV !== "production" && { devCode: otp }),
    });
  }

  if (action === "verify") {
    const entry = store.get(phone);
    if (!entry)
      return Response.json(
        { ok: false, error: "This code has expired. Please resend a new one." },
        { status: 410 },
      );
    if (entry.tries >= MAX_TRIES) {
      store.delete(phone);
      return Response.json(
        { ok: false, error: "Too many attempts. Please resend a new code." },
        { status: 429 },
      );
    }
    if (typeof code !== "string" || code !== entry.code) {
      entry.tries++;
      return Response.json(
        { ok: false, error: "That code isn't right. Please try again." },
        { status: 401 },
      );
    }
    store.delete(phone);
    return Response.json({ ok: true });
  }

  return Response.json(
    { ok: false, error: "Unknown action." },
    { status: 400 },
  );
}
