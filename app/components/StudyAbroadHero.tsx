"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { countries, Icon } from "./Header";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function PhotoCard({ src, alt, position, bg = "", cover = true, label }: { src: string; alt: string; position?: string; bg?: string; cover?: boolean; label: string }) {
  return (
    <div className={`relative h-full w-full ${bg}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 30vw, 60vw"
        className={cover ? "object-cover" : "object-contain object-bottom"}
        style={position ? { objectPosition: position } : undefined}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#141012]/80 to-transparent p-4 pt-14">
        <span className="text-sm font-semibold text-white">{label}</span>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, copy, tone }: { icon: string; title: string; copy: string; tone: string }) {
  return (
    <div className={`flex h-full w-full flex-col justify-between p-4 sm:p-5 ${tone}`}>
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/20">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-base font-semibold leading-tight tracking-tight sm:text-xl">{title}</span>
        <span className="mt-1.5 block text-xs leading-snug opacity-75 sm:text-sm">{copy}</span>
      </span>
    </div>
  );
}

function FlagCard({ name }: { name: string }) {
  const c = countries.find((x) => x.name === name)!;
  return (
    <div className="flex h-full w-full flex-col justify-between bg-white p-4 text-ink sm:p-5">
      <span className="h-12 w-[4.5rem] rounded-lg shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]" style={{ background: c.flag }} />
      <span>
        <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand">Destination</span>
        <span className="mt-1 block text-xl font-semibold leading-tight tracking-tight">{c.tagline}</span>
      </span>
    </div>
  );
}

const ORANGE = "bg-[linear-gradient(150deg,#F7924F_0%,#D9561A_100%)] text-white";
const INK = "bg-[linear-gradient(150deg,#2A2023_0%,#141012_100%)] text-white";
const PEACH = "bg-[linear-gradient(150deg,#FFF0E3_0%,#FFC79E_100%)] text-ink";

// Nearest last: the order they fly past the camera.
const tunnel: ReactNode[] = [
  <InfoCard key="a" icon="compass" title="One-to-one guidance" copy="Plan your path with an advisor" tone={ORANGE} />,
  <PhotoCard key="b" src="/centerstudent.png" alt="Graduate with his diploma" cover={false} bg="bg-[linear-gradient(170deg,#FFE3CC,#F7924F)]" label="Your first step" />,
  <FlagCard key="c" name="UK" />,
  <InfoCard key="d" icon="university" title="University match" copy="Courses that fit your goals" tone={INK} />,
  <PhotoCard key="e" src="/study-abroad.png" alt="Students looking up at the sky" position="18% 40%" label="Dream bigger" />,
  <FlagCard key="f" name="Malta" />,
  <InfoCard key="g" icon="scholarship" title="Scholarships" copy="Find funding, cut your costs" tone={PEACH} />,
  <PhotoCard key="h" src="/rightstudent-cutout.png" alt="Graduate holding her diploma" cover={false} bg="bg-[linear-gradient(170deg,#2A2023,#5A2A1A)]" label="Your big day" />,
  <FlagCard key="i" name="Romania" />,
  <InfoCard key="j" icon="document" title="Applications" copy="Documents done right" tone={ORANGE} />,
  <FlagCard key="k" name="Hungary" />,
  <PhotoCard key="l" src="/study-abroad.png" alt="A plane flying over world landmarks" position="78% 30%" label="See the world" />,
  <InfoCard key="m" icon="passport" title="Visa guidance" copy="Step by step, start to finish" tone={INK} />,
  <FlagCard key="n" name="Greece" />,
  <FlagCard key="o" name="Cyprus" />,
];

export default function StudyAbroadHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const stage = section.querySelector<HTMLElement>("[data-tun-stage]")!;
      const plane = section.querySelector<HTMLElement>("[data-tun-plane]")!;
      const cards = gsap.utils.toArray<HTMLElement>("[data-tun-card]", section);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        section.classList.add("pinned");

        // On load: the title rises out of its mask.
        gsap
          .timeline({ defaults: { ease: "expo.out" }, delay: 0.3 })
          .fromTo("[data-tun-line]", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.12 }, 0)
          .fromTo("[data-tun-fade]", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" }, 0.45);
        gsap.to("[data-tun-cue]", { y: 10, duration: 0.9, ease: "sine.inOut", yoyo: true, repeat: -1 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, pin: true, start: "top top", end: "+=480%", scrub: 0.7, invalidateOnRefresh: true },
        });

        // Each card is placed on a golden-angle spiral, then flies from far away past the camera.
        const SPAN = 0.42;
        const LAST_START = 0.5;
        cards.forEach((card, i) => {
          const angle = i * 137.5 * (Math.PI / 180);
          const rx = 0.3 + (i % 3) * 0.07;
          const ry = 0.27 + (i % 2) * 0.09;
          const small = () => stage.offsetWidth < 768;
          const at = (i / (cards.length - 1)) * LAST_START;
          gsap.set(card, { xPercent: -50, yPercent: -50, rotation: (i % 2 ? -1 : 1) * (3 + (i % 5) * 2) });
          tl.fromTo(
            card,
            {
              x: () => Math.cos(angle) * stage.offsetWidth * rx,
              y: () => Math.sin(angle) * stage.offsetHeight * ry,
              z: () => (small() ? -1200 : -1700),
            },
            { z: () => (small() ? 350 : 520), duration: SPAN },
            at,
          )
            .fromTo(card, { autoAlpha: 0 }, { autoAlpha: 1, duration: SPAN * 0.18 }, at)
            .to(card, { autoAlpha: 0, duration: SPAN * 0.14 }, at + SPAN * 0.84);
        });

        // Title grows towards the camera as the cards rush by, then gives way to the finale.
        tl.fromTo("[data-tun-title]", { scale: 0.86 }, { scale: 1.3, duration: 0.72 }, 0)
          .to("[data-tun-title]", { autoAlpha: 0, duration: 0.12 }, 0.6)
          .to("[data-tun-prompt]", { autoAlpha: 0, duration: 0.05 }, 0)
          .fromTo("[data-tun-ring='a']", { scale: 0.7 }, { scale: 1.9, duration: 0.92 }, 0)
          .fromTo("[data-tun-ring='b']", { scale: 0.8, rotation: 0 }, { scale: 1.6, rotation: 90, duration: 0.92 }, 0);

        // Finale: the end of the tunnel opens onto the full picture.
        tl.fromTo(
          "[data-tun-finale]",
          { clipPath: "inset(40% 42% 40% 42% round 28px)", autoAlpha: 0 },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", autoAlpha: 1, duration: 0.34, ease: "power2.inOut" },
          0.62,
        )
          .fromTo("[data-tun-finale-img]", { scale: 1.5 }, { scale: 1, duration: 0.36, ease: "power2.out" }, 0.62)
          .fromTo("[data-tun-panel]", { y: 70, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.12, ease: "power3.out" }, 0.94)
          // No distance on wider screens, where this is just a pause on the finished picture.
          .to("[data-tun-finale-pan]", { x: () => Math.min(0, stage.offsetWidth - section.querySelector<HTMLElement>("[data-tun-finale-pan]")!.offsetWidth), duration: 0.3, ease: "sine.inOut" }, 1)
          .to({}, { duration: 0.06 });

        // Pointer: shifting the whole 3D plane gives true parallax, since near cards move most.
        const px = gsap.quickTo(plane, "x", { duration: 1, ease: "power3.out" });
        const py = gsap.quickTo(plane, "y", { duration: 1, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          px(-(e.clientX / window.innerWidth - 0.5) * 60);
          py(-(e.clientY / window.innerHeight - 0.5) * 40);
        };
        window.addEventListener("pointermove", move, { passive: true });

        return () => {
          window.removeEventListener("pointermove", move);
          section.classList.remove("pinned");
        };
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="group/tun bg-white px-3 pt-3">
      <section
        data-tun-stage
        aria-labelledby="sa-title"
        className="relative flex min-h-[calc(100svh-24px)] flex-col items-center justify-center overflow-hidden rounded-[28px] bg-[radial-gradient(90%_80%_at_50%_45%,#FFF6EE_0%,#FFE3CC_55%,#FFC79E_100%)] [perspective:1200px] group-[.pinned]/tun:h-[calc(100svh-24px)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(180,90,40,0.35)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_55%,transparent_100%)]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
          <div data-tun-ring="a" className="col-start-1 row-start-1 h-[48vmin] w-[48vmin] rounded-full border border-brand/25" />
          <div data-tun-ring="b" className="col-start-1 row-start-1 h-[76vmin] w-[76vmin] rounded-full border border-dashed border-brand/30" />
        </div>

        {/* Title */}
        <div data-tun-title className="relative z-0 flex max-w-4xl flex-col items-center px-6 pb-10 pt-28 text-center">
          <p data-tun-fade className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand sm:text-sm">
            <span className="h-3.5 w-5 bg-brand [clip-path:polygon(0_0,70%_0,100%_50%,70%_100%,0_100%)]" />
            Our services
          </p>
          <h1 id="sa-title" className="mt-5 text-[clamp(3rem,8.4vw,7.6rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-ink">
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-tun-line className="block">Study abroad</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-tun-line className="block text-brand">consultation</span>
            </span>
          </h1>
          <p data-tun-fade className="mt-5 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">
            One-to-one guidance to plan your path, from choosing a country to your first day on campus.
          </p>
        </div>

        <div data-tun-prompt aria-hidden className="pointer-events-none absolute bottom-7 z-10 hidden flex-col items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ink/60 group-[.pinned]/tun:flex">
          Scroll to explore
          <span data-tun-cue className="block h-7 w-px bg-gradient-to-b from-brand to-transparent" />
        </div>

        {/* 3D corridor */}
        <div data-tun-plane aria-hidden className="pointer-events-none absolute inset-0 hidden [transform-style:preserve-3d] group-[.pinned]/tun:block">
          {tunnel.map((card, i) => (
            <div
              key={i}
              data-tun-card
              className="invisible absolute left-1/2 top-1/2 aspect-[4/5] w-[clamp(130px,19vw,270px)] overflow-hidden rounded-2xl shadow-[0_30px_60px_-20px_rgba(90,40,10,0.55)] ring-1 ring-black/5 will-change-transform"
            >
              {card}
            </div>
          ))}
        </div>

        {/* End of the tunnel */}
        <div data-tun-finale className="relative z-20 flex w-full flex-col overflow-hidden bg-[#FEF9F5] group-[.pinned]/tun:invisible group-[.pinned]/tun:absolute group-[.pinned]/tun:inset-0">
          <div data-tun-panel className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-10 text-center group-[.pinned]/tun:py-0">
            <p className="text-[clamp(1.5rem,min(3.4vw,5.2vh),3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
              Your world starts with <span className="text-brand">one conversation.</span>
            </p>
            <Link href="/consultation" className="group mt-[2vh] inline-flex h-12 items-center gap-3 rounded-2xl bg-ink pl-5 pr-2 text-sm font-semibold text-white">
              Book a consultation
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand transition-transform duration-300 group-hover:rotate-[-45deg]">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          </div>
          {/* The whole picture stays visible. On phones it would be tiny at full width, so it's taller and scroll pans across it. */}
          <div
            data-tun-finale-pan
            className="relative aspect-[2023/777] w-full shrink-0 group-[.pinned]/tun:max-h-[84%] max-sm:group-[.pinned]/tun:h-[56%] max-sm:group-[.pinned]/tun:max-h-none max-sm:group-[.pinned]/tun:w-auto max-sm:group-[.pinned]/tun:max-w-none max-sm:group-[.pinned]/tun:self-start"
          >
            <div data-tun-finale-img className="absolute inset-0 origin-bottom">
              <Image
                src="/study-abroad-consultation.png"
                alt="Three students looking up at a plane flying over a world map and famous landmarks"
                fill
                sizes="(max-width: 639px) 300vw, 100vw"
                className="object-contain object-bottom [mask-image:linear-gradient(180deg,transparent_0,#000_1.6%)]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
