"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";
import { qualifications, experience, skills } from "@/lib/data";
import { GraduationCap, Briefcase, Cpu } from "lucide-react";

export default function About() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div ref={ref} className="reveal">
          <p className="section-eyebrow mb-3">{"// about"}</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-14">
            Who I am
          </h2>

          <div className="grid md:grid-cols-[1fr_1.2fr] gap-14 items-start">
            <div className="space-y-6">
              <p className="text-muted leading-relaxed text-base md:text-lg">
                <span className="text-ink font-medium">
                  Hi! I&apos;m Rajan Sharma
                </span>
                , a passionate, innovative BCA (Artificial Intelligence)
                student with a strong interest in AI, web technologies, and
                modern digital solutions.
              </p>
              <p className="text-muted leading-relaxed text-base md:text-lg">
                I&apos;m currently pursuing my degree in Artificial
                Intelligence, where I&apos;ve developed a deep understanding
                of machine learning concepts, programming, and intelligent
                systems. I enjoy transforming ideas into smart, real-world
                applications that solve meaningful problems.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <InfoCard
                icon={<GraduationCap size={20} />}
                title="Qualifications"
                lines={[qualifications.period, qualifications.degree]}
              />
              <InfoCard
                icon={<Briefcase size={20} />}
                title="Experience"
                lines={[
                  experience.period,
                  `${experience.role} · ${experience.duration}`,
                  experience.company,
                ]}
              />
              <div className="sm:col-span-2">
                <InfoCard
                  icon={<Cpu size={20} />}
                  title="Skills"
                  chips={skills}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  lines,
  chips,
}: {
  icon: ReactNode;
  title: string;
  lines?: string[];
  chips?: string[];
}) {
  return (
    <div className="group relative bg-panel/60 border border-line rounded-2xl p-6 hover:border-starlight/40 transition-colors">
      <div className="flex items-center gap-3 mb-4 text-starlight">
        {icon}
        <h3 className="font-display text-lg text-ink">{title}</h3>
      </div>
      {lines && (
        <div className="space-y-1.5">
          {lines.map((line, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "font-mono text-xs text-comet uppercase tracking-wide"
                  : "text-muted text-sm"
              }
            >
              {line}
            </p>
          ))}
        </div>
      )}
      {chips && (
        <div className="flex flex-wrap gap-2 mt-1">
          {chips.map((chip) => (
            <span
              key={chip}
              className="font-mono text-[11px] text-muted border border-line rounded-full px-3 py-1"
            >
              {chip}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
