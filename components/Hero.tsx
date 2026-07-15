"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile, stack } from "@/lib/data";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 bg-[length:48px_48px] bg-grid-pattern"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-center w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-2 md:order-1"
        >
          <motion.p variants={item} className="section-eyebrow mb-5">
            {"// building intelligent systems"}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink mb-6"
          >
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-starlight to-comet">
              {profile.name}
            </span>
          </motion.h1>

          <motion.h2
            variants={item}
            className="font-mono text-sm md:text-base text-comet uppercase tracking-[0.15em] mb-6"
          >
            {profile.role}
          </motion.h2>

          <motion.p
            variants={item}
            className="text-muted text-base md:text-lg leading-relaxed max-w-lg mb-10"
          >
            Student passionate about AI, innovation, and technology. Focused
            on continuous learning and real-world problem solving — building
            smart, impactful digital solutions.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <a
              href="#contact"
              data-cursor-hover
              className="group inline-flex items-center gap-2 bg-starlight text-void font-medium px-6 py-3 rounded-full hover:bg-comet transition-colors"
            >
              Hire Me
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#projects"
              data-cursor-hover
              className="inline-flex items-center gap-2 border border-line text-ink font-medium px-6 py-3 rounded-full hover:border-starlight hover:text-starlight transition-colors"
            >
              View Projects
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-wrap gap-2 mt-12"
          >
            {stack.map((s) => (
              <span
                key={s}
                className="font-mono text-[11px] text-muted border border-line rounded-full px-3 py-1"
              >
                {s}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="order-1 md:order-2 relative flex items-center justify-center h-[320px] sm:h-[380px] md:h-[440px]"
        >
          <OrbitRing />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        data-cursor-hover
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted hover:text-starlight transition-colors"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">
          Scroll
        </span>
        <ArrowDown size={16} />
      </motion.a>
    </section>
  );
}

function OrbitRing() {
  const orbitTags = ["HTML", "CSS", "JS", "PY", "C", "FIG"];

  return (
    <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px]">
      {/* rings */}
      <div className="absolute inset-0 rounded-full border border-line" />
      <div className="absolute inset-8 rounded-full border border-line" />

      {/* glow core */}
      <div className="absolute inset-[22%] rounded-full bg-gradient-to-br from-starlight/20 to-comet/10 border border-starlight/30 backdrop-blur-sm overflow-hidden">
        <Image
          src="/images/MyPic.jpg"
          alt="Profile portrait of a smiling developer in a glowing circular orbit graphic with floating technology tags in a stylized digital portfolio section"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* orbiting chips */}
      <div className="absolute inset-0 animate-[spin_28s_linear_infinite]">
        {orbitTags.map((tag, i) => {
          const angle = (360 / orbitTags.length) * i;
          return (
            <div
              key={tag}
              className="absolute top-1/2 left-1/2 w-full h-full"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-panel border border-line flex items-center justify-center"
                style={{ transform: `rotate(-${angle}deg)` }}
              >
                <span className="font-mono text-[9px] text-starlight">
                  {tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
