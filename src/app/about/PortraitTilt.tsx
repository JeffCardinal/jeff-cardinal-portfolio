'use client';

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function PortraitTilt() {
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

    rotateX.set(-offsetY * 24);
    rotateY.set(offsetX * 24);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      className="relative place-content-center w-[min(80vw,300px)] sm:w-[300px] lg:w-[500px] max-w-full shrink-0 aspect-[3/4] mx-0 sm:mx-8 mt-8"
      style={{ perspective: "750px" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={{ rotateX, rotateY, transformOrigin: "center center" }}
      >
        <Image
          className="object-contain"
          src="/images/pfp/pfp-bg.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 500px, 300px"
        />
        <Image
          className="z-10 object-contain [transform:translateZ(50px)]"
          src="/images/pfp/pfp-me.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 500px, 300px"
        />
      </motion.div>
    </div>
  );
}