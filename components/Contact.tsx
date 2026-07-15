"use client";

import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import { useReveal } from "@/lib/useReveal";
import { profile } from "@/lib/data";

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    // Wire this up to EmailJS, Formspree, or your own API route.
    // Example (EmailJS): emailjs.sendForm(serviceId, templateId, e.currentTarget)
    await new Promise((resolve) => setTimeout(resolve, 900));

    setStatus("sent");
    e.currentTarget.reset();
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div ref={ref} className="reveal">
          <p className="section-eyebrow mb-3">// contact</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-14">
            Get in touch
          </h2>

          <div className="grid md:grid-cols-[1fr_1.2fr] gap-14">
            <div>
              <p className="text-muted leading-relaxed text-base md:text-lg mb-8">
                Let&apos;s collaborate. I&apos;m always open to discussing
                exciting projects and new opportunities.
              </p>

              <div className="space-y-4 mb-8">
                <a
                  href={`mailto:${profile.email}`}
                  data-cursor-hover
                  className="flex items-center gap-3 text-ink hover:text-starlight transition-colors"
                >
                  <Mail size={18} className="text-starlight" />
                  {profile.email}
                </a>
                <a
                  href={profile.social.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="flex items-center gap-3 text-ink hover:text-starlight transition-colors"
                >
                  <Phone size={18} className="text-starlight" />
                  {profile.phone}
                </a>
                <div className="flex items-center gap-3 text-ink">
                  <MapPin size={18} className="text-starlight" />
                  {profile.location}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-muted hover:text-starlight hover:border-starlight/40 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-muted hover:text-starlight hover:border-starlight/40 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-[11px] uppercase tracking-widest text-muted mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Your name"
                  className="w-full bg-panel/60 border border-line rounded-lg px-4 py-3 text-ink placeholder:text-muted/60 focus:outline-none focus:border-starlight/60 transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] uppercase tracking-widest text-muted mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="you@example.com"
                  className="w-full bg-panel/60 border border-line rounded-lg px-4 py-3 text-ink placeholder:text-muted/60 focus:outline-none focus:border-starlight/60 transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] uppercase tracking-widest text-muted mb-2 block">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full bg-panel/60 border border-line rounded-lg px-4 py-3 text-ink placeholder:text-muted/60 focus:outline-none focus:border-starlight/60 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                data-cursor-hover
                disabled={status !== "idle"}
                className="inline-flex items-center gap-2 bg-starlight text-void font-medium px-6 py-3 rounded-full hover:bg-comet transition-colors disabled:opacity-60"
              >
                {status === "idle" && (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
                {status === "sending" && "Sending..."}
                {status === "sent" && "Message sent!"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
