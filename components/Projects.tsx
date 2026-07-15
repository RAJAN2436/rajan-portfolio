"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useReveal } from "@/lib/useReveal";
import { projects } from "@/lib/data";

export default function Projects() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div ref={ref} className="reveal">
          <p className="section-eyebrow mb-3">// projects</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-14">
            Things I&apos;ve built
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group relative bg-panel/60 border border-line rounded-2xl p-6 flex flex-col hover:border-starlight/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="font-mono text-[10px] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full border ${
                    project.status === "live"
                      ? "border-starlight/40 text-starlight"
                      : "border-comet/40 text-comet"
                  }`}
                >
                  {project.status === "live" ? "Live" : "In Progress"}
                </span>
              </div>

              <h3 className="font-display text-xl text-ink mb-2">
                {project.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] text-muted border border-line rounded-full px-2.5 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-line">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    className="inline-flex items-center gap-1.5 text-sm text-ink hover:text-starlight transition-colors"
                  >
                    <ExternalLink size={14} /> Demo
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted/50">
                    <ExternalLink size={14} /> Demo
                  </span>
                )}
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    className="inline-flex items-center gap-1.5 text-sm text-ink hover:text-starlight transition-colors"
                  >
                    <Github size={14} /> Code
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted/50">
                    <Github size={14} /> Code
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
