'use client';

import React, { useMemo, useRef, useState } from 'react';
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
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const pointerActive = useRef(false);
  const pointerStartX = useRef<number | null>(null);
  const pointerDeltaX = useRef(0);
  const pointerLastX = useRef(0);
  const pointerLastT = useRef(0);
  const pointerVel = useRef(0);

  const viewRange = 2;
  const maxIndex = items.length - 1;

  const ordered = useMemo(() => items, [items]);

  const go = (dir: 1 | -1) => {
    setActive((prev) => {
      const next = prev + dir;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 my-10">
      <div
        className="relative w-full flex items-center justify-center"
        style={{ perspective: '1400px' }}
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
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 lg:px-10 z-20">
          <button
            type="button"
            className="pointer-events-auto w-12 h-12 border-[5px] border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-white transition duration-300 rounded-full flex items-center justify-center leading-none backdrop-blur-sm bg-black/40"
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
            className="pointer-events-auto w-12 h-12 border-[5px] border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-white transition duration-300 rounded-full flex items-center justify-center leading-none backdrop-blur-sm bg-black/40"
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

        <div
          className="relative w-full max-w-6xl h-[clamp(420px,55vw,800px)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {ordered.map((item, index) => {
            const delta = shortestDelta(index, active, items.length);
            const abs = Math.abs(delta);
            const isVisible = abs <= viewRange;
            const gap = 'clamp(70px, 12vw, 200px)';
            const translateX = `calc(${delta} * ${gap})`;
            const translateZ = 140 - abs * 80;
            const rotateY = delta * -12;
            const scale = 1 - abs * 0.08;
            const overlayOpacity = Math.min(abs * 0.4, 0.9);

            return (
              <div
                key={`${item.videoUrl}-${index}`}
                className="absolute left-1/2 top-1/2 w-[clamp(200px,26vw,380px)]"
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  pointerEvents: isVisible ? 'auto' : 'none',
                  transition: 'transform 300ms ease',
                }}
                onClick={() => setActive(index)}
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
                <div className="relative bg-black shadow-[0px_30px_60px_rgba(0,0,0,0.45)] overflow-visible">
                  <div
                    className="pointer-events-none absolute left-1/2 top-full h-36 w-[110%] -translate-x-1/2 blur-2xl z-0 rainbow-glow transition-opacity duration-300"
                    style={{
                      opacity: abs === 0 ? 1 : 0,
                      transform: 'translateX(-50%) rotateX(75deg) translateY(-50px)',
                      transformOrigin: 'top center',
                    }}
                  />
                  <div className="relative z-10">
                    <Video
                      videoUrl={item.videoUrl}
                      title={item.title}
                      description={item.description}
                      caseStudyUrl={item.caseStudyUrl}
                      className="w-full"
                      videoClassName=""
                    />
                  </div>
                  <div
                    className="absolute inset-0 pointer-events-none bg-black transition-opacity duration-450 z-20"
                    style={{ opacity: overlayOpacity }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
