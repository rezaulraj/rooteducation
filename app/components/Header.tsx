"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type MenuKey = "services" | "countries";

export const services = [
  {
    label: "Study Abroad Consultation",
    desc: "One-to-one guidance to plan your path",
    href: "/services/study-abroad-consultation",
    icon: "compass",
  },
  {
    label: "University Selection",
    desc: "Shortlist programs that fit your goals",
    href: "/services/university-selection",
    icon: "university",
  },
  {
    label: "Application Assistance",
    desc: "Documents, SOPs and submissions done right",
    href: "/services/application-assistance",
    icon: "document",
  },
  {
    label: "Visa Guidance",
    desc: "Step-by-step help through the visa process",
    href: "/services/visa-guidance",
    icon: "passport",
  },
  {
    label: "Scholarship & Financial Aid",
    desc: "Find funding and reduce your study costs",
    href: "/services/scholarship-financial-aid",
    icon: "scholarship",
  },
  {
    label: "Pre-departure Briefing",
    desc: "Arrive prepared, confident and settled",
    href: "/services/pre-departure-briefing",
    icon: "plane",
  },
] as const;

export const countries = [
  {
    name: "Romania",
    tagline: "Study in Romania",
    href: "/countries/romania",
    flag: "linear-gradient(90deg,#002B7F 33.33%,#FCD116 33.33% 66.66%,#CE1126 66.66%)",
  },
  {
    name: "Malta",
    tagline: "Study in Malta",
    href: "/countries/malta",
    flag: "linear-gradient(90deg,#ffffff 50%,#CF142B 50%)",
  },
  {
    name: "Hungary",
    tagline: "Study in Hungary",
    href: "/countries/hungary",
    flag: "linear-gradient(180deg,#CE2939 33.33%,#ffffff 33.33% 66.66%,#477050 66.66%)",
  },
  {
    name: "Cyprus",
    tagline: "Study in Cyprus",
    href: "/countries/cyprus",
    flag: "radial-gradient(ellipse 34% 22% at 50% 44%,#D57800 92%,transparent 100%),#ffffff",
  },
  {
    name: "UK",
    tagline: "Study in UK",
    href: "/countries/uk",
    flag: "linear-gradient(transparent 40%,#C8102E 40% 60%,transparent 60%),linear-gradient(90deg,transparent 45%,#C8102E 45% 55%,transparent 55%),linear-gradient(transparent 30%,#fff 30% 70%,transparent 70%),linear-gradient(90deg,transparent 39%,#fff 39% 61%,transparent 61%),#012169",
  },
  {
    name: "Greece",
    tagline: "Study in Greece",
    href: "/countries/greece",
    flag: "linear-gradient(90deg,transparent 16%,#fff 16% 24%,transparent 24%) 0 0/40% 55.5% no-repeat,linear-gradient(transparent 40%,#fff 40% 60%,transparent 60%) 0 0/40% 55.5% no-repeat,linear-gradient(#0D5EAF,#0D5EAF) 0 0/40% 55.5% no-repeat,repeating-linear-gradient(180deg,#0D5EAF 0 11.11%,#ffffff 11.11% 22.22%)",
  },
] as const;

const leftLinks = [
  { label: "Services", menu: "services" as MenuKey },
  { label: "Countries", menu: "countries" as MenuKey },
  { label: "How We Work", href: "/how-we-work" },
];

const rightLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const menuOrder: MenuKey[] = ["services", "countries"];

const iconPaths: Record<string, ReactNode> = {
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  university: (
    <>
      <path d="M3 9.5 12 4l9 5.5" />
      <path d="M5 10v7M9.5 10v7M14.5 10v7M19 10v7M3 20h18" />
    </>
  ),
  document: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  passport: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="10" r="3" />
      <path d="M9 16.5h6" />
    </>
  ),
  scholarship: (
    <>
      <path d="m2 9 10-5 10 5-10 5z" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6" />
    </>
  ),
  plane: <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />,
};

export function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {iconPaths[name]}
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="m3 4.5 3 3 3-3" />
    </svg>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function ConsultationButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/consultation"
      className={`group relative inline-flex h-11 items-center gap-3 overflow-hidden rounded-xl bg-ink pl-4 pr-1.5 text-sm font-semibold text-white ${className}`}
    >
      {/* orange fill that grows out of the arrow badge on hover */}
      <span className="absolute right-1.5 top-1/2 h-8 w-8 -translate-y-1/2 scale-100 rounded-lg bg-brand transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-[9]" />
      <span className="relative">Consultation</span>
      <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-lg">
        <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-6" />
        <Arrow className="absolute h-4 w-4 -translate-x-6 transition-transform duration-300 group-hover:translate-x-0" />
      </span>
    </Link>
  );
}

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const contentRefs = useRef<Record<MenuKey, HTMLDivElement | null>>({ services: null, countries: null });
  const triggerRefs = useRef<Record<MenuKey, HTMLButtonElement | null>>({ services: null, countries: null });
  const mobileRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevMenu = useRef<MenuKey | null>(null);

  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Intro: the bar unfolds from the logo outwards, then the links rise in.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(barRef.current, { yPercent: -100, duration: 1.1, delay: 0.15 })
          .from("[data-corner]", { scale: 0, autoAlpha: 0, duration: 0.6, ease: "back.out(2)", clearProps: "opacity,visibility,transform" }, "<0.55")
          .from("[data-logo]", { y: -30, scale: 0.7, rotate: -8, autoAlpha: 0, duration: 1 }, "<-0.2")
          .from("[data-nav-item]", { y: 14, autoAlpha: 0, stagger: 0.05, duration: 0.7 }, "<0.35");
      });
    },
    { scope: headerRef },
  );

  // Scroll: compact on scroll, hide while scrolling down, reveal on scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const goingDown = y > lastY && y > 220;
      gsap.to(headerRef.current, {
        yPercent: goingDown && !activeMenu && !mobileOpen ? -140 : 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeMenu, mobileOpen]);

  // Mega panel: opens with a 3D tilt, then morphs size and slides content when switching menus.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const prev = prevMenu.current;
    prevMenu.current = activeMenu;

    if (!activeMenu) {
      if (prev) {
        gsap.to(panel, {
          autoAlpha: 0,
          y: -8,
          rotateX: -8,
          duration: 0.25,
          ease: "power2.in",
          overwrite: "auto",
        });
      }
      return;
    }

    const content = contentRefs.current[activeMenu]!;
    const trigger = triggerRefs.current[activeMenu]!;
    const w = content.offsetWidth;
    const h = content.offsetHeight;
    const caretX =
      trigger.getBoundingClientRect().left +
      trigger.offsetWidth / 2 -
      panel.parentElement!.getBoundingClientRect().left;

    if (!prev) {
      gsap.set(panel, { width: w, height: h });
      gsap.set(caretRef.current, { x: caretX, rotation: 45 });
      menuOrder.forEach((k) =>
        gsap.set(contentRefs.current[k], { autoAlpha: k === activeMenu ? 1 : 0, x: 0 }),
      );
      gsap.fromTo(
        panel,
        { autoAlpha: 0, y: -12, rotateX: -12 },
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.55, ease: "expo.out", overwrite: "auto" },
      );
      gsap.fromTo(
        content.querySelectorAll("[data-menu-item]"),
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.035, duration: 0.5, ease: "power3.out", delay: 0.05 },
      );
      return;
    }

    if (prev !== activeMenu) {
      const dir = menuOrder.indexOf(activeMenu) > menuOrder.indexOf(prev) ? 1 : -1;
      gsap.to(panel, { width: w, height: h, autoAlpha: 1, y: 0, rotateX: 0, duration: 0.5, ease: "expo.out", overwrite: "auto" });
      gsap.to(caretRef.current, { x: caretX, duration: 0.5, ease: "expo.out" });
      gsap.to(contentRefs.current[prev], { autoAlpha: 0, x: -60 * dir, duration: 0.3, ease: "power2.in" });
      gsap.fromTo(content, { autoAlpha: 0, x: 60 * dir }, { autoAlpha: 1, x: 0, duration: 0.5, ease: "expo.out" });
      gsap.set(content.querySelectorAll("[data-menu-item]"), { y: 0, autoAlpha: 1 });
    }
  }, [activeMenu]);

  // Mobile sheet: grows from the bar and staggers its rows.
  useEffect(() => {
    const sheet = mobileRef.current;
    if (!sheet) return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    window.dispatchEvent(new Event(mobileOpen ? "scroll:lock" : "scroll:unlock"));
    if (mobileOpen) {
      gsap.fromTo(sheet, { height: 0, autoAlpha: 0 }, { height: "auto", autoAlpha: 1, duration: 0.6, ease: "expo.out" });
      gsap.fromTo(
        sheet.querySelectorAll("[data-mobile-item]"),
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.6, ease: "power3.out", delay: 0.1 },
      );
    } else {
      gsap.to(sheet, { height: 0, autoAlpha: 0, duration: 0.35, ease: "power3.in" });
    }
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setActiveMenu(null), 140);
  };
  const openMenu = (key: MenuKey) => {
    cancelClose();
    setActiveMenu(key);
  };

  // A single pill glides between hovered links.
  const moveHighlight = (el: HTMLElement) => {
    const bar = barRef.current!.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const hl = highlightRef.current;
    const visible = Number(gsap.getProperty(hl, "opacity")) > 0.05;
    const target = { x: r.left - bar.left, y: r.top - bar.top, width: r.width, height: r.height };
    if (!visible) gsap.set(hl, { ...target, scale: 0.85 });
    gsap.to(hl, { ...target, scale: 1, opacity: 1, duration: 0.45, ease: "expo.out", overwrite: "auto" });
  };
  const hideHighlight = () => {
    gsap.to(highlightRef.current, { opacity: 0, scale: 0.9, duration: 0.3, ease: "power2.out", overwrite: "auto" });
  };

  const navLinkClass =
    "relative z-10 inline-flex h-10 items-center gap-1.5 rounded-xl px-3.5 text-[0.9rem] font-medium text-ink/80 transition-colors hover:text-ink";

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-14 sm:px-16 lg:px-20">
      <div className="relative mx-auto max-w-6xl [perspective:1400px]">
        <div
          ref={barRef}
          className={`relative flex items-center justify-between bg-white px-3 transition-all duration-500 ease-[cubic-bezier(.7,0,.2,1)] lg:grid lg:grid-cols-[1fr_auto_1fr] ${
            scrolled
              ? "mt-3 h-[62px] rounded-[20px] shadow-[0_14px_40px_-12px_rgba(11,11,12,0.3)]"
              : "mt-0 h-[80px] rounded-b-[24px] rounded-t-none pt-3"
          }`}
        >
          {/* Inverted corners: carve the hero's top edge around the tab */}
          <span
            data-corner
            aria-hidden
            style={{ background: "radial-gradient(circle at 0 100%, transparent 22px, #fff 22.5px)", transformOrigin: "100% 0" }}
            className={`pointer-events-none absolute right-full top-3 h-[22px] w-[22px] transition-opacity duration-300 ${scrolled ? "opacity-0" : ""}`}
          />
          <span
            data-corner
            aria-hidden
            style={{ background: "radial-gradient(circle at 100% 100%, transparent 22px, #fff 22.5px)", transformOrigin: "0 0" }}
            className={`pointer-events-none absolute left-full top-3 h-[22px] w-[22px] transition-opacity duration-300 ${scrolled ? "opacity-0" : ""}`}
          />
          <span
            ref={highlightRef}
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 rounded-xl bg-brand/10 opacity-0"
          />

          {/* Left nav */}
          <nav aria-label="Primary" className="hidden lg:block" onMouseLeave={hideHighlight}>
            <ul className="flex items-center gap-0.5">
              {leftLinks.map((item) =>
                item.menu ? (
                  <li key={item.label} data-nav-item>
                    <button
                      ref={(el) => {
                        triggerRefs.current[item.menu!] = el;
                      }}
                      type="button"
                      aria-expanded={activeMenu === item.menu}
                      aria-controls="mega-panel"
                      onMouseEnter={(e) => {
                        moveHighlight(e.currentTarget);
                        openMenu(item.menu!);
                      }}
                      onMouseLeave={scheduleClose}
                      onFocus={(e) => moveHighlight(e.currentTarget)}
                      onClick={() => setActiveMenu((m) => (m === item.menu ? null : item.menu!))}
                      className={`${navLinkClass} ${activeMenu === item.menu ? "text-ink" : ""}`}
                    >
                      {item.label}
                      <Chevron open={activeMenu === item.menu} />
                    </button>
                  </li>
                ) : (
                  <li key={item.label} data-nav-item>
                    <Link
                      href={item.href!}
                      className={navLinkClass}
                      onMouseEnter={(e) => {
                        moveHighlight(e.currentTarget);
                        scheduleClose();
                      }}
                      onFocus={(e) => moveHighlight(e.currentTarget)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {/* Logo */}
          <Link href="/" aria-label="Root Education home" className="relative z-10 flex items-center justify-center">
            <span data-logo className="block">
              <Image
                src="/logo.svg"
                alt="Root Education"
                width={110}
                height={44}
                preload
                unoptimized
                className={`w-auto transition-[height] duration-500 ${scrolled ? "h-9" : "h-11"}`}
              />
            </span>
          </Link>

          {/* Right nav + actions */}
          <div className="hidden items-center justify-end gap-1 lg:flex" onMouseLeave={hideHighlight}>
            {rightLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                data-nav-item
                className={navLinkClass}
                onMouseEnter={(e) => moveHighlight(e.currentTarget)}
                onFocus={(e) => moveHighlight(e.currentTarget)}
              >
                {item.label}
              </Link>
            ))}
            <span data-nav-item className="mx-1.5 h-5 w-px bg-ink/10" aria-hidden />
            <Link
              href="/login"
              data-nav-item
              className={navLinkClass}
              onMouseEnter={(e) => moveHighlight(e.currentTarget)}
              onFocus={(e) => moveHighlight(e.currentTarget)}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
              </svg>
              Login
            </Link>
            <span data-nav-item className="ml-1">
              <ConsultationButton />
            </span>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="relative z-10 grid h-11 w-11 place-items-center rounded-xl bg-ink text-white lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${
                  mobileOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 rounded-full bg-brand transition-all duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${
                  mobileOpen ? "top-1.5 w-5 -rotate-45 bg-current" : "top-3 w-3"
                }`}
              />
            </span>
          </button>
        </div>

        {/* Desktop mega panel */}
        <div
          ref={panelRef}
          id="mega-panel"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          style={{ visibility: "hidden", opacity: 0, transformOrigin: "top center" }}
          className="absolute left-0 top-[calc(100%+14px)] hidden overflow-hidden rounded-[22px] border border-ink/5 bg-white shadow-[0_30px_80px_-20px_rgba(11,11,12,0.35)] lg:block"
        >
          <div
            ref={(el) => {
              contentRefs.current.services = el;
            }}
            className="absolute left-0 top-0 w-[680px] p-3"
          >
            <div className="grid grid-cols-2 gap-1">
              {services.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  data-menu-item
                  onClick={() => setActiveMenu(null)}
                  className="group flex items-start gap-3.5 rounded-2xl p-3.5 transition-colors hover:bg-brand/[0.07]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink/[0.04] text-ink transition-all duration-300 group-hover:-rotate-6 group-hover:bg-brand group-hover:text-white">
                    <Icon name={s.icon} />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-[0.92rem] font-semibold text-ink">
                      {s.label}
                      <Arrow className="h-3.5 w-3.5 -translate-x-1 text-brand opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </span>
                    <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink/55">{s.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
            <div
              data-menu-item
              className="mt-2 flex items-center justify-between rounded-2xl bg-ink px-5 py-4 text-white"
            >
              <span className="text-sm">
                <span className="font-semibold">Not sure where to start?</span>{" "}
                <span className="text-white/60">See our process from first call to arrival.</span>
              </span>
              <Link
                href="/how-we-work"
                onClick={() => setActiveMenu(null)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
              >
                How we work <Arrow className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div
            ref={(el) => {
              contentRefs.current.countries = el;
            }}
            className="absolute left-0 top-0 flex w-[640px] gap-3 p-3"
          >
            <div className="grid flex-1 grid-cols-2 gap-1">
              {countries.map((c) => (
                <Link
                  key={c.name}
                  href={c.href}
                  data-menu-item
                  onClick={() => setActiveMenu(null)}
                  className="group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-brand/[0.07]"
                >
                  <span
                    className="h-7 w-10 shrink-0 rounded-md shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                    style={{ background: c.flag }}
                    aria-hidden
                  />
                  <span>
                    <span className="block text-[0.92rem] font-semibold text-ink">{c.name}</span>
                    <span className="block text-[0.78rem] text-ink/55 transition-colors group-hover:text-brand">
                      {c.tagline}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
            <Link
              href="/consultation"
              data-menu-item
              onClick={() => setActiveMenu(null)}
              className="group relative flex w-[200px] flex-col justify-between overflow-hidden rounded-2xl bg-brand p-5 text-white"
            >
              <span className="absolute -right-8 -top-8 h-28 w-28 rounded-full border-[14px] border-white/15 transition-transform duration-700 group-hover:scale-150" />
              <span className="relative text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                6 destinations
              </span>
              <span className="relative">
                <span className="block text-lg font-semibold leading-tight">Which country fits you best?</span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Ask an advisor
                  <Arrow className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          </div>
        </div>
        <span
          ref={caretRef}
          aria-hidden
          className={`pointer-events-none absolute left-0 top-[calc(100%+8px)] hidden h-3 w-3 rounded-[3px] bg-white transition-opacity duration-200 lg:block ${
            activeMenu ? "opacity-100" : "opacity-0"
          }`}
          style={{ marginLeft: -6 }}
        />

        {/* Mobile sheet */}
        <div
          ref={mobileRef}
          id="mobile-menu"
          style={{ height: 0, visibility: "hidden", opacity: 0 }}
          className="mt-2 overflow-hidden rounded-[22px] bg-white shadow-[0_30px_80px_-20px_rgba(11,11,12,0.35)] lg:hidden"
        >
          <div data-lenis-prevent className="max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain p-3">
            {menuOrder.map((key) => {
              const open = mobileSection === key;
              return (
                <div key={key} data-mobile-item className="border-b border-ink/5">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setMobileSection(open ? null : key)}
                    className="flex w-full items-center justify-between px-3 py-4 text-left text-2xl font-semibold tracking-tight text-ink"
                  >
                    {key === "services" ? "Services" : "Countries"}
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${
                        open ? "bg-brand text-white" : "bg-ink/5"
                      }`}
                    >
                      <Chevron open={open} />
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-1 pb-3 sm:grid-cols-2">
                        {key === "services"
                          ? services.map((s) => (
                              <Link
                                key={s.label}
                                href={s.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.95rem] font-medium text-ink/80 active:bg-brand/10"
                              >
                                <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand">
                                  <Icon name={s.icon} className="h-[18px] w-[18px]" />
                                </span>
                                {s.label}
                              </Link>
                            ))
                          : countries.map((c) => (
                              <Link
                                key={c.name}
                                href={c.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 active:bg-brand/10"
                              >
                                <span className="h-6 w-9 rounded shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]" style={{ background: c.flag }} />
                                <span>
                                  <span className="block text-[0.95rem] font-medium text-ink">{c.name}</span>
                                  <span className="block text-xs text-ink/50">{c.tagline}</span>
                                </span>
                              </Link>
                            ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {[{ label: "How We Work", href: "/how-we-work" }, ...rightLinks].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                data-mobile-item
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between border-b border-ink/5 px-3 py-4 text-2xl font-semibold tracking-tight text-ink"
              >
                {item.label}
                <Arrow className="h-5 w-5 text-brand" />
              </Link>
            ))}
            <div data-mobile-item className="grid grid-cols-2 gap-2 pt-4">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-ink/10 text-sm font-semibold text-ink"
              >
                Login
              </Link>
              <ConsultationButton className="justify-between" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
