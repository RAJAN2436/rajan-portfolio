import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer id="fot" className="relative border-t border-line py-10">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-muted text-sm">
          © 2026 {profile.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="text-muted hover:text-starlight transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="text-muted hover:text-starlight transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={profile.social.instagram}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="text-muted hover:text-starlight transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            data-cursor-hover
            className="text-muted hover:text-starlight transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
