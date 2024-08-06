'use client'

import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
 
export default function MobileNav({ children }: { children: ReactNode }) {

  const [isOpen, setIsOpen] = useState(false);

  const [inEffect, setInEffect] = useState(false);
  const [outEffect, setOutEffect] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [vis_1, setVis_1] = useState(false);
  const [vis_2, setVis_2] = useState(false);
  const [vis_3, setVis_3] = useState(false);

  const handleClick = () => {
    if (!inEffect && !outEffect && !isAnimating) {
      setInEffect(true);
    }
    
    if (!isAnimating) {
      setIsAnimating(true);
      setVis_1(true);
      setVis_2(true);
      setVis_3(true);
      setIsOpen(!isOpen);
    }
  };

  const toggleInOut = () => {
    setInEffect(!inEffect);
    setOutEffect(!outEffect);
    setIsAnimating(false);
  }

  return (
    <div className="lg:hidden md:hidden">
      <button onClick={handleClick} className="z-30 absolute m-4 px-2 outline text-white outline-white rounded-full text-md">
        {isOpen ? `>` : `<`}
      </button>
      <div className={`
          ${isOpen ? 'touch-none' : ''}
          z-20 md:invisible lg:invisible flex flex-col h-[calc(100dvh)]
          text-white text-center items-center justify-center text-2xl absolute inset-x-0 top-0
      `}>
        <Link href="/"
          onClick={handleClick}
          className={`
            ${vis_1 ? 'visible' : 'invisible'}
            ${inEffect  && isAnimating && "animate-easeInNav"}
            ${outEffect && isAnimating && "animate-easeOutNav"}
            fill-mode-forwards
            flex grow w-full bg-rose-500 p-4 items-center text-center justify-center`}
            onAnimationEnd = {() => {
              if(!isOpen && outEffect) setVis_1(!vis_1);
            }}
        >
          <div className="font-distancia text-4xl">
            Home
          </div>
        </Link>
        <Link href="/about"
          onClick={handleClick}
          className={`
            ${vis_2 ? 'visible' : 'invisible'}
            ${inEffect  && isAnimating && "animate-easeInNav_2"}
            ${outEffect && isAnimating && "animate-easeOutNav_2"}
            fill-mode-forwards
            flex grow w-full bg-rose-500 p-4 items-center text-center justify-center`}
            onAnimationEnd = {() => {
              if(!isOpen && outEffect) setVis_2(!vis_2);
            }}
        >
          <div className="font-distancia text-4xl">
            About
          </div>
        </Link>
        <Link href="/resume"
          className={`
            ${vis_3 ? 'visible' : 'invisible'}
            ${inEffect  && isAnimating && "animate-easeInNav_3"}
            ${outEffect && isAnimating && "animate-easeOutNav_3"}
            fill-mode-forwards
            flex grow w-full bg-rose-500 p-4 items-center text-center justify-center`}
            onAnimationEnd = {() => {
              if(!isOpen && outEffect) setVis_3(!vis_3);
              toggleInOut()
            }}
        >
          <div className="font-distancia text-4xl">
            Resume
          </div>
        </Link>
      </div>
    </div>
  );
};
