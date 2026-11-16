// Receives messages from the /contact form.
// For now a valid message is only logged on the server. Connect it to email or your CRM here.

const TOPICS = [
  "Study abroad",
  "Consultation",
  "Test prep",
  "Events",
  "Partnership",
  "Something else",
];
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
  if (!TOPICS.includes(b.topic as string)) errors.push("topic");
  if (!isText(b.name, 80)) errors.push("name");
  if (
    !isText(b.email, 120) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email as string)
  )
    errors.push("email");
  if (b.phone !== undefined && b.phone !== "" && !isText(b.phone, 30))
    errors.push("phone");
  if (!isText(b.message, 2000)) errors.push("message");
  if (errors.length)
    return Response.json({ ok: false, errors }, { status: 422 });

  const reference = `CT-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  console.log(`[contact] ${reference}`, b);
  return Response.json({ ok: true, reference });
}
