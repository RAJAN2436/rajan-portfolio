"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSmoothScroll } from "@/components/SmoothScroll";

const navItems = [
  { id: "work", label: "WORK" },
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "education", label: "EDUCATION" },
  { id: "contact", label: "CONTACT" },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState<string>("work");
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollTo(`#${id}`, { offset: -20, duration: 1.3 });
    setActiveTab(id);
  };

  return (
    <div className="fixed bottom-5 sm:bottom-6 inset-x-0 z-50 flex justify-center items-center pointer-events-none px-2 sm:px-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto max-w-full"
      >
        <nav className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-1 sm:py-1.5 bg-[#fbfbfb]/90 backdrop-blur-xl border border-neutral-300/70 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)] max-w-[calc(100vw-1rem)] sm:max-w-none overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                data-cursor-hover
                className={cn(
                  "relative px-2.5 xs:px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold tracking-wider sm:tracking-widest transition-colors duration-300 rounded-full select-none cursor-pointer font-mono whitespace-nowrap",
                  isActive ? "text-white" : "text-neutral-600 hover:text-black"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavBackground"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 bg-neutral-950 rounded-full -z-10 shadow-sm"
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>
      </motion.div>
    </div>
  );
}
