import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LocaleProvider } from "@/lib/locale-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arikmhm.vercel.app"),
  title: "Muhammad Ariyanto — Software Engineer",
  description:
    "Portfolio of Muhammad Ariyanto, a Software Engineer specializing in modern web applications. Built with Next.js and TypeScript.",
  keywords: [
    "Muhammad Ariyanto",
    "arikmhm",
    "Software Engineer",
    "Web Developer",
    "Portfolio",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Muhammad Ariyanto" }],
  openGraph: {
    title: "Muhammad Ariyanto — Software Engineer",
    description:
      "Portfolio of Muhammad Ariyanto, a Software Engineer specializing in modern web applications.",
    type: "website",
    locale: "en_US",
    alternateLocale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ariyanto — Software Engineer",
    description:
      "Portfolio of Muhammad Ariyanto, a Software Engineer specializing in modern web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
