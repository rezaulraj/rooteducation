"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { COUNTRIES, UNIVERSITIES } from "../universitiesData";
import { UNIVERSITY_LOGOS } from "../universityLogos";
import {
  Back,
  Check,
  Choice,
  DoneScreen,
  EMAIL_RE,
  Field,
  Flag,
  Globe,
  Journey,
  NextSteps,
  PrimaryButton,
  Progress,
  inputClass,
} from "./ui";

type Step = "welcome" | "intake" | "details" | "done";

const LEVELS = ["Foundation", "Bachelor's", "Master's", "PhD"];

/** The next two main intakes (January and September) at least two months away, then "year or later". */
function upcomingIntakes(now = new Date()) {
  const start = now.getFullYear() * 12 + now.getMonth() + 2;
  const out: string[] = [];
  for (let m = start; out.length < 2; m++) {
    const month = m % 12;
    if (month === 0) out.push(`Jan ${Math.floor(m / 12)}`);
    if (month === 8) out.push(`Sep ${Math.floor(m / 12)}`);
  }
  const lastYear = Number(out[1].slice(-4));
  return [...out, `${lastYear + 1} or later`];
}

function CountryGrid({
  value,
  onChange,
}: {
  value: string;
  onChange: (slug: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {COUNTRIES.map((c) => (
        <Choice
          key={c.slug}
          selected={value === c.slug}
          onClick={() => onChange(c.slug)}
          className="h-12"
        >
          <Flag code={c.code} />
          <span className="truncate">{c.name}</span>
        </Choice>
      ))}
      <Choice
        selected={value === "other"}
        onClick={() => onChange("other")}
        className="h-12"
      >
        <Globe />
        Not sure yet
      </Choice>
    </div>
  );
}

export default function StudentJourney({
  phone,
  onClose,
}: {
  phone: string;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("welcome");
  const [country, setCountry] = useState("");
  const [intake, setIntake] = useState("");
  const [level, setLevel] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [intakes] = useState(upcomingIntakes);

  const countryName = COUNTRIES.find((c) => c.slug === country)?.name;
  const emailOk = EMAIL_RE.test(email.trim());
  const nameOk = name.trim().length >= 2;

  const submit = async () => {
    setTouched(true);
    if (!nameOk || !emailOk) return;
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "student",
          name: name.trim(),
          email: email.trim(),
          phone,
          country: countryName ?? "Not sure yet",
          intake,
          level,
        }),
      });
      const j = await r.json();
      if (!j.ok) throw new Error();
      setStep("done");
    } catch {
      setError("We couldn't send your details. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (step === "done") {
    // Highlight universities from the chosen country, or the UK when the student isn't sure yet.
    const slug = country === "other" ? "uk" : country;
    const unis = UNIVERSITIES.filter((u) => u.country === slug);
    const where = COUNTRIES.find((c) => c.slug === slug)!.name;
    const shown = unis.slice(0, 3);
    return (
      <DoneScreen
        onClose={onClose}
        panel={
          <div className="mx-auto flex max-w-md flex-col gap-8 lg:mr-6 lg:ml-auto">
            <div className="text-white">
              <p className="text-sm font-medium text-white/75">
                Welcome, {name.trim().split(" ")[0]}!
              </p>
              <h2 className="mt-2 text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold leading-[1.08] tracking-tight">
                Check your eligibility for{" "}
                <span className="text-[#FFD7B8]">
                  {shown[0]?.name ?? where}
                </span>
              </h2>
              <p className="mt-3 font-serif text-base italic text-white/85">
                and across {unis.length}+ universities in {where}
              </p>
            </div>
            <ul className="rounded-2xl bg-white p-4 shadow-[0_30px_60px_-24px_rgba(30,20,90,0.55)] ">
              {shown.map((u) => {
                const logo = UNIVERSITY_LOGOS[u.name];
                return (
                  <li
                    key={u.name}
                    className="flex items-center gap-3.5 border-b border-ink/6 py-3 last:border-0"
                  >
                    <span className="relative grid h-11 w-11 shrink-0 place-items-center">
                      {logo ? (
                        <Image
                          src={logo.src}
                          alt=""
                          fill
                          sizes="44px"
                          className="object-contain"
                        />
                      ) : (
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#EEEDFF] text-sm font-bold text-[#5A4FF0]">
                          {u.name[0]}
                        </span>
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-ink/80">
                        {u.name}
                      </span>
                      <span className="block text-sm text-ink/50">
                        {u.city}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        }
      >
        <NextSteps
          steps={[
            "Book a free strategy call with a senior counsellor",
            "Get your shortlist, eligibility and scholarships",
            `Get your profile eligibility verified for ${where} universities`,
          ]}
        />
        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_20px_50px_-30px_rgba(14,14,40,0.3)]">
          <span className="flex -space-x-2">
            {["#FFB07A", "#8D85FF", "#4ADE80"].map((c, i) => (
              <span
                key={c}
                className="grid h-10 w-10 place-items-center rounded-full ring-2 ring-white"
                style={{ background: c }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  aria-hidden
                >
                  {i === 1 ? (
                    <path d="M12 3 2 8l10 5 10-5-10-5Zm-6 8v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4l-6 3-6-3Z" />
                  ) : (
                    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9c0-4 3.6-7 8-7s8 3 8 7H4Z" />
                  )}
                </svg>
              </span>
            ))}
          </span>
          <span>
            <span className="block text-sm font-semibold text-ink">
              Our certified counsellors
            </span>
            <span className="mt-0.5 block text-xs text-ink/55">
              Free 1:1 call · online or at our London & Dhaka offices
            </span>
          </span>
        </div>
        <Link
          href="/consultation"
          onClick={onClose}
          className="flex h-13 items-center justify-center rounded-xl bg-[#5A4FF0] text-[0.95rem] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(90,79,240,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A3FE0]"
        >
          Book Shortlist Discussion
        </Link>
        <Link
          href="/universities"
          onClick={onClose}
          className="block text-center text-sm font-medium text-ink/60 transition-colors hover:text-ink"
        >
          or explore universities on your own
        </Link>
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
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
              You&apos;ve signed up. Now{" "}
              <span className="text-[#5A4FF0]">
                let&apos;s get your dream admit!
              </span>
            </h2>
            <p className="mt-8 flex items-center gap-4 text-sm font-semibold text-ink">
              We&apos;ll start with <span className="h-px w-32 bg-ink/10" />
            </p>
            <ul className="mt-4 space-y-3">
              {[
                "Instant admit eligibility check",
                "Scholarship options for you",
                "Personalised university shortlist",
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
              Start your study abroad journey
            </h3>
            <p className="mt-5 text-sm font-semibold text-ink">
              Choose your dream country
            </p>
            <div
              className="mt-3 max-h-[19rem] overflow-y-auto overscroll-contain pr-1"
              data-lenis-prevent
            >
              <CountryGrid value={country} onChange={setCountry} />
            </div>
            <div className="mt-5">
              <PrimaryButton
                disabled={!country}
                onClick={() => setStep("intake")}
              >
                Start your journey
              </PrimaryButton>
            </div>
          </div>
        }
      />
    );
  }

  if (step === "intake") {
    return (
      <Journey
        stepKey={step}
        onClose={onClose}
        left={
          <>
            <div className="flex items-center gap-3">
              <Back onClick={() => setStep("welcome")} />
              <Progress step={2} total={3} />
            </div>
            <h2 className="mt-8 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
              Start your study
              <br />
              abroad journey
            </h2>
            <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-ink/55">
              Tell us where and when. We&apos;ll match you with universities and
              scholarships that fit.
            </p>
          </>
        }
        right={
          <>
            <section>
              <p className="text-sm font-semibold text-ink">
                Choose your dream country
              </p>
              <div className="mt-3">
                <CountryGrid value={country} onChange={setCountry} />
              </div>
            </section>
            <section className="mt-9">
              <p className="text-sm font-semibold text-ink">
                What&apos;s your preferred intake?
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2.5">
                {intakes.map((t, i) => (
                  <Choice
                    key={t}
                    selected={intake === t}
                    onClick={() => setIntake(t)}
                    className={`h-14 justify-center overflow-hidden text-center ${i === 0 ? "pb-4" : ""}`}
                  >
                    {t}
                    {i === 0 && (
                      <span className="absolute inset-x-0 bottom-0 bg-[#DCFCE7] py-0.5 text-center text-[0.65rem] font-semibold tracking-wide text-[#15803D]">
                        Recommended
                      </span>
                    )}
                  </Choice>
                ))}
              </div>
            </section>
            <section className="mt-9">
              <p className="text-sm font-semibold text-ink">
                What do you want to study?
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {LEVELS.map((l) => (
                  <Choice
                    key={l}
                    selected={level === l}
                    onClick={() => setLevel(l)}
                    className="h-12 justify-center"
                  >
                    {l}
                  </Choice>
                ))}
              </div>
            </section>
          </>
        }
        action={
          <PrimaryButton
            disabled={!country || !intake || !level}
            onClick={() => setStep("details")}
          >
            Next
          </PrimaryButton>
        }
      />
    );
  }

  // Details
  return (
    <Journey
      stepKey={step}
      onClose={onClose}
      left={
        <>
          <div className="flex items-center gap-3">
            <Back onClick={() => setStep("intake")} />
            <Progress step={3} total={3} />
          </div>
          <h2 className="mt-8 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
            Just one last step!
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {[countryName ?? "Not sure yet", intake, level].map((t) => (
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
          id="student-details"
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <Field
            label="Your name"
            error={touched && !nameOk ? "Please enter your name." : undefined}
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
            label="Your email"
            error={
              touched && !emailOk ? "Please enter a valid email." : undefined
            }
          >
            <input
              className={inputClass}
              type="email"
              placeholder="Email"
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
          disabled={!name.trim() || !email.trim()}
          busy={busy}
          onClick={submit}
        >
          Submit
        </PrimaryButton>
      }
    />
  );
}
