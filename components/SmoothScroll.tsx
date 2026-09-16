"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Lenis from "lenis";

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (
    target: string | HTMLElement | number,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (t: number) => number;
      immediate?: boolean;
      lock?: boolean;
      onComplete?: () => void;
    }
  ) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Highly refined, buttery smooth inertia scroll tuning
    const lenisInstance = new Lenis({
      lerp: 0.08, // Premium cinematic momentum smoothing
      wheelMultiplier: 0.9, // Balanced scroll velocity
      touchMultiplier: 1.5, // Responsive touch glide
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      infinite: false,
    });

    setLenis(lenisInstance);
    (window as any).lenis = lenisInstance;

    let rafId: number;
    function raf(time: number) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global intercept for all in-page hash links (e.g. href="#about", href="#work")
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const targetEl = document.querySelector(hash);
      if (targetEl) {
        e.preventDefault();
        lenisInstance.scrollTo(targetEl as HTMLElement, {
          offset: -20,
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
      setLenis(null);
      delete (window as any).lenis;
    };
  }, []);

  const scrollTo = (
    target: string | HTMLElement | number,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (t: number) => number;
      immediate?: boolean;
      lock?: boolean;
      onComplete?: () => void;
    }
  ) => {
    if (lenis) {
      lenis.scrollTo(target, {
        offset: options?.offset ?? -20,
        duration: options?.duration ?? 1.4,
        easing: options?.easing ?? ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
        ...options,
      });
    } else {
      if (typeof target === "string") {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: "smooth" });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth" });
      } else if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
