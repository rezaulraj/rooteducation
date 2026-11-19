// One-time passcodes for the sign-up popup.
//
// SMS: no provider is connected yet, so `sendSms` only logs the code. Until one is, the API runs in
// DEMO MODE: it returns the code to the browser, which shows it in the popup so sign-up still works.
// To go live, connect a provider (for example Twilio, Vonage or a Bangladeshi SMS gateway) inside
// `sendSms` and set SMS_API_KEY in the environment: demo mode then switches off automatically.
//
// Verification is stateless, so it works on any number of servers (e.g. Vercel): "send" returns a
// signed token holding a hash of the phone number, the code and its expiry; "verify" checks the
// code against it. Set OTP_SECRET (any long random string) in production so tokens can't be forged.

import { createHmac, randomInt, timingSafeEqual } from "node:crypto";

const TTL = 5 * 60_000;
const RESEND_AFTER = 25_000;
const SECRET = process.env.OTP_SECRET || "root-education-dev-only-secret";
const SMS_CONNECTED = Boolean(process.env.SMS_API_KEY);

// Best-effort limits on this server (a hosted site may run several).
const g = globalThis as typeof globalThis & {
  __otpSent?: Map<string, number>;
  __otpTries?: Map<string, number>;
};
const lastSent = (g.__otpSent ??= new Map<string, number>());
const tries = (g.__otpTries ??= new Map<string, number>());
const MAX_TRIES = 5;

const isPhone = (v: unknown): v is string =>
  typeof v === "string" && /^\+\d{8,16}$/.test(v);
const sign = (phone: string, code: string, exp: number) =>
  createHmac("sha256", SECRET)
    .update(`${phone}|${code}|${exp}`)
    .digest("base64url");

async function sendSms(phone: string, text: string) {
  // Connect your SMS provider here.
  console.log(`[otp] to ${phone}: ${text}`);
}

export async function POST(request: Request) {
  let body: {
    action?: string;
    phone?: unknown;
    code?: unknown;
    token?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }
  const { action, phone, code, token } = body;
  if (!isPhone(phone))
    return Response.json(
      { ok: false, error: "Please enter a valid mobile number." },
      { status: 422 },
    );
  const now = Date.now();

  if (action === "send") {
    const prev = lastSent.get(phone);
    if (prev && now - prev < RESEND_AFTER) {
      return Response.json(
        {
          ok: false,
          error: "Please wait a moment before asking for a new code.",
          retryIn: Math.ceil((RESEND_AFTER - (now - prev)) / 1000),
        },
        { status: 429 },
      );
    }
    lastSent.set(phone, now);
    tries.delete(phone);
    const otp = randomInt(0, 1_000_000).toString().padStart(6, "0");
    const exp = now + TTL;
    await sendSms(
      phone,
      `${otp} is your Root Education verification code. It expires in 5 minutes.`,
    );
    return Response.json({
      ok: true,
      token: `${exp}.${sign(phone, otp, exp)}`,
      // Demo mode: no SMS service yet, so show the code in the popup.
      ...(!SMS_CONNECTED && { devCode: otp }),
    });
  }

  if (action === "verify") {
    const [expStr, mac] = typeof token === "string" ? token.split(".") : [];
    const exp = Number(expStr);
    if (!exp || !mac || exp < now)
      return Response.json(
        { ok: false, error: "This code has expired. Please resend a new one." },
        { status: 410 },
      );
    const n = (tries.get(phone) ?? 0) + 1;
    tries.set(phone, n);
    if (n > MAX_TRIES)
      return Response.json(
        { ok: false, error: "Too many attempts. Please resend a new code." },
        { status: 429 },
      );
    const expected = Buffer.from(
      sign(phone, typeof code === "string" ? code : "", exp),
    );
    const given = Buffer.from(mac);
    if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
      return Response.json(
        { ok: false, error: "That code isn't right. Please try again." },
        { status: 401 },
      );
    }
    tries.delete(phone);
    return Response.json({ ok: true });
  }

  return Response.json(
    { ok: false, error: "Unknown action." },
    { status: 400 },
  );
}
