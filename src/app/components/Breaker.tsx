'use client'
import React, { ReactNode, useState } from 'react';

export default function Breaker({ children, title, bgColor }: { children: ReactNode, title:string, bgColor:string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpen(!open)} 
        className={`${bgColor} h-12 pl-16 flex items-center transition-all duration-[500ms] ease-in-out justify-center text-white border-b-1 border-black select-none
          ${open ? 'py-8' : 'py-16'}
        `}>
        <span className="w-full block text-4xl text-center text-black font-distancia pt-2"> { title } </span>

        <button className="font-mono text-4xl font-bold text-black mr-8">
          { open ? <span>-</span> : <span>+</span> }
        </button>
      </div>

      <div 
        className={`grid transition-all duration-[1000ms] ease-in-out
          ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
        `}
      >
        <div className='overflow-hidden'>{ children }</div>
      </div>
    </>
  );
};
