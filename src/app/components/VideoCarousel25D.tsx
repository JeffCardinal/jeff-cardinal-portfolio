'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import SparkleSvg from '../svg/SparkleSvg';
import Video from './Video';

type VideoItem = {
  videoUrl: string;
  title: string;
  description: string;
  caseStudyUrl: string;
};

type Props = {
  items: VideoItem[];
};

function shortestDelta(index: number, active: number, total: number) {
  const raw = index - active;
  const wrapped = ((raw % total) + total) % total;
  const alt = wrapped > total / 2 ? wrapped - total : wrapped;
  return alt;
}

export default function VideoCarousel25D({ items }: Props) {
  const [active, setActive] = useState(0);
  const [tutorialVisible, setTutorialVisible] = useState(false);
  const [tutorialFading, setTutorialFading] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const pointerActive = useRef(false);
  const pointerStartX = useRef<number | null>(null);
  const pointerDeltaX = useRef(0);
  const pointerLastX = useRef(0);
  const pointerLastT = useRef(0);
  const pointerVel = useRef(0);

  const viewRange = 3;
  const maxIndex = items.length - 1;

  const ordered = useMemo(() => items, [items]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setTutorialVisible(true);
  }, []);

  const go = (dir: 1 | -1) => {
    setActive((prev) => {
      const next = prev + dir;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div
        className="relative w-full flex items-center justify-center isolate"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') go(-1);
          if (event.key === 'ArrowRight') go(1);
        }}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
          touchDeltaX.current = 0;
        }}
        onTouchMove={(event) => {
          if (touchStartX.current === null) return;
          const currentX = event.touches[0]?.clientX ?? touchStartX.current;
          touchDeltaX.current = currentX - touchStartX.current;
        }}
        onTouchEnd={() => {
          const threshold = 40;
          if (touchDeltaX.current > threshold) go(-1);
          if (touchDeltaX.current < -threshold) go(1);
          touchStartX.current = null;
          touchDeltaX.current = 0;
        }}
        onPointerDown={(event) => {
          if (event.pointerType === 'touch') return;
          const target = event.target as HTMLElement | null;
          if (target?.closest('button')) return;
          pointerActive.current = true;
          pointerStartX.current = event.clientX;
          pointerDeltaX.current = 0;
          pointerLastX.current = event.clientX;
          pointerLastT.current = performance.now();
          pointerVel.current = 0;
        }}
        onPointerMove={(event) => {
          if (!pointerActive.current || pointerStartX.current === null) return;
          const now = performance.now();
          const dx = event.clientX - pointerLastX.current;
          const dt = Math.max(1, now - pointerLastT.current);
          pointerVel.current = dx / dt;
          pointerLastX.current = event.clientX;
          pointerLastT.current = now;
          pointerDeltaX.current = event.clientX - pointerStartX.current;
        }}
        onPointerUp={(event) => {
          if (event.pointerType === 'touch') return;
          const threshold = 40;
          const momentum = pointerVel.current * 120;
          const total = pointerDeltaX.current + momentum;
          if (total > threshold) go(-1);
          if (total < -threshold) go(1);
          pointerActive.current = false;
          pointerStartX.current = null;
          pointerDeltaX.current = 0;
          pointerVel.current = 0;
        }}
        onPointerCancel={(event) => {
          if (event.pointerType === 'touch') return;
          pointerActive.current = false;
          pointerStartX.current = null;
          pointerDeltaX.current = 0;
          pointerVel.current = 0;
        }}
        aria-label="Video carousel"
      >
        <div className="pointer-events-none absolute inset-0 items-center justify-between px-4 lg:px-10 z-30 select-none hidden sm:flex">
          <button
            type="button"
            className="pointer-events-auto w-12 h-12 border-[5px] border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-white transition duration-300 rounded-full flex items-center justify-center leading-none backdrop-blur-sm bg-black/20 select-none"
            onClick={() => go(-1)}
            aria-label="Previous video"
          >
            <span className="fill-current">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <polygon points="80 0 50 0 0 50 50 100 80 100 30 50 80 0" />
              </svg>
            </span>
          </button>
          <button
            type="button"
            className="pointer-events-auto w-12 h-12 border-[5px] border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-white transition duration-300 rounded-full flex items-center justify-center leading-none backdrop-blur-sm bg-black/20 select-none"
            onClick={() => go(1)}
            aria-label="Next video"
          >
            <span className="rotate-180 fill-current">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <polygon points="80 0 50 0 0 50 50 100 80 100 30 50 80 0" />
              </svg>
            </span>
          </button>
        </div>

        {tutorialVisible && (
          <div
            className={`absolute inset-y-0 inset-x-0 z-20 flex items-center justify-center bg-black/70 sm:hidden transition-opacity duration-300 backdrop-blur-sm ${
              tutorialFading ? "opacity-0" : "opacity-100"
            }`}
            onPointerDown={() => {
              setTutorialFading(true);
              window.setTimeout(() => setTutorialVisible(false), 200);
            }}
            onTouchStart={() => {
              setTutorialFading(true);
              window.setTimeout(() => setTutorialVisible(false), 200);
            }}
          >
            <div className="flex flex-col items-center select-none gap-4">
              <div className="relative w-[64px] h-[64px] flip-hand">
                <Image
                  src="/bliss/glove-hand.png"
                  alt="Swipe Icon"
                  className="absolute swipe-hand select-none pointer-events-none"
                  width={64}
                  height={128}
                />
              </div>
              <div className="font-distancia text-white text-md tracking-wide text-center px-4">
                Swipe or tap to scroll through videos!
              </div>
            </div>
          </div>
        )}

        <div
          className="relative w-full max-w-6xl h-[clamp(420px,55vw,800px)] my-10"
          style={{ perspective: '1400px', transformStyle: "preserve-3d" }}
        >
          <div
            className="relative w-full h-full"
            style={{ transformStyle: 'preserve-3d' }}
          >
          {ordered.map((item, index) => {
            const delta = shortestDelta(index, active, items.length);
            const abs = Math.abs(delta);
            const isVisible = abs <= viewRange;
            const gap = 'clamp(60px, 12vw, 200px)';
            const translateX = `calc(${delta} * ${gap})`;
            const translateZ = 140 - abs * 120;
            const rotateY = delta * - 20;
            const scale = 1 - abs * 0.08;
            const overlayOpacity = Math.min(abs * 0.3, 0.9);

            return (
              // Video Slide
              <div
                key={`${item.videoUrl}-${index}`}
                className="absolute left-1/2 top-1/2 w-[clamp(220px,26vw,380px)] select-none group"
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  transformStyle: "preserve-3d",
                  pointerEvents: isVisible ? 'auto' : 'none',
                  zIndex: 100 - abs,
                  transition: 'transform 300ms ease',
                }}
                onClick={() => {
                  if (abs !== 0) setActive(index);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActive(index);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Select ${item.title}`}
              >
                {/* Title Scroller - Top */}
                <div
                  className="pointer-events-none absolute left-1/2 -top-[18px] -translate-x-1/2 w-[clamp(220px,26vw,380px)] z-40 hidden sm:block transition-opacity duration-600"
                  style={{ opacity: abs === 0 ? 1 : 0 }}
                >
                  <div
                    className="overflow-hidden"
                    style={{
                      maskImage:
                        "linear-gradient(90deg, transparent, rgba(0,0,0,1) 32px, rgba(0,0,0,1) calc(100% - 32px), transparent)",
                      WebkitMaskImage:
                        "linear-gradient(90deg, transparent, rgba(0,0,0,1) 32px, rgba(0,0,0,1) calc(100% - 32px), transparent)",
                    }}
                  >
                  {/* Rainbow Glow */}
                  <div
                    className="pointer-events-none absolute left-1/2 -top-2 h-64 w-[80%] blur-2xl z-0 rainbow-glow transition-opacity duration-300 select-none"
                    style={{
                      opacity: abs === 0 ? 1 : 0,
                      transform: 'translateX(-50%) rotateX(75deg) translateY(-20px)',
                      transformOrigin: 'top center',
                    }}
                  />
                  {/* Marquee */}
                  <Marquee
                    gradient={false}
                    speed={64}
                    pauseOnHover={false}
                    className="text-white text-xs font-distancia"
                  >
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="inline-flex items-center gap-2 pr-2">
                        <div className="pt-[2px]">{item.title}</div>
                        <div className="pb-[2px]"><SparkleSvg color="white" dim="12px"/></div>
                      </span>
                    ))}
                  </Marquee>
                </div>
              </div>

              {/* Title Scroller - Bottom */}
                <div
                  className="pointer-events-none absolute left-1/2 -bottom-[18px] -translate-x-1/2 w-[clamp(220px,26vw,380px)] z-40 hidden sm:block transition-opacity duration-600"
                  style={{ opacity: abs === 0 ? 1 : 0 }}
                >
                  <div
                    className="overflow-hidden"
                    style={{
                      maskImage:
                        "linear-gradient(90deg, transparent, rgba(0,0,0,1) 32px, rgba(0,0,0,1) calc(100% - 32px), transparent)",
                      WebkitMaskImage:
                        "linear-gradient(90deg, transparent, rgba(0,0,0,1) 32px, rgba(0,0,0,1) calc(100% - 32px), transparent)",
                    }}
                  >
                  {/* Rainbow Glow */}
                  <div
                    className="pointer-events-none absolute left-1/2 -top-2 h-64 w-[80%] blur-2xl z-0 rainbow-glow transition-opacity duration-300 select-none"
                    style={{
                      opacity: abs === 0 ? 1 : 0,
                      transform: 'translateX(-50%) rotateX(75deg) translateY(-20px)',
                      transformOrigin: 'top center',
                    }}
                  />
                  {/* Marquee */}
                  <Marquee
                    gradient={false}
                    speed={64}
                    pauseOnHover={false}
                    className="text-white text-xs font-distancia"
                  >
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="inline-flex items-center gap-2 pr-2">
                        <div className="pt-[2px]">{item.title}</div>
                        <div className="pb-[2px]"><SparkleSvg color="white" dim="12px"/></div>
                      </span>
                    ))}
                  </Marquee>
                </div>
              </div>

                <div className="relative bg-black shadow-[0px_30px_60px_rgba(0,0,0,0.45)] overflow-visible h-fit">
                  {/* Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none bg-black transition-opacity duration-450 z-20"
                    style={{ opacity: overlayOpacity }}
                  />
                  {/* Source Video */}
                  <div className="relative z-10 pointer-events-auto" onClick={() => setActive(index)}>
                    <Video
                      videoUrl={item.videoUrl}
                      title={item.title}
                      description={item.description}
                      caseStudyUrl={item.caseStudyUrl}
                      caseStudyVisible={abs === 0}
                      className="w-full"
                      videoClassName=""
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}
