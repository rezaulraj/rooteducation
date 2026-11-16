// Receives event registrations from /events.
// For now a valid registration is only logged on the server. Connect it to email or your CRM here.

import { UPCOMING } from "../../components/eventsData";

const isText = (v: unknown, max = 200) =>
  typeof v === "string" && v.trim().length > 0 && v.length <= max;

export async function POST(request: Request) {
  let b: Record<string, unknown>;
  try {
    b = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }
  const errors: string[] = [];
  if (!UPCOMING.some((e) => e.slug === b.event)) errors.push("event");
  if (!isText(b.name, 80)) errors.push("name");
  if (
    !isText(b.email, 120) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email as string)
  )
    errors.push("email");
  if (!isText(b.phone, 30)) errors.push("phone");
  if (errors.length)
    return Response.json({ ok: false, errors }, { status: 422 });

  const reference = `EV-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  console.log(`[events] ${reference}`, b);
  return Response.json({ ok: true, reference });
}
