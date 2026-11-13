// Receives consultation bookings from /consultation.
// For now a valid booking is only logged on the server. Connect it to email or your CRM here to receive bookings.

type Booking = {
  destinations: string[];
  level: string;
  intake: string;
  subject: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  english: string;
  budget: string;
  mode: string;
  date: string;
  time: string;
  message: string;
  consent: boolean;
};

const isText = (v: unknown, max = 200) => typeof v === "string" && v.trim().length > 0 && v.length <= max;

export async function POST(request: Request) {
  let b: Partial<Booking>;
  try {
    b = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const errors: string[] = [];
  if (!Array.isArray(b.destinations) || b.destinations.length === 0 || b.destinations.length > 20) errors.push("destinations");
  for (const k of ["level", "name", "phone", "mode", "date", "time"] as const) if (!isText(b[k])) errors.push(k);
  if (!isText(b.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email!)) errors.push("email");
  if (typeof b.message === "string" && b.message.length > 2000) errors.push("message");
  if (b.consent !== true) errors.push("consent");
  if (errors.length) return Response.json({ ok: false, errors }, { status: 422 });

  const reference = `RE-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  console.log("[consultation] new booking", reference, { ...b, message: b.message?.slice(0, 500) });
  return Response.json({ ok: true, reference });
}
