"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { profile, experience, education, projects } from "@/lib/data";
import { useRef, useState, useEffect } from "react";
import MarqueeAlongSvgPath from "@/components/MarqueeAlongSvgPath";
import KineticGrid from "@/components/KineticGrid";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import BackgroundGrid from "@/components/BackgroundGrid";
import WaveRibbon from "@/components/WaveRibbon";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { 
  SiPython, SiJavascript, SiTypescript, SiReact, SiNextdotjs, 
  SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss, SiGithub, 
  SiPytorch, SiTensorflow, SiDocker
} from "react-icons/si";
import { FaAws, FaRobot } from "react-icons/fa";

const skillItems = [
  { name: "Python", Icon: SiPython },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express.js", Icon: SiExpress },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "GitHub", Icon: SiGithub },
  { name: "PyTorch", Icon: SiPytorch },
  { name: "TensorFlow", Icon: SiTensorflow },
  { name: "Docker", Icon: SiDocker },
  { name: "AWS", Icon: FaAws },
  { name: "OpenAI", Icon: FaRobot },
];

/* ─── Reusable scroll-reveal wrapper with smooth cubic-bezier easing ─── */
function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const directionMap = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: directionMap[direction].y,
        x: directionMap[direction].x,
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0 }
          : { opacity: 0, y: directionMap[direction].y, x: directionMap[direction].x }
      }
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Scroll-linked Smooth 3D Card Reveal wrapper ─── */
function CardReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const scale = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [0.94, 1, 1, 0.94]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  const rotateX = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [6, 0, 0, -6]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, rotateX, transformPerspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Text line reveal (clips overflow smoothly) ─── */
function TextLineReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "115%", rotate: 2 }}
        animate={isInView ? { y: "0%", rotate: 0 } : { y: "115%", rotate: 2 }}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Infinite Marquee ─── */
function InfiniteMarquee({
  items,
  speed = 28,
  reverse = false,
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
}) {
  return (
    <div className="overflow-hidden whitespace-nowrap group/marquee select-none">
      <div
        className="inline-flex items-center group-hover/marquee:[animation-play-state:paused] will-change-transform"
        style={{
          animation: `${reverse ? "marqueeReverse" : "marquee"} ${speed}s linear infinite`,
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="inline-flex items-center flex-shrink-0">
            <span
              className="font-display text-[8vw] md:text-[5.5vw] font-bold uppercase tracking-tight mx-4 transition-all duration-300 cursor-default"
              style={{
                WebkitTextStroke: "1.5px #000",
                WebkitTextFillColor: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.webkitTextFillColor = "#000";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.webkitTextFillColor = "transparent";
              }}
            >
              {item}
            </span>
            <span className="w-10 md:w-14 h-2 bg-[#ff5e3a] rounded-full mx-4 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: footerScrollY } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });
  const footerPathLength = useTransform(footerScrollY, [0.15, 0.95], [0, 1]);

  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Parallax transforms with spring smoothing */
  const smoothHeroProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const heroY = useTransform(smoothHeroProgress, [0, 0.15], [0, 100]);
  const heroOpacity = useTransform(smoothHeroProgress, [0, 0.12], [1, 0]);
  const picScale = useTransform(smoothHeroProgress, [0, 0.15], [1, 1.12]);
  const picY = useTransform(smoothHeroProgress, [0, 0.15], [0, -35]);

  /* Stagger container for initial load */
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.09, delayChildren: 0.1 },
    },
  };

  const textReveal = {
    hidden: { opacity: 0, y: 80, rotate: 2 },
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <main
      ref={containerRef}
      className="relative bg-white text-black font-body overflow-x-hidden selection:bg-black selection:text-white"
    >
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <BackgroundGrid />
      <Navbar />

      {/* Floating Smooth Back-To-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => scrollTo(0, { duration: 1.5 })}
            data-cursor-hover
            aria-label="Scroll back to top"
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-neutral-900 text-white shadow-lg flex items-center justify-center hover:bg-[#ff5e3a] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center py-20 md:py-0 px-6 md:px-16 lg:px-24">
        <WaveRibbon />
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="w-full relative z-10"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isLoading ? "hidden" : "show"}
            className="flex flex-col gap-2"
          >
            <div className="overflow-hidden">
              <motion.p
                variants={textReveal}
                className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-500 mb-4"
              >
                {profile.role}
              </motion.p>
            </div>

            {/* Massive Typography + Profile Pic */}
            <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
              <div className="flex-1">
                <div className="overflow-hidden">
                  <motion.h1
                    variants={textReveal}
                    className="font-display text-[14vw] md:text-[12vw] leading-[0.85] font-bold tracking-tighter uppercase select-none"
                  >
                    Rajan
                  </motion.h1>
                </div>
                <div className="overflow-hidden flex items-end gap-4 md:gap-8">
                  <motion.h1
                    variants={textReveal}
                    className="font-display text-[14vw] md:text-[12vw] leading-[0.85] font-bold tracking-tighter uppercase select-none"
                  >
                    Sharma
                  </motion.h1>
                  <motion.div
                    variants={fadeUp}
                    className="mb-2 md:mb-6 hidden sm:block"
                  >
                    <button
                      type="button"
                      onClick={() => scrollTo("#about", { duration: 1.3 })}
                      data-cursor-hover
                      aria-label="Scroll to About section"
                      className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-black flex items-center justify-center relative overflow-hidden group cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                      <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-black group-hover:text-white relative z-10 transition-all duration-500 group-hover:rotate-45" />
                    </button>
                  </motion.div>
                </div>
              </div>

              {/* Profile Picture */}
              <motion.div
                variants={fadeUp}
                style={{ scale: picScale, y: picY }}
                className="relative w-36 h-36 xs:w-40 xs:h-40 md:w-56 md:h-56 flex-shrink-0 self-end md:self-auto mb-2"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-black group shadow-md hover:shadow-xl transition-shadow duration-500">
                  <Image
                    src="/images/MyPic.jpg"
                    alt="Rajan Sharma"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                {/* Decorative corner marks */}
                <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-black" />
                <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-black" />
                <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-black" />
                <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-black" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Smooth Scroll Indicator */}
        <motion.button
          type="button"
          onClick={() => scrollTo("#about", { duration: 1.3 })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-6 md:left-16 flex flex-col items-center gap-4 cursor-pointer group select-none"
          aria-label="Scroll down"
        >
          <span
            className="font-mono text-xs uppercase tracking-widest text-neutral-400 group-hover:text-black transition-colors"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
          <div className="w-[1.5px] h-14 bg-neutral-200 relative overflow-hidden rounded-full group-hover:bg-neutral-300 transition-colors">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full bg-[#ff5e3a]"
            />
          </div>
        </motion.button>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT SECTION
      ═══════════════════════════════════════════ */}
      <section id="about" className="py-32 md:py-44 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_0.6fr] gap-16 items-center">
          <div>
            <TextLineReveal>
              <h2 className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-400 mb-12">
                [ 01 ] Intro
              </h2>
            </TextLineReveal>

            <ScrollReveal>
              <p className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-medium tracking-tight">
                I develop{" "}
                <span className="relative inline-block px-3 font-semibold">
                  intelligent
                  <svg
                    className="absolute -inset-x-3 -inset-y-1.5 w-[calc(100%+1.5rem)] h-[calc(100%+0.75rem)] pointer-events-none z-10"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M 82,15 C 48,12 12,18 7,48 C 2,78 42,90 72,85 C 92,82 90,42 75,20 C 67,10 79,12 87,15"
                      stroke="#ff5e3a"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                    />
                  </svg>
                </span>
                , AI-driven digital experiences.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-medium tracking-tight mt-4 text-neutral-400">
                Bridging concept to execution.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="mt-14 flex items-center gap-6">
              <a
                href={`mailto:${profile.email}`}
                data-cursor-hover
                className="inline-flex items-center gap-2 border-b-2 border-black pb-1 font-mono text-xs md:text-sm uppercase tracking-widest hover:text-[#ff5e3a] hover:border-[#ff5e3a] transition-all duration-300"
              >
                <Mail size={16} /> Get in Touch
              </a>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                aria-label="GitHub Profile"
                className="w-11 h-11 rounded-full border border-black/80 flex items-center justify-center hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 shadow-sm"
              >
                <Github size={17} />
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                aria-label="LinkedIn Profile"
                className="w-11 h-11 rounded-full border border-black/80 flex items-center justify-center hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 shadow-sm"
              >
                <Linkedin size={17} />
              </a>
            </ScrollReveal>
          </div>

          {/* About Image portrait */}
          <ScrollReveal direction="right" className="hidden md:block">
            <div className="relative aspect-[3/4] w-full overflow-hidden group rounded-2xl shadow-lg border border-black/10">
              <Image
                src="/images/MyPic.jpg"
                alt="Rajan Sharma portrait"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 ease-out"
              />
              <div className="absolute inset-0 border border-black/20 rounded-2xl pointer-events-none" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PROJECTS SECTION
      ═══════════════════════════════════════════ */}
      <section id="work" className="relative bg-[#000000] text-white overflow-hidden">
        <KineticGrid globalColor="monochrome" className="py-32 md:py-44 px-6 md:px-16 lg:px-24 bg-[#000000]">
          <div className="flex items-end justify-between mb-16 md:mb-24">
            <TextLineReveal>
              <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter uppercase">
                Selected <br /> Works
              </h2>
            </TextLineReveal>
            <ScrollReveal direction="left">
              <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-500 mb-2">
                [ 02 ]
              </span>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
            {projects.map((project, i) => (
              <CardReveal
                key={i}
                className={i % 2 !== 0 ? "md:mt-20" : ""}
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative p-8 md:p-12 bg-white rounded-2xl border border-neutral-200/80 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[320px] text-black overflow-hidden"
                >
                  {/* Subtle dark spotlight gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div>
                    <h3 className="font-display text-2xl md:text-3xl mb-3 font-bold text-neutral-900 group-hover:text-black transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs md:text-sm text-neutral-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-2.5">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-xs border border-neutral-200/80 px-3 py-1 text-neutral-700 bg-neutral-50 rounded-md transition-colors group-hover:border-neutral-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-hover
                      aria-label={`View ${project.title} live demo`}
                      className="absolute top-8 right-8 w-11 h-11 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-900 hover:bg-neutral-950 hover:text-white hover:rotate-45 transition-all duration-300 shadow-sm"
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  )}
                </motion.div>
              </CardReveal>
            ))}
          </div>
        </KineticGrid>
      </section>

      {/* ═══════════════════════════════════════════
          MARQUEE BANNER — After Projects
      ═══════════════════════════════════════════ */}
      <section className="py-12 md:py-16 border-t border-b border-black/10 overflow-hidden bg-[#fafafa]">
        <InfiniteMarquee
          items={[
            "AI Engineer",
            "Full-Stack Dev",
            "Startup Founder",
            "Machine Learning",
            "Innovation",
          ]}
          speed={32}
        />
        <div className="h-4" />
        <InfiniteMarquee
          items={[
            "StackLabs",
            "InvertisPrep",
            "Deep Learning",
            "MERN Stack",
            "Next.js",
          ]}
          speed={26}
          reverse
        />
      </section>

      {/* ═══════════════════════════════════════════
          EXPERIENCE SECTION
      ═══════════════════════════════════════════ */}
      <section id="experience" className="py-32 md:py-44 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto mb-16">
          <TextLineReveal>
            <h2 className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-400 mb-8">
              [ 03 ] Experience
            </h2>
          </TextLineReveal>

          <div className="flex flex-col">
            {experience.map((exp, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ x: 12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-black/10 hover:border-black transition-colors duration-300 cursor-default"
                >
                  <div className="flex-1">
                    <h3 className="font-display text-2xl md:text-3xl font-semibold group-hover:text-[#ff5e3a] transition-colors">
                      {exp.role}
                    </h3>
                    <p className="font-mono text-xs md:text-sm text-neutral-500 mt-2">
                      {exp.company} — {exp.description}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 md:text-right font-mono text-xs md:text-sm uppercase tracking-widest text-black flex-shrink-0">
                    {exp.period}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EDUCATION SECTION
      ═══════════════════════════════════════════ */}
      <section id="education" className="py-32 md:py-44 px-6 md:px-16 lg:px-24 border-t border-black/10">
        <div className="max-w-5xl mx-auto mb-16">
          <TextLineReveal>
            <h2 className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-400 mb-8">
              [ 04 ] Education
            </h2>
          </TextLineReveal>

          <div className="flex flex-col">
            {education.map((edu, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ x: 12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-black/10 hover:border-black transition-colors duration-300 cursor-default"
                >
                  <div className="flex-1">
                    <h3 className="font-display text-2xl md:text-3xl font-semibold group-hover:text-[#ff5e3a] transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="font-mono text-xs md:text-sm text-neutral-500 mt-2">
                      {edu.school} — {edu.description}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 md:text-right font-mono text-xs md:text-sm uppercase tracking-widest text-black flex-shrink-0">
                    {edu.period}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SKILLS SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-20 border-t border-black/10 overflow-hidden bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24 mb-16">
          <TextLineReveal>
            <h2 className="font-mono text-xs md:text-sm uppercase tracking-widest text-neutral-400 mb-8">
              [ 05 ] Skills
            </h2>
          </TextLineReveal>
          <ScrollReveal delay={0.1}>
            <p className="font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] max-w-4xl text-black">
              Currently focused on building scalable, high-performance web applications using the MERN stack, React, Next.js, and modern AI web architectures.
            </p>
          </ScrollReveal>
        </div>

        <div className="w-full h-[240px] relative overflow-hidden flex items-center justify-center">
          <MarqueeAlongSvgPath
            path="M -200 100 C 150 0, 350 200, 600 100 C 850 0, 1050 200, 1400 100"
            viewBox="0 0 1200 200"
            width="120%"
            height={200}
            baseVelocity={1.5}
            slowdownOnHover={true}
            slowDownFactor={0.2}
            repeat={4}
            responsive={true}
            gap={12}
            className="w-[120%] h-full max-w-none flex items-center justify-center"
          >
            {skillItems.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300/40 rounded-full text-neutral-600 hover:text-black transition-all duration-300 shadow-sm cursor-default select-none"
              >
                <skill.Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-mono text-xs md:text-sm font-semibold tracking-wide">
                  {skill.name}
                </span>
              </div>
            ))}
          </MarqueeAlongSvgPath>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER / CONTACT SECTION
      ═══════════════════════════════════════════ */}
      <footer ref={footerRef} id="contact" className="relative bg-[#000000] text-white overflow-hidden">
        <KineticGrid globalColor="monochrome" className="min-h-screen flex flex-col justify-between py-16 px-6 md:px-16 lg:px-24 bg-[#000000]">
          <div className="flex justify-between items-start w-full">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              [ CONTACT ]
            </span>
          </div>

          <div className="relative flex-1 flex flex-col justify-center items-center py-12 md:py-20 w-full min-h-[350px]">
            {/* Curvy Orange SVG Line */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-20 flex justify-center items-center">
              <svg
                viewBox="0 0 1000 600"
                className="w-full h-full max-w-5xl"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M 500,580 C 430,460 380,360 480,270 C 580,180 540,100 460,20"
                  stroke="#ff5e3a"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  style={{ pathLength: footerPathLength }}
                />
                {/* Decorative floating orange dot */}
                <circle
                  cx="685"
                  cy="510"
                  r="3.5"
                  fill="#ff5e3a"
                />
              </svg>
            </div>

            <h2 className="font-display text-[15vw] md:text-[11vw] font-bold leading-[0.85] tracking-tighter uppercase text-center select-none relative z-10 text-white">
              Let&apos;s <br /> Build.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end w-full z-10 mt-auto pt-8 border-t border-white/10">
            {/* Left Column */}
            <div className="max-w-xs text-neutral-400 font-mono text-xs md:text-sm leading-relaxed">
              Available for freelance work, startup collaborations, and ambitious product ideas.
            </div>

            {/* Center Column */}
            <div className="flex flex-col items-center justify-center">
              <a
                href={`mailto:${profile.email}`}
                data-cursor-hover
                className="font-display text-lg md:text-2xl font-bold tracking-tight text-white hover:text-[#ff5e3a] transition-colors"
              >
                {profile.email}
              </a>
            </div>

            {/* Right Column */}
            <div className="flex flex-col items-end gap-1.5 font-display text-sm md:text-base font-bold text-white">
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="hover:text-[#ff5e3a] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="hover:text-[#ff5e3a] transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </KineticGrid>
      </footer>
    </main>
  );
}
