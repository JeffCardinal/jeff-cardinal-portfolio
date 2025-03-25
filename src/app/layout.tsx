import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import Head from "next/head";
import Button from "./components/Button";
import { VercelAnalytics } from "./lib/analytics";
import { VercelSpeedInsights } from "./lib/speed-insights";
import Image from 'next/image'
import sparkle from './svg/sparkle.svg';

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
        <div className="overflow-hidden flex justify-end p-4 absolute inset-x-0 top-0 z-10">
          <svg id="a" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 184.424 184.451">
            <path d="M182.92,94.058c-63.534,12.536-76.342,25.345-88.875,88.889-.396,2.006-3.269,2.006-3.665,0-12.534-63.543-25.342-76.353-88.875-88.889-2.006-.396-2.006-3.269,0-3.664,63.534-12.536,76.342-25.345,88.875-88.889.396-2.006,3.269-2.006,3.665,0,12.534,63.543,25.342,76.353,88.875,88.889,2.006.396,2.006,3.269,0,3.664Z" fill="white"/>
          </svg>
        </div>
        <div className="overflow-hidden flex justify-center py-6 text-2xl absolute inset-x-0 top-0 z-10">
          <Image
            className="-m-[5px]"
            src={`/images/jc-tribal-logo-flat.png`}
            alt=""
            width={120}
            height={0}
            sizes="100vw"
            // style={{ width: '100%', height: 'auto' }}
            objectFit='contain'
          />
        </div>
        {/* <Header>
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
            link="/resume.pdf"
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
        </Header> */}
        <VercelAnalytics/>
        <VercelSpeedInsights/>
        {children}
      </body>
    </html>
  );
}
