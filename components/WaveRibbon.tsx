"use client";

import { useEffect, useRef } from "react";

export default function WaveRibbon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let time = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth || window.innerWidth;
      const h = parent?.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);
    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    const drawRibbon = (
      c: CanvasRenderingContext2D,
      w: number,
      cy: number,
      freq: number,
      amp: number,
      phaseOffset: number,
      linesCount: number,
      lineSpacing: number
    ) => {
      const step = 16;
      for (let i = 0; i < linesCount; i++) {
        c.beginPath();
        const baseAngle = phaseOffset + i * lineSpacing;
        for (let x = 0; x <= w; x += step) {
          const normX = x / w;
          const fade = Math.sin(normX * Math.PI);
          const angle = normX * Math.PI * freq + baseAngle;
          const y = cy + Math.sin(angle) * amp * fade;

          if (x === 0) c.moveTo(x, y);
          else c.lineTo(x, y);
        }
        c.strokeStyle = `rgba(0, 0, 0, ${0.18 - i * 0.01})`;
        c.lineWidth = 1.0;
        c.stroke();
      }
    };

    const draw = () => {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      const w = parseFloat(canvas.style.width) || window.innerWidth;
      const h = parseFloat(canvas.style.height) || window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const centerY = h / 2;

      // Draw Ribbon A
      drawRibbon(ctx, w, centerY, 1.6, 90, time * 0.015, 12, 0.035);

      // Draw Ribbon B
      drawRibbon(ctx, w, centerY, 2.4, 60, -time * 0.012, 10, -0.045);

      time += 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80 will-change-transform"
    />
  );
}
