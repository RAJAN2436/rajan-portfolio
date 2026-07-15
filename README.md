# Rajan Sharma — Portfolio

Rebuilt with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Canvas starfield background with ambient twinkle + shooting stars that gently parallax toward the mouse
- Custom glowing cursor dot with a lagging ring that expands over links/buttons
- Staggered hero entrance animation, scroll-triggered section reveals, animated project cards
- Fully responsive, keyboard-focusable, and respects `prefers-reduced-motion`
- Content centralized in `lib/data.ts` — edit that file to update your info, projects, and links

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  layout.tsx      → fonts, global background (StarField + CursorDot)
  page.tsx        → assembles all sections
  globals.css     → base styles, custom cursor, reveal animation
components/
  StarField.tsx   → canvas shooting-star / twinkle background
  CursorDot.tsx   → custom cursor dot + ring
  Header.tsx      → nav with scroll-spy active state
  Hero.tsx        → intro + orbiting tech chips
  About.tsx       → bio, qualifications, experience, skills
  Projects.tsx    → project grid
  Contact.tsx     → contact info + form
  Footer.tsx
lib/
  data.ts         → all editable content (name, links, projects, skills)
  useReveal.ts    → IntersectionObserver-based scroll reveal hook
```

## Wiring up the contact form

The form in `components/Contact.tsx` currently simulates a submit. To send real
emails, plug in EmailJS (as the original site did), Formspree, or a custom API
route inside the `handleSubmit` function — the `name` attributes on each field
(`user_name`, `user_email`, `message`) match the original template so an
EmailJS integration is a drop-in.

## Deploying

This is a standard Next.js app — deploy directly to Vercel, Netlify, or any
Node host:

```bash
npm run build
npm start
```
