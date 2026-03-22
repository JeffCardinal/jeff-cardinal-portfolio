'use client'
import React, { useEffect, useState } from 'react';
import { useIsMobileDevice } from '../hooks/useIsMobileDevice';

export default function ScrollToTopButton() {
  const [hover, setHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobileDevice();

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setHover(false);
    }
  }, [isVisible]);

  const scrollToTop = () => {
    if (isVisible) {
      if (isMobile) {
        setHover(true);
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (!isMobile || !hover) {
      return;
    }

    if (window.scrollY <= 0) {
      setHover(false);
    }
  }, [hover, isMobile, isVisible]);

  return (
    <button
      onMouseEnter={() => {
        if (!isMobile) {
          setHover(true);
        }
      }}
      onMouseLeave={() => {
        if (!isMobile) {
          setHover(false);
        }
      }}
      onClick={scrollToTop}
      className={`
        fixed bottom-4 right-4 p-4 rounded-full shadow-lg
        transition-all duration-300 ease-in-out 
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none cursor-default"}
        ${hover ? "bg-rose-500 border-white" : "bg-white border-black"}
        border-[5px]`}
      style={{ zIndex: 1000 }}
    >
      <svg
          className="rotate-90"
          id="a" 
          data-name="Nav Arrow Prev" 
          xmlns="http://www.w3.org/2000/svg" 
          width="25" 
          height="25" 
          viewBox="0 0 100 100">
          <polygon 
            points="80 0 50 0 0 50 50 100 80 100 30 50 80 0" 
            fill={hover ? "white" : "black"}
            className="transition-colors duration-300 ease-in-out"
          />
      </svg>
    </button>
  );
};
