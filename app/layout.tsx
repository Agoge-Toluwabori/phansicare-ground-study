import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "PhansiCare — Transform the Ground",
    description: "A concept for decorative coloured wood mulch and more considered landscapes in Nigeria.",
    openGraph: {
      title: "PhansiCare — Transform the Ground",
      description: "A decorative mulch concept for more considered landscapes in Nigeria.",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1728, height: 920, alt: "PhansiCare — Transform the ground. Transform the space." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "PhansiCare — Transform the Ground",
      description: "A decorative mulch concept for more considered landscapes in Nigeria.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
