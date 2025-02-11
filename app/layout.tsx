import type { Metadata } from "next";
import { Orbitron, Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-primary",
  subsets: ["latin", "cyrillic", "greek"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const orbitron = Orbitron({
  variable: "--font-secondary",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Better Boxing Interval Timer",
  description: "A simple online boxing interval timer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${orbitron.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
