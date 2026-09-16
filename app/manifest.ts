import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rajan Sharma — AI Engineer & Full Stack Developer",
    short_name: "Rajan Sharma",
    description:
      "Portfolio of Rajan Sharma, AI Engineer and full stack developer building intelligent, real-world digital solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/images/MyPic.jpg",
        sizes: "192x192 512x512",
        type: "image/jpeg",
      },
    ],
  };
}
