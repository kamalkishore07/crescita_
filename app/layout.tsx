import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SmoothScroll } from "../components/ui/SmoothScroll";
import localFont from 'next/font/local';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cabinetGrotesk = localFont({
  src: '../public/Cabinet Grotesk/CabinetGrotesk-Variable.woff2',
  display: 'swap',
  variable: '--font-cabinet-grotesk',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: "Crescita – 24 Hours College Hackathon",
  description: "Where Ideas Grow Into Impact. Join the ultimate college hackathon experience.",
  openGraph: {
    title: "Crescita – 24 Hours College Hackathon",
    description: "Where Ideas Grow Into Impact",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cabinetGrotesk.variable} antialiased`}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
