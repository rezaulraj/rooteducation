"use client";

import { useState } from "react";
import Link from "next/link";
import { COUNTRIES, UNIVERSITIES } from "../universitiesData";
import {
  Back,
  Check,
  Choice,
  DIAL,
  DoneScreen,
  EMAIL_RE,
  Field,
  Flag,
  Journey,
  NextSteps,
  PrimaryButton,
  Progress,
  inputClass,
} from "./ui";

type Step = "welcome" | "agency" | "markets" | "contact" | "done";

const KINDS = [
  {
    key: "Education agency",
    text: "A registered study abroad agency",
    icon: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 10h.01M15 10h.01",
  },
  {
    key: "Independent counsellor",
    text: "You advise students on your own",
    icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21c0-4 3.6-7 8-7s8 3 8 7",
  },
  {
    key: "School or college",
    text: "You guide your own students abroad",
    icon: "M12 3 2 8l10 5 10-5-10-5ZM6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5",
  },
  {
    key: "Other organisation",
    text: "Coaching centre, test prep or similar",
    icon: "M4 6h16M4 12h16M4 18h10",
  },
];
const VOLUMES = ["Under 25", "25–100", "100–500", "500+"];
const SERVICES = [
  "Counselling",
  "Applications",
  "Visa support",
  "Test preparation",
  "Accommodation",
  "Pre-departure",
];
const UNI_COUNT = UNIVERSITIES.length;

function Icon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

export default function PartnerJourney({
  phone,
  onClose,
}: {
  phone: string;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("welcome");
  const [kind, setKind] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [city, setCity] = useState("");
  const [base, setBase] = useState<string>(DIAL[0].name);
  const [website, setWebsite] = useState("");
  const [volume, setVolume] = useState("");
  const [destinations, setDestinations] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const agencyOk =
    organisation.trim().length >= 2 && city.trim().length >= 2 && !!volume;
  const emailOk = EMAIL_RE.test(email.trim());
  const contactOk =
    name.trim().length >= 2 && role.trim().length >= 2 && emailOk;

  const submit = async () => {
    setTouched(true);
    if (!contactOk) return;
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "partner",
          kind,
          organisation: organisation.trim(),
          city: city.trim(),
          base,
          website: website.trim(),
          volume,
          destinations: destinations.map(
            (d) => COUNTRIES.find((c) => c.slug === d)?.name ?? d,
          ),
          services,
          name: name.trim(),
          role: role.trim(),
          email: email.trim(),
          phone,
        }),
      });
      const j = await r.json();
      if (!j.ok) throw new Error();
      setReference(j.reference);
      setStep("done");
    } catch {
      setError("We couldn't send your application. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (step === "done") {
    return (
      <DoneScreen
        onClose={onClose}
        panel={
          <div className="mx-auto max-w-md text-white lg:mx-0 lg:ml-auto lg:mr-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold backdrop-blur">
              <Check className="h-4 w-4" />
              Application received · {reference}
            </span>
            <h2 className="mt-5 text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold leading-[1.08] tracking-tight">
              Welcome to the Root{" "}
              <span className="text-[#FFD7B8]">partner network</span>,{" "}
              {name.trim().split(" ")[0]}!
            </h2>
            <p className="mt-4 font-serif text-lg italic text-white/85">
              {organisation.trim()} · {city.trim()}, {base}
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                [String(UNI_COUNT) + "+", "universities"],
                [String(COUNTRIES.length), "countries"],
                ["1", "partner manager"],
              ].map(([n, l]) => (
                <div
                  key={l}
                  className="rounded-2xl bg-white/12 p-3.5 backdrop-blur"
                >
                  <p className="text-2xl font-bold">{n}</p>
                  <p className="mt-0.5 text-xs text-white/75">{l}</p>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <NextSteps
          title="What happens next:"
          steps={[
            "A partner manager reviews your application within 2 working days",
            "An onboarding call and your partnership agreement",
            "Get portal access and start submitting student applications",
          ]}
        />
        <div className="rounded-2xl bg-white p-4 shadow-[0_20px_50px_-30px_rgba(14,14,40,0.3)]">
          <p className="text-sm font-semibold text-ink">Your markets</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {destinations.map((d) => {
              const c = COUNTRIES.find((x) => x.slug === d)!;
              return (
                <span
                  key={d}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F3F6] py-1 pl-1 pr-2.5 text-xs font-medium text-ink/75"
                >
                  <Flag code={c.code} className="h-4 w-4" />
                  {c.name}
                </span>
              );
            })}
          </div>
        </div>
        <Link
          href="/universities"
          onClick={onClose}
          className="flex h-13 items-center justify-center rounded-xl bg-[#5A4FF0] text-[0.95rem] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(90,79,240,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A3FE0]"
        >
          Explore our universities
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="block w-full text-center text-sm font-medium text-ink/60 transition-colors hover:text-ink"
        >
          Back to the website
        </button>
      </DoneScreen>
    );
  }

  if (step === "welcome") {
    return (
      <Journey
        stepKey={step}
        onClose={onClose}
        wide
        left={
          <>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#C95A14]">
              Recruitment partners
            </span>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
              Grow your agency{" "}
              <span className="text-[#5A4FF0]">with Root Education</span>
            </h2>
            <p className="mt-8 flex items-center gap-4 text-sm font-semibold text-ink">
              Partners get <span className="h-px w-32 bg-ink/10" />
            </p>
            <ul className="mt-4 space-y-3">
              {[
                `Access to ${UNI_COUNT}+ universities in ${COUNTRIES.length} countries`,
                "A dedicated partner manager",
                "Fast application updates and visa support",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 text-[0.95rem] text-ink/75"
                >
                  <Check />
                  {t}
                </li>
              ))}
            </ul>
          </>
        }
        right={
          <div className="rounded-[26px] border border-[#5A4FF0]/40 bg-[linear-gradient(160deg,#FFFFFF_55%,#F3F1FF)] p-5 shadow-[0_30px_80px_-40px_rgba(90,79,240,0.5)] sm:p-7">
            <h3 className="text-xl font-bold tracking-tight text-ink">
              Become a recruitment partner
            </h3>
            <p className="mt-5 text-sm font-semibold text-ink">
              What describes you best?
            </p>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {KINDS.map((k) => (
                <Choice
                  key={k.key}
                  selected={kind === k.key}
                  onClick={() => setKind(k.key)}
                  className="items-start gap-3 p-3.5"
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors ${kind === k.key ? "bg-[#5A4FF0] text-white" : "bg-[#F3F3F6] text-ink/70"}`}
                  >
                    <Icon d={k.icon} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold">{k.key}</span>
                    <span className="mt-0.5 block text-xs font-normal leading-snug text-ink/55">
                      {k.text}
                    </span>
                  </span>
                </Choice>
              ))}
            </div>
            <div className="mt-5">
              <PrimaryButton disabled={!kind} onClick={() => setStep("agency")}>
                Continue
              </PrimaryButton>
            </div>
          </div>
        }
      />
    );
  }

  if (step === "agency") {
    return (
      <Journey
        stepKey={step}
        onClose={onClose}
        left={
          <>
            <div className="flex items-center gap-3">
              <Back onClick={() => setStep("welcome")} />
              <Progress step={1} total={3} />
            </div>
            <h2 className="mt-8 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
              Tell us about
              <br />
              your organisation
            </h2>
            <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-ink/55">
              So we can match you with the right partner manager and
              universities.
            </p>
          </>
        }
        right={
          <div className="space-y-6">
            <Field label="Organisation name">
              <input
                className={inputClass}
                placeholder="e.g. Bright Future Education"
                autoComplete="organization"
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
                maxLength={120}
              />
            </Field>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="City">
                <input
                  className={inputClass}
                  placeholder="e.g. Dhaka"
                  autoComplete="address-level2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  maxLength={80}
                />
              </Field>
              <Field label="Country">
                <span className="relative block">
                  <select
                    className={`${inputClass} appearance-none pr-10`}
                    value={base}
                    onChange={(e) => setBase(e.target.value)}
                  >
                    {DIAL.map((d) => (
                      <option key={d.code}>{d.name}</option>
                    ))}
                    <option>Other</option>
                  </select>
                  <svg
                    viewBox="0 0 12 12"
                    className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-ink/50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden
                  >
                    <path d="M3 4.5 6 7.5l3-3" />
                  </svg>
                </span>
              </Field>
            </div>
            <Field label="Website" hint="Optional">
              <input
                className={inputClass}
                placeholder="www.youragency.com"
                inputMode="url"
                autoComplete="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                maxLength={150}
              />
            </Field>
            <div>
              <p className="text-sm font-semibold text-ink">
                Students you send abroad each year
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {VOLUMES.map((v) => (
                  <Choice
                    key={v}
                    selected={volume === v}
                    onClick={() => setVolume(v)}
                    className="h-12 justify-center"
                  >
                    {v}
                  </Choice>
                ))}
              </div>
            </div>
          </div>
        }
        action={
          <PrimaryButton
            disabled={!agencyOk}
            onClick={() => setStep("markets")}
          >
            Next
          </PrimaryButton>
        }
      />
    );
  }

  if (step === "markets") {
    return (
      <Journey
        stepKey={step}
        onClose={onClose}
        left={
          <>
            <div className="flex items-center gap-3">
              <Back onClick={() => setStep("agency")} />
              <Progress step={2} total={3} />
            </div>
            <h2 className="mt-8 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
              Where do your
              <br />
              students go?
            </h2>
            <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-ink/55">
              Pick every destination you recruit for, and the services you
              offer. You can change these later.
            </p>
            {destinations.length > 0 && (
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#EEEDFF] px-3.5 py-1.5 text-xs font-semibold text-[#4A3FE0]">
                {destinations.length}{" "}
                {destinations.length === 1 ? "country" : "countries"} selected
              </p>
            )}
          </>
        }
        right={
          <>
            <section>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink">
                  Destinations you recruit for
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setDestinations(
                      destinations.length === COUNTRIES.length
                        ? []
                        : COUNTRIES.map((c) => c.slug),
                    )
                  }
                  className="text-xs font-semibold text-[#5A4FF0] hover:underline"
                >
                  {destinations.length === COUNTRIES.length
                    ? "Clear all"
                    : "Select all"}
                </button>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {COUNTRIES.map((c) => {
                  const on = destinations.includes(c.slug);
                  return (
                    <Choice
                      key={c.slug}
                      selected={on}
                      onClick={() =>
                        toggle(destinations, setDestinations, c.slug)
                      }
                      className="h-12"
                    >
                      <Flag code={c.code} />
                      <span className="flex-1 truncate">{c.name}</span>
                      <span
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded border transition-colors ${on ? "border-[#5A4FF0] bg-[#5A4FF0] text-white" : "border-ink/20"}`}
                      >
                        {on && (
                          <svg
                            viewBox="0 0 12 12"
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                          >
                            <path d="M2.5 6.2 5 8.5l4.5-5" />
                          </svg>
                        )}
                      </span>
                    </Choice>
                  );
                })}
              </div>
            </section>
            <section className="mt-9">
              <p className="text-sm font-semibold text-ink">
                Services you offer
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SERVICES.map((s) => {
                  const on = services.includes(s);
                  return (
                    <Choice
                      key={s}
                      selected={on}
                      onClick={() => toggle(services, setServices, s)}
                      className="h-10 rounded-full px-4"
                    >
                      {on ? "✓ " : "+ "}
                      {s}
                    </Choice>
                  );
                })}
              </div>
            </section>
          </>
        }
        action={
          <PrimaryButton
            disabled={!destinations.length || !services.length}
            onClick={() => setStep("contact")}
          >
            Next
          </PrimaryButton>
        }
      />
    );
  }

  // Contact
  return (
    <Journey
      stepKey={step}
      onClose={onClose}
      left={
        <>
          <div className="flex items-center gap-3">
            <Back onClick={() => setStep("markets")} />
            <Progress step={3} total={3} />
          </div>
          <h2 className="mt-8 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
            Just one last step!
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              organisation.trim(),
              `${city.trim()}, ${base}`,
              `${volume} students / year`,
            ].map((t) => (
              <span
                key={t}
                className="rounded-full bg-[#EEEDFF] px-3.5 py-1.5 text-xs font-semibold text-[#4A3FE0]"
              >
                {t}
              </span>
            ))}
          </div>
        </>
      }
      right={
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label="Your name"
              error={
                touched && name.trim().length < 2
                  ? "Please enter your name."
                  : undefined
              }
            >
              <input
                className={inputClass}
                placeholder="Name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
              />
            </Field>
            <Field
              label="Your role"
              error={
                touched && role.trim().length < 2
                  ? "Please enter your role."
                  : undefined
              }
            >
              <input
                className={inputClass}
                placeholder="e.g. Director"
                autoComplete="organization-title"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                maxLength={80}
              />
            </Field>
          </div>
          <Field
            label="Work email"
            error={
              touched && !emailOk ? "Please enter a valid email." : undefined
            }
          >
            <input
              className={inputClass}
              type="email"
              placeholder="you@youragency.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={120}
            />
          </Field>
          <Field label="Your phone" hint="Verified">
            <input className={inputClass} value={phone} disabled />
          </Field>
          {error && (
            <p role="alert" className="text-sm font-medium text-[#D93636]">
              {error}
            </p>
          )}
        </form>
      }
      action={
        <PrimaryButton
          disabled={!name.trim() || !role.trim() || !email.trim()}
          busy={busy}
          onClick={submit}
        >
          Submit application
        </PrimaryButton>
      }
    />
  );
}
