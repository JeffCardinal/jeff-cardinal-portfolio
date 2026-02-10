import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileNav from "./components/MobileNav";
import Head from "next/head";
import { Analytics } from '@vercel/analytics/next';
import Image from 'next/image'
import SparkleSvg from "./svg/SparkleSvg";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

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
          <SparkleSvg color={"white"} dim={"50px"}/>
        </div>
        <div className="overflow-hidden flex justify-center py-6 text-2xl absolute inset-x-0 top-0 z-10">
          <Image
            className="-m-[5px]"
            src={`/images/jc-tribal-logo-flat.png`}
            alt=""
            width={120}
            height={0}
            objectFit='contain'
          />
        </div>
        <Analytics/>
        <SpeedInsights />
        <Script src="https://t.contentsquare.net/uxa/aa7d7e650962e.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}
