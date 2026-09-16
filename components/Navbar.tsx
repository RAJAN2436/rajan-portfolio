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
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex justify-center w-full max-w-max px-4"
    >
      <nav className="flex items-center gap-1 px-2.5 py-1.5 bg-[#fbfbfb]/85 backdrop-blur-xl border border-neutral-300/60 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)]">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              data-cursor-hover
              className={cn(
                "relative px-4 py-2 text-xs font-semibold tracking-wider transition-colors duration-300 rounded-full select-none cursor-pointer font-mono",
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
  );
}
