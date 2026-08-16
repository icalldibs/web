import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-poppins",
});

const neueMontreal = localFont({
  src: "../public/fonts/NeueMontreal-Medium.otf",
  weight: "500",
  style: "normal",
  variable: "--font-neue-montreal",
});

export const metadata: Metadata = {
  title: "Dibs: AI to buy/sell anything",
  description: "Your personal AI for everyday life, available right in iMessage.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${neueMontreal.variable}`}>{children}</body>
    </html>
  );
}