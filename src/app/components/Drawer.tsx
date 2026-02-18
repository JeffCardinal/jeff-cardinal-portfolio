"use client";
import React, {
  ReactNode,
  useState,
  useEffect,
  useRef,
  useId,
  useLayoutEffect,
} from "react";

export default function Drawer({
children,
  title,
  bgColor,
  id,
  open: controlledOpen,
  setOpen: controlledSetOpen,
}: {
  children: ReactNode;
  title: string;
  bgColor: string;
  id?: string | undefined;
  open?: boolean;
  setOpen?: (v: boolean) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined && controlledSetOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = isControlled ? controlledSetOpen : setUncontrolledOpen;

  const [contentHeight, setContentHeight] = useState<number | "auto">(0);
  const [isResizingWindow, setIsResizingWindow] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const contentId = useId();
  const frameARef = useRef<number | null>(null);
  const frameBRef = useRef<number | null>(null);
  const resizeTimeoutRef = useRef<number | null>(null);
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) {
      return;
    }

    if (frameARef.current !== null) {
      cancelAnimationFrame(frameARef.current);
      frameARef.current = null;
    }
    if (frameBRef.current !== null) {
      cancelAnimationFrame(frameBRef.current);
      frameBRef.current = null;
    }

    if (open) {
      setContentHeight(content.scrollHeight);
      return;
    }

    const renderedHeight = Math.ceil(content.getBoundingClientRect().height);
    setContentHeight(renderedHeight);
    frameARef.current = requestAnimationFrame(() => {
      frameBRef.current = requestAnimationFrame(() => {
        setContentHeight(0);
        frameBRef.current = null;
      });
      frameARef.current = null;
    });
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      setIsResizingWindow(true);
      if (openRef.current) {
        setContentHeight("auto");
      }

      if (resizeTimeoutRef.current !== null) {
        window.clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = window.setTimeout(() => {
        setIsResizingWindow(false);
        resizeTimeoutRef.current = null;
      }, 150);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeTimeoutRef.current !== null) {
        window.clearTimeout(resizeTimeoutRef.current);
      }
      if (frameARef.current !== null) {
        cancelAnimationFrame(frameARef.current);
      }
      if (frameBRef.current !== null) {
        cancelAnimationFrame(frameBRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const content = contentRef.current;
    if (!content || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => {
      if (isResizingWindow) {
        return;
      }
      setContentHeight(content.scrollHeight);
    });

    observer.observe(content);
    return () => observer.disconnect();
  }, [open, isResizingWindow]);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const timeout = window.setTimeout(() => {
      const observableElements = document.querySelectorAll(
        ".observableLeft, .observableRight"
      );

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target.classList.contains("observableLeft")) {
              entry.target.classList.toggle(
                "animate-loadInFromLeft",
                entry.isIntersecting
              );
            }
            if (entry.target.classList.contains("observableRight")) {
              entry.target.classList.toggle(
                "animate-loadInFromRight",
                entry.isIntersecting
              );
            }
            if (entry.isIntersecting) {
              observer?.unobserve(entry.target);
              entry.target.classList.remove("opacity-0");
              entry.target.classList.remove("observableLeft");
              entry.target.classList.remove("observableRight");
            }
          });
        },
        { threshold: 0.75 }
      );

      observableElements.forEach((element) => {
        observer?.observe(element);
      });
    }, 250);

    return () => {
      window.clearTimeout(timeout);
      observer?.disconnect();
    };
  }, [open]);

  return (
    <>
      <div
        id={`${id}`}
        onClick={() => {
          setOpen(!open);
        }}
        className={`${bgColor} h-12 pl-16 flex items-center transition-all duration-[300ms] ease-in-out justify-center text-black border-b-1 border-black select-none
          ${open ? "py-8" : "py-16"}
        `}
        aria-expanded={open}
        aria-controls={contentId}
        role="button"
      >
        <span className="w-full block text-4xl text-center text-black font-distancia pt-2">
          {title}
        </span>
        <button
          className="font-mono text-4xl font-bold text-black mr-8"
          aria-label={open ? "Collapse section" : "Expand section"}
        >
          {open ? <span>-</span> : <span>+</span>}
        </button>
      </div>

      <div
        className="overflow-hidden transition-[height] ease-[cubic-bezier(0.22,1,0.36,1)]"
        id={contentId}
        style={{
          height: contentHeight === "auto" ? "auto" : `${contentHeight}px`,
          transitionDuration: isResizingWindow ? "0ms" : "600ms",
        }}
        onTransitionEnd={(event) => {
          if (event.target !== event.currentTarget || event.propertyName !== "height") {
            return;
          }
          if (open) {
            setContentHeight("auto");
          } else {
            setContentHeight(0);
          }
        }}
      >
        <div ref={contentRef} className="overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
}
