# 🚀 Rajan Sharma — Portfolio

A personal developer portfolio built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Framer Motion** — featuring an animated shooting-star background, a custom glowing cursor, and smooth scroll-triggered reveals.

🔗 **Live site:** _add your deployed link here_
👤 **Made by:** Rajan Sharma

---

## ✨ Features

- 🌌 **Animated night-sky background** — canvas-based twinkling stars with shooting stars that gently drift toward your cursor
- 🖱️ **Custom cursor** — a glowing dot with a lagging ring that expands over links and buttons
- 🎬 **Smooth motion** — staggered hero entrance, scroll-reveal sections, hover-lift project cards, orbiting tech chips
- 📱 **Fully responsive** — looks great from mobile to desktop
- ♿ **Accessible** — keyboard-focusable, respects `prefers-reduced-motion`
- 🧩 **Easy to edit** — all content (bio, projects, links) lives in one file: `lib/data.ts`
- 📬 **Contact form** — ready to wire up to EmailJS, Formspree, or your own API route

---

## 🛠️ Tech Stack

| Layer         | Tech                                  |
|---------------|----------------------------------------|
| 🧱 Framework  | Next.js (App Router)                   |
| 🟦 Language   | TypeScript                             |
| 🎨 Styling    | Tailwind CSS                           |
| 🎞️ Animation  | Framer Motion                          |
| 🖼️ Icons      | lucide-react                           |

---

## 📂 Project Structure

```
app/
  layout.tsx      → fonts, global background (StarField + CursorDot)
  page.tsx        → assembles all sections
  globals.css     → base styles, custom cursor, reveal animation
components/
  StarField.tsx   → canvas shooting-star / twinkle background 🌠
  CursorDot.tsx   → custom cursor dot + ring 🖱️
  Header.tsx      → nav with scroll-spy active state
  Hero.tsx        → intro + orbiting tech chips
  About.tsx       → bio, qualifications, experience, skills
  Projects.tsx    → project grid 💼
  Contact.tsx     → contact info + form 📬
  Footer.tsx
lib/
  data.ts         → ✏️ all editable content (name, links, projects, skills)
  useReveal.ts    → scroll reveal hook
public/
  images/         → 🖼️ profile photo & project screenshots go here
```

---

## 🚦 Getting Started

```bash
# 1️⃣ Install dependencies
npm install

# 2️⃣ Run the dev server
npm run dev
```

Then open **http://localhost:3000** 🎉

---

## 🖼️ Adding Images

1. Drop your file into `public/images/` (e.g. `profile.jpg`)
2. Reference it in `lib/data.ts` as `/images/profile.jpg`
3. Leave it blank to keep the fallback (initials avatar / placeholder icon)

---

## 📧 Wiring Up the Contact Form

`components/Contact.tsx` currently simulates a submit. Field names (`user_name`, `user_email`, `message`) match the original EmailJS template, so plugging in EmailJS, Formspree, or a custom API route is a drop-in swap inside `handleSubmit`.

---

## ☁️ Deploying

```bash
npm run build
npm start
```

Deploy straight to **Vercel** ▲, **Netlify**, or any Node host.

---

## 👨‍💻 About Me

**Rajan Sharma** — BCA (AI & ML) student passionate about AI, web technologies, and building smart, real-world digital solutions. 🤖

- 🎓 BCA — AI & ML (2025 – Present)
- 💼 AI Internship @ Codec Technologies
- 🧠 Skills: Python, C, HTML/CSS, Jupyter Lab, Data Analytics

---

## 📬 Get in Touch

- 📧 Email: rajansharma243641@gmail.com
- 📱 Phone: +91 7452073580
- 📍 Location: Bareilly, Uttar Pradesh
- 🐙 GitHub: [RAJAN2436](https://github.com/RAJAN2436)
- 💼 LinkedIn: [rajan-sharma-ai](https://www.linkedin.com/in/rajan-sharma-ai/)
- 📸 Instagram: [itz___rajan__sharma](https://www.instagram.com/itz___rajan__sharma/)

---

⭐ If you like this portfolio's design, feel free to fork it and make it your own!
