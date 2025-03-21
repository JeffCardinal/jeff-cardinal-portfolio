'use client';
import React, { ReactNode, useState, useEffect, useRef } from 'react';

export default function Breaker({
  children,
  title,
  bgColor,
}: {
  children: ReactNode;
  title: string;
  bgColor: string;
}) {
  const [open, setOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }

    setTimeout(() => {
      const observableElements = document.querySelectorAll('.observableLeft, .observableRight');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target.classList.contains('observableLeft')) {
            entry.target.classList.toggle('animate-loadInFromLeft', entry.isIntersecting);
          }
          if (entry.target.classList.contains('observableRight')) {
            entry.target.classList.toggle('animate-loadInFromRight', entry.isIntersecting);
          }
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            entry.target.classList.remove('opacity-0');
            entry.target.classList.remove('observableLeft');
            entry.target.classList.remove('observableRight');
          }
        });
      }, { threshold: 0.75 });

      observableElements.forEach((element) => {
        observer.observe(element);
      });
    }, 250);
  }, [open]);

  return (
    <>
      <div
        onClick={() => { setOpen(!open); }}
        className={`${bgColor} h-12 pl-16 flex items-center transition-all duration-[500ms] ease-in-out justify-center text-white border-b-1 border-black select-none
          ${open ? 'py-8' : 'py-16'}
        `}
        aria-expanded={open}
        aria-controls="accordion-content"
        role="button"
      >
        <span className="w-full block text-4xl text-center text-black font-distancia pt-2">{title}</span>
        <button 
          className="font-mono text-4xl font-bold text-black mr-8"
          aria-label={open ? 'Collapse section' : 'Expand section'}
        >
          { open ? <span>-</span> : <span>+</span> }
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-1000 ease-in-out
          ${open ? `max-h-[${contentHeight}px]` : 'max-h-0'}
        `}
        id="accordion-content"
        ref={contentRef}
      >
        {open && (
          <div className="overflow-hidden">
            {children}
          </div>
        )}
      </div>
    </>
  );
}
