import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const aeonik = localFont({
  src: [
    {
      path: "../public/fonts/fonnts.com-Aeonik_Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/fonnts.com-Aeonik_Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/fonnts.com-Aeonik_Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/fonnts.com-Aeonik_Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-aeonik",
});

export const metadata: Metadata = {
  title: "Promage - Project Management",
  description: "Modern project management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${aeonik.variable} antialiased font-sans`}
        style={{ fontFamily: "var(--font-aeonik)" }}
      >
        {children}
      </body>
    </html>
  );
}
