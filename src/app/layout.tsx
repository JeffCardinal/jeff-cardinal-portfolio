import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import Head from "next/head";
import Button from "./components/Button";
import { Analytics } from "@vercel/analytics/react"

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
          <Button
            text="Home"
            link="/"
            textColor="text-white"
            hoverTextColor="hover:text-black"
            bgColor=""
            hoverBgColor="hover:bg-white"
            outlineColor="outline-white"
            hoverOutlineColor="hover:outline-black"
            optional="mix-blend-lighten"
            hoverGlyph={undefined}
            hoverable={false}
          />
          <Button
            text="About"
            link="/about"
            textColor="text-white"
            hoverTextColor="hover:text-black"
            bgColor=""
            hoverBgColor="hover:bg-white"
            outlineColor="outline-white"
            hoverOutlineColor="hover:outline-black"
            optional="mix-blend-lighten" 
            hoverGlyph={undefined}
            hoverable={false}
          />
          <Button
            text="Resume"
            link="/JeffCardinalResume2024PDF.pdf"
            textColor="text-white"
            hoverTextColor="hover:text-black"
            bgColor=""
            hoverBgColor="hover:bg-white"
            outlineColor="outline-white"
            hoverOutlineColor="hover:outline-black"
            optional="mix-blend-lighten"
            hoverGlyph={undefined}
            hoverable={false}
          />
        </Header>
        <Analytics/>
        {children}
      </body>
    </html>
  );
}
