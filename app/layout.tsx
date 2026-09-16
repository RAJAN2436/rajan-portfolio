import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import CursorDot from "@/components/CursorDot";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { Analytics } from "@vercel/analytics/next";

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

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

const siteUrl = "https://mrajansharma.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rajan Sharma — AI Engineer & Full Stack Developer",
    template: "%s | Rajan Sharma",
  },
  description:
    "Official portfolio of Rajan Sharma — AI Engineer, Full-Stack Developer, and Founder of StackLabs. Building intelligent digital products with AI, Next.js, React, Node.js, and Machine Learning.",
  keywords: [
    "Rajan Sharma",
    "Rajan Sharma AI Engineer",
    "Rajan Sharma Developer",
    "Rajan Sharma Portfolio",
    "Rajan Sharma Bareilly",
    "Rajan Sharma Invertis University",
    "StackLabs Rajan Sharma",
    "InvertisPrep Rajan Sharma",
    "AI Engineer India",
    "Full Stack Developer Portfolio",
    "Next.js Developer Portfolio",
    "Machine Learning Engineer Bareilly",
    "React Developer",
    "MERN Stack Developer",
    "Python AI Engineer",
  ],
  authors: [{ name: "Rajan Sharma", url: siteUrl }],
  creator: "Rajan Sharma",
  publisher: "Rajan Sharma",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Rajan Sharma — AI Engineer & Full Stack Developer",
    description:
      "Explore the portfolio, AI systems, full-stack projects, and innovations built by Rajan Sharma.",
    url: siteUrl,
    siteName: "Rajan Sharma Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/MyPic.jpg",
        width: 1200,
        height: 630,
        alt: "Rajan Sharma — AI Engineer & Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajan Sharma — AI Engineer & Full Stack Developer",
    description:
      "Portfolio of Rajan Sharma — AI Engineer, Full-Stack Developer, and founder of StackLabs.",
    images: ["/images/MyPic.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Rajan Sharma",
      givenName: "Rajan",
      familyName: "Sharma",
      gender: "Male",
      jobTitle: "AI Engineer & Full Stack Developer",
      url: siteUrl,
      image: `${siteUrl}/images/MyPic.jpg`,
      sameAs: [
        "https://github.com/RAJAN2436",
        "https://www.linkedin.com/in/rajan-sharma-stack/",
        "https://rajan-portfolio-nu.vercel.app/",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bareilly",
        addressRegion: "Uttar Pradesh",
        addressCountry: "India",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Invertis University Bareilly",
      },
      worksFor: [
        {
          "@type": "Organization",
          name: "StackLabs",
        },
        {
          "@type": "Organization",
          name: "InvertisPrep",
        },
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Full Stack Web Development",
        "Next.js",
        "React",
        "TypeScript",
        "Python",
        "PyTorch",
        "Docker",
        "Node.js",
        "MERN Stack",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Rajan Sharma — AI Engineer & Full Stack Developer",
      description:
        "Portfolio of Rajan Sharma, AI Engineer and full stack developer building intelligent digital solutions.",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable} font-body bg-white text-black antialiased selection:bg-black selection:text-white`}
      >
        <SmoothScroll>
          <ScrollProgressBar />
          <CursorDot />
          <div className="relative z-10">{children}</div>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
