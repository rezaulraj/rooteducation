// Receives finished sign-ups from the sign-up popup: students and recruitment partners.
// For now a valid sign-up is only logged on the server. Connect it to email or your CRM here.

const isText = (v: unknown, max = 200) =>
  typeof v === "string" && v.trim().length > 0 && v.length <= max;
const isList = (v: unknown, max = 30) =>
  Array.isArray(v) &&
  v.length > 0 &&
  v.length <= max &&
  v.every((x) => isText(x, 80));

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
  for (const k of ["name", "email", "phone"]) if (!isText(b[k])) errors.push(k);
  if (isText(b.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email as string))
    errors.push("email");

  if (b.type === "student") {
    for (const k of ["country", "intake", "level"])
      if (!isText(b[k])) errors.push(k);
  } else if (b.type === "partner") {
    for (const k of ["kind", "organisation", "city", "base", "volume", "role"])
      if (!isText(b[k])) errors.push(k);
    if (!isList(b.destinations)) errors.push("destinations");
    if (!isList(b.services, 10)) errors.push("services");
    if (b.website !== undefined && b.website !== "" && !isText(b.website))
      errors.push("website");
  } else {
    errors.push("type");
  }
  if (errors.length)
    return Response.json({ ok: false, errors }, { status: 422 });

  const reference = `${b.type === "partner" ? "RP" : "RS"}-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  console.log(`[signup] ${reference}`, b);
  return Response.json({ ok: true, reference });
}
