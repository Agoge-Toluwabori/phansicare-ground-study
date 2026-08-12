import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://phansicare-ground-study.ace994.chatgpt.site";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
const socialImage = `${siteUrl}${basePath}/og.png`;

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "PhansiCare — Transform the Ground",
  description: "A concept for decorative coloured wood mulch and more considered landscapes in Nigeria.",
  openGraph: {
    title: "PhansiCare — Transform the Ground",
    description: "A decorative mulch concept for more considered landscapes in Nigeria.",
    type: "website",
    images: [{ url: socialImage, width: 1728, height: 920, alt: "PhansiCare — Transform the ground. Transform the space." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PhansiCare — Transform the Ground",
    description: "A decorative mulch concept for more considered landscapes in Nigeria.",
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
