import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Link from "next/link";
import MobileNav from "./components/MobileNav";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jeff Cardinal Portfolio",
  description: "Jeff Cardinal's art and code portfolio website, coded in Next.js, Tailwind, and 3JS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={inter.className}>
        <MobileNav>{children}</MobileNav>
        <Header>
          <Link href="/">     
            <button className="pt-[2px] pr-4 pl-4 mr-4 outline outline-white hover:outline-black mix-blend-lighten hover:bg-white text-white hover:text-black rounded-full transition duration-300 font-distancia text-md">
              Home
            </button>
          </Link>
          <Link href="/about">
          <button className="pt-[2px] pr-4 pl-4 mr-4 outline outline-white hover:outline-black mix-blend-lighten text-opacity-100 hover:bg-white text-white hover:text-black rounded-full transition duration-300 font-distancia text-md">
            About
          </button>
          </Link>
          <Link href="/JeffCardinalResume2024PDF.pdf">
            <button className="pt-[2px] pr-4 pl-4 mr-0 outline outline-white hover:outline-black mix-blend-lighten hover:bg-white text-white hover:text-black rounded-full transition duration-300 font-distancia text-md">
              Resume
            </button>
          </Link>
        </Header>
        {children}
      </body>
    </html>
  );
}
