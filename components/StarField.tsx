"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
  delay: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = document.documentElement.scrollHeight;
    let animationId: number;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const setSize = () => {
      width = window.innerWidth;
      height = document.documentElement.scrollHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setSize();

    const STAR_COUNT = Math.floor((width * height) / 9000);
    const stars: Star[] = Array.from({ length: STAR_COUNT }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.3 + 0.3,
      baseAlpha: Math.random() * 0.6 + 0.3,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    const shootingStars: ShootingStar[] = Array.from({ length: 4 }).map(
      () => ({
        x: Math.random() * width,
        y: Math.random() * height * 0.5,
        length: Math.random() * 80 + 60,
        speed: Math.random() * 6 + 8,
        angle: (Math.PI / 180) * (30 + Math.random() * 20),
        opacity: 0,
        active: false,
        delay: Math.random() * 400 + 100,
      })
    );

    let frame = 0;

    const resetShootingStar = (s: ShootingStar) => {
      s.x = Math.random() * width * 0.7;
      s.y = Math.random() * height * 0.4;
      s.length = Math.random() * 80 + 60;
      s.speed = Math.random() * 6 + 8;
      s.opacity = 0;
      s.active = false;
      s.delay = frame + Math.random() * 500 + 200;
    };

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const parallaxX =
        (mouseRef.current.targetX - width / 2) * 0.01;
      const parallaxY =
        (mouseRef.current.targetY - height / 2) * 0.01;

      // twinkling stars
      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const alpha =
          star.baseAlpha * (0.6 + 0.4 * Math.sin(star.twinklePhase));
        ctx.beginPath();
        ctx.arc(
          star.x + parallaxX,
          star.y + parallaxY,
          star.radius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(232, 234, 246, ${alpha})`;
        ctx.fill();
      });

      // shooting stars
      if (!reducedMotion) {
        shootingStars.forEach((s) => {
          if (!s.active) {
            if (frame >= s.delay) {
              s.active = true;
              s.opacity = 1;
            }
            return;
          }

          const dx = Math.cos(s.angle) * s.speed;
          const dy = Math.sin(s.angle) * s.speed;
          s.x += dx;
          s.y += dy;
          s.opacity -= 0.012;

          if (s.opacity <= 0 || s.x > width + 100 || s.y > height + 100) {
            resetShootingStar(s);
            return;
          }

          const tailX = s.x - Math.cos(s.angle) * s.length;
          const tailY = s.y - Math.sin(s.angle) * s.length;

          const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
          gradient.addColorStop(0, `rgba(255, 184, 108, ${s.opacity})`);
          gradient.addColorStop(1, "rgba(124, 158, 255, 0)");

          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.lineCap = "round";
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(s.x, s.y, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
          ctx.fill();
        });
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY + window.scrollY;
    };

    const handleResize = () => setSize();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at 50% -10%, #12162A 0%, #0A0D17 60%)",
      }}
    />
  );
}
