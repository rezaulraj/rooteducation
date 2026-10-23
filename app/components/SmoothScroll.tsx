"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

// Momentum scrolling for the whole page, driven by GSAP's ticker so every
// ScrollTrigger (pins, scrubs, parallax) reads the same eased position each frame.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      // Each frame closes 9% of the gap to the target: a soft, weighty glide.
      lerp: 0.09,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // In-page anchors glide instead of jumping.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -16 });
    };
    document.addEventListener("click", onClick);

    // Overlays (e.g. the mobile menu) pause the page underneath.
    const lock = () => lenis.stop();
    const unlock = () => lenis.start();
    window.addEventListener("scroll:lock", lock);
    window.addEventListener("scroll:unlock", unlock);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll:lock", lock);
      window.removeEventListener("scroll:unlock", unlock);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
