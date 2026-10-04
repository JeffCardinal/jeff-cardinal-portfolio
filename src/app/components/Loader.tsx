"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createLoaderDissolve } from "./createLoaderDissolve";
import MetaballLoader from "./MetaballLoader";
import Marquee from "react-fast-marquee";

export default function Loader() {
    const { active, errors } = useProgress();
    const loading = active && errors.length === 0;
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const scrollLocked = mounted && (loading || visible);

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      if (!scrollLocked) return;

      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const preventScroll = (event: Event) => event.preventDefault();
      const preventScrollKey = (event: KeyboardEvent) => {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
          event.preventDefault();
        }
      };
      const restoreScroll = () => {
        if (window.scrollX !== scrollX || window.scrollY !== scrollY) {
          window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
        }
      };

      // Keep the body's positioning context and scrollbar width unchanged.
      window.addEventListener("wheel", preventScroll, { passive: false, capture: true });
      window.addEventListener("touchmove", preventScroll, { passive: false, capture: true });
      window.addEventListener("keydown", preventScrollKey, true);
      window.addEventListener("scroll", restoreScroll);

      return () => {
        window.removeEventListener("wheel", preventScroll, true);
        window.removeEventListener("touchmove", preventScroll, true);
        window.removeEventListener("keydown", preventScrollKey, true);
        window.removeEventListener("scroll", restoreScroll);
      };
    }, [scrollLocked]);

    useEffect(() => {
      if (!mounted) return;
      if (loading) {
        setVisible(true);
        if (overlayRef.current) {
          overlayRef.current.style.maskImage = "none";
          overlayRef.current.style.webkitMaskImage = "none";
          overlayRef.current.style.opacity = "1";
        }
        return;
      }
      if (!visible) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setVisible(false);
        return;
      }

      let shader: ReturnType<typeof createLoaderDissolve> | undefined;
      const isMobile = window.matchMedia("(pointer: coarse)").matches;
      const exitDuration = isMobile ? 500 : 1500;
      // Phones avoid the extra WebGL context and per-frame PNG readback.
      if (!isMobile) {
        try {
          shader = createLoaderDissolve(window.innerWidth, window.innerHeight);
          document.body.appendChild(shader.edgeCanvas);
        } catch {
          // Use a fade when an additional WebGL context is unavailable.
        }
      }
      const start = performance.now();
      let lastRender = -Infinity;
      let frame: number;
      const dissolve = (now: number) => {
        const progress = Math.min((now - start) / exitDuration, 1);
        const eased = progress * progress * (3 - 2 * progress);
        if (overlayRef.current && (now - lastRender >= 1000 / 30 || progress === 1)) {
          if (shader) {
            try {
              const mask = shader.render(eased);
              overlayRef.current.style.maskImage = mask;
              overlayRef.current.style.webkitMaskImage = mask;
            } catch {
              shader.dispose();
              shader = undefined;
              overlayRef.current.style.maskImage = "none";
              overlayRef.current.style.webkitMaskImage = "none";
            }
          }
          if (!shader) {
            overlayRef.current.style.opacity = String(1 - eased);
          }
          lastRender = now;
        }
        if (progress < 1) frame = requestAnimationFrame(dissolve);
        else setVisible(false);
      };
      frame = requestAnimationFrame(dissolve);
      return () => {
        cancelAnimationFrame(frame);
        shader?.dispose();
      };
    }, [loading, mounted, visible]);

    if (!mounted || (!loading && !visible)) return null;

    return createPortal(
        <div id="loader"
          ref={overlayRef}
          style={{
            height: "100dvh",
            width: "100dvw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0)",
            overflow: "hidden",
            touchAction: "none",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 999999,
            maskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            pointerEvents: loading ? "auto" : "none",
          }}
        >
          <div className="invisible md:visible lg:visible absolute bottom-1/2 w-full whitespace-nowrap">
            <Marquee
              direction="right"
              pauseOnHover={false}
              speed={200}
            >
              <span className="text-[400px] font-distancia text-rose-900 opacity-50 pt-[50px] inline-block">
                LOADING...
              </span>
            </Marquee>
          </div>

          <div className="invisible md:visible lg:visible absolute w-full whitespace-nowrap">
            <Marquee
              pauseOnHover={false}
              speed={300}
            >
              <span className="text-[400px] font-distancia text-rose-900 pt-[50px] opacity-75 inline-block">
                LOADING...
              </span>
            </Marquee>
          </div>

          <div className="invisible md:visible lg:visible absolute top-1/2 w-full whitespace-nowrap">
            <Marquee
              direction="right"
              pauseOnHover={false}
              speed={200}
            >
              <span className="text-[400px] font-distancia text-rose-900 opacity-50 pt-[50px] inline-block">
                LOADING...
              </span>
            </Marquee>
          </div>

          <div className="z-10 absolute inset-0 h-[100dvh] flex items-center justify-center">
            <div className="relative w-[500px] h-[500px] flex items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-full flex items-center pointer-events-none">
              <svg width="600" height="600" viewBox="0 0 400 400">
                <defs>
                  <path
                    id="circlePath"
                    d="
                      M 200, 50
                      a 150,150 0 1,1 0,300
                      a 150,150 0 1,1 0,-300
                    "
                  />
                </defs>
                <g>
                  <text fill="white" fontSize="23.5" fontWeight="bold">
                    <textPath href="#circlePath">
                      LOADING... LOADING... LOADING... LOADING... LOADING... LOADING... LOADING...
                    </textPath>
                  </text>
                  <animateTransform
                    attributeType="XML"
                    attributeName="transform"
                    type="rotate"
                    from="360 200 200"
                    to="0 200 200"
                    dur="20s"
                    repeatCount="indefinite"
                  />
                </g>
              </svg>
            </div>
            <MetaballLoader />
            </div>
          </div>
        </div>,
        document.body
    );
}
