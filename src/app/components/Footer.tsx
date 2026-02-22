"use client";
import React, {
  useRef,
  useLayoutEffect,
  useState,
  Suspense,
  useEffect,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { motion, useInView, useAnimationControls } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import JCLogo3D from "./3d/JCLogo3D";

type Props = { bgColor?: string; color?: string };

export default function Footer({
  bgColor = "bg-black",
  color = "black",
}: Props) {
  const footerNavButtonClass =
    `text-${color} pt-1 flex justify-center px-4 my-2 border-[6px] border-${color} rounded-full text-2xl transition-all duration-300 ease-in-out font-distancia text-md hover:border-rose-500 hover:text-rose-500`;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const socialRef = useRef<HTMLDivElement | null>(null);

  const inView = useInView(rootRef, { once: true, amount: 0.8 });
  const [logoReady, setLogoReady] = useState(false);
  const [setupDone, setSetupDone] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [playIntro, setPlayIntro] = useState(false);

  const canvasCtrl = useAnimationControls();
  const navCtrl = useAnimationControls();
  const socialCtrl = useAnimationControls();

  useEffect(() => {
    if (inView && logoReady && setupDone && !playIntro) setPlayIntro(true);
  }, [inView, logoReady, setupDone, playIntro]);

  useLayoutEffect(() => {
    if (!inView || !logoReady || setupDone) return;

    const NUDGE = 48;
    const isLg = window.matchMedia("(min-width: 1024px)").matches;
    const axis: "x" | "y" = isLg ? "x" : "y";

    const anchorRect = isLg
      ? ({
          left: 0,
          width: window.innerWidth,
          top: 0,
          height: window.innerHeight,
        } as DOMRect)
      : (rootRef.current?.getBoundingClientRect() ??
        ({ left: 0, width: 0, top: 0, height: window.innerHeight } as DOMRect));

    const anchorCenter = isLg
      ? anchorRect.left + (anchorRect as any).width / 2
      : anchorRect.top + (anchorRect as any).height / 2;

    const centerOffset = (el: HTMLElement | null) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      const elCenter = isLg ? r.left + r.width / 2 : r.top + r.height / 2;
      return anchorCenter - elCenter;
    };

    const offCanvas = centerOffset(canvasRef.current);
    const offNav = centerOffset(navRef.current);
    const offSocial = centerOffset(socialRef.current);

    requestAnimationFrame(() => {
      canvasCtrl.set({ [axis]: offCanvas, opacity: 1 } as any);
      navCtrl.set({ [axis]: offNav - NUDGE, opacity: 0 } as any);
      socialCtrl.set({ [axis]: offSocial - NUDGE, opacity: 0 } as any);
      setSetupDone(true);
    });
  }, [inView, logoReady, setupDone, canvasCtrl, navCtrl, socialCtrl]);

  useLayoutEffect(() => {
    if (!setupDone || !introDone) return;

    const DURATION = 1;
    const EASE = [0.22, 1, 0.36, 1] as const;
    const isLg = window.matchMedia("(min-width: 1024px)").matches;
    const axis: "x" | "y" = isLg ? "x" : "y";

    canvasCtrl.start({
      [axis]: 0,
      transition: { duration: DURATION, ease: EASE },
    } as any);
    const fadeMove = { duration: DURATION, ease: EASE };
    navCtrl.start({ [axis]: 0, opacity: 1, transition: fadeMove } as any);
    socialCtrl.start({ [axis]: 0, opacity: 1, transition: fadeMove } as any);
  }, [setupDone, introDone, canvasCtrl, navCtrl, socialCtrl]);

  return (
    <div
      ref={rootRef}
      className={`lg:grid lg:grid-cols-3 items-center ${bgColor}`}
    >
      {/* 3D */}
      <div className="flex justify-center lg:justify-start w-full z-10">
        <motion.div
          ref={canvasRef}
          animate={canvasCtrl}
          style={{ width: 400, height: 400, opacity: 0 }}
        >
          <Canvas>
            <Suspense fallback={null}>
              <JCLogo3D
                playIntro={playIntro}
                onReady={() => setLogoReady(true)}
                onIntroComplete={() => setIntroDone(true)}
              />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>

      {/* Navi */}
      <motion.div
        ref={navRef}
        className="flex lg:pt-8 min-w-[300px] justify-center text-center"
        animate={navCtrl}
        style={{ opacity: 0 }}
      >
        <div className={`text-2xl text-${color} z-0 flex-col`}>
          <div className="font-distancia text-4xl">Navi</div>
          <Link className={footerNavButtonClass} href="/">
            HOME
          </Link>
          <Link className={footerNavButtonClass} href="/about">
            ABOUT
          </Link>
          <Link className={footerNavButtonClass} href="/resume.pdf">
            RESUME
          </Link>
        </div>
      </motion.div>

      {/* Social */}
      <motion.div
        ref={socialRef}
        className="flex p-8 min-w-[300px] items-center text-center justify-center lg:justify-end lg:text-right lg:items-end"
        animate={socialCtrl}
        style={{ opacity: 0 }}
      >
        <div className={`text-2xl text-${color} z-0`}>
          <div className="font-distancia text-4xl mb-2">Social</div>
          <div className="flex justify-center items-center gap-6">
            <Link href="https://www.instagram.com/vaperror">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  width={64}
                  height={64}
                  src="/images/glyphs/Instagram_Glyph_Gradient.png"
                  alt="Instagram"
                />
              </div>
            </Link>
            <Link href="https://www.x.com/vaperror">
              <div className="w-16 h-16 flex items-center justify-center">
                <FontAwesomeIcon icon={faXTwitter} className="text-[64px]" />
              </div>
            </Link>
            <Link href="https://www.linkedin.com/in/jeffjcardinal">
              <div className="w-16 h-16 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  color="#2d64bc"
                  fillOpacity="white"
                  className="text-[64px]"
                />
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
