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
    // window.scrollTo({ top: 0});
    // document.documentElement.scrollTop = 0;
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
    <div className="">
      <button onClick={handleClick} className="z-50 fixed top m-5 p-2 outline outline-[5px] text-white border-white rounded-full text-md">
        <svg className={isOpen ? 'rotate-0 transition duration-500' : '-rotate-180 transition duration-500'} id="a" data-name="Nav Arrow" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 100 100">
          <polygon points="80 0 50 0 0 50 50 100 80 100 30 50 80 0" fill="#FFFFFF"/>
        </svg>
      </button>
      <div className={`
          ${isOpen ? 'touch-none pointer-events-auto' : 'pointer-events-none'}
          z-20 md:invisible lg:invisible flex flex-col h-[calc(100dvh)]
          text-white text-center items-center justify-center text-2xl fixed inset-x-0 top-0
      `}>
        <Link href="/"
          onClick={handleClick}
          className={`
            ${vis_1 ? 'visible' : 'invisible'}
            ${inEffect  && isAnimating && "animate-easeInNav"}
            ${outEffect && isAnimating && "animate-easeOutNav"}
            fill-mode-forwards
            transition duration-500 ease-in-out
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
        <Link href="/resume.pdf"
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
