import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CursorDot from "@/components/CursorDot";
import StarField from "@/components/StarField";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Rajan Sharma — Full Stack Developer",
  description:
    "Portfolio of Rajan Sharma, BCA AI & ML student and full stack developer building intelligent, real-world digital solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body bg-void text-ink antialiased selection:bg-starlight/30 selection:text-white`}
      >
        <StarField />
        <CursorDot />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
