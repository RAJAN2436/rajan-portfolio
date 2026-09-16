"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const touchCheck = window.matchMedia("(hover: none)").matches;
    setIsTouch(touchCheck);
    if (touchCheck) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let ringScale = 1;
    let isHovering = false;
    let isClicking = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseDown = () => {
      isClicking = true;
    };

    const handleMouseUp = () => {
      isClicking = false;
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Delegated hover detection for interactive elements (supports dynamic elements too)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [data-cursor-hover], [role="button"], .group, summary'
      );

      if (interactive) {
        isHovering = true;
        ringScale = 1.9;
        if (ringRef.current) {
          ringRef.current.style.borderColor = "rgba(255, 255, 255, 0.9)";
          ringRef.current.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [data-cursor-hover], [role="button"], .group, summary'
      );

      if (interactive) {
        // Check if relatedTarget is still within the same interactive element
        const related = e.relatedTarget as HTMLElement | null;
        if (!related || !related.closest('a, button, input, textarea, select, [data-cursor-hover], [role="button"], .group, summary')) {
          isHovering = false;
          ringScale = 1;
          if (ringRef.current) {
            ringRef.current.style.borderColor = "rgba(255, 255, 255, 0.8)";
            ringRef.current.style.backgroundColor = "transparent";
          }
        }
      }
    };

    let rafId: number;
    const animateRing = () => {
      // Smooth lerping with 0.18 factor for responsive yet fluid trailing
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      let currentScale = ringScale;
      if (isClicking) {
        currentScale *= 0.8;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${currentScale})`;
      }

      rafId = requestAnimationFrame(animateRing);
    };

    rafId = requestAnimationFrame(animateRing);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Center pinpoint */}
      <div
        ref={dotRef}
        style={{ opacity: isVisible ? 1 : 0 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white mix-blend-difference pointer-events-none z-[10000] will-change-transform transition-opacity duration-300"
      />
      {/* Fluid trailing ring */}
      <div
        ref={ringRef}
        style={{ opacity: isVisible ? 1 : 0 }}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-white/80 mix-blend-difference pointer-events-none z-[10000] will-change-transform transition-opacity duration-300 backdrop-blur-[0.5px]"
      />
    </>
  );
}
