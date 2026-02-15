'use client';

import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';

type Circle = {
  id: string;
  x: number;
  y: number;
  r: number;
};

const circleContains = (a: Circle, b: Circle): boolean => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distance = Math.hypot(dx, dy);
  return distance + b.r <= a.r;
};

const radiiTooSimilar = (a: number, b: number): boolean => {
  return Math.abs(a - b) / Math.max(a, b) < 0.2;
};

const hashSeed = (input: string): number => {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const mulberry32 = (seed: number) => {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let n = Math.imul(t ^ (t >>> 15), t | 1);
    n ^= n + Math.imul(n ^ (n >>> 7), n | 61);
    return ((n ^ (n >>> 14)) >>> 0) / 4294967296;
  };
};

const makeGradientStops = (seedKey: string) => {
  const rand = mulberry32(hashSeed(seedKey));
  const firstHue = Math.floor(rand() * 360);
  const delta = Math.floor(rand() * 181) - 90;
  const secondHue = (firstHue + delta + 360) % 360;
  return [
    { offset: '0%', color: `hsl(${firstHue} 100% 50%)` },
    { offset: '100%', color: `hsl(${secondHue} 100% 50%)` },
  ];
};

const withAlpha = (hsl: string, alpha: number) => hsl.replace(')', ` / ${alpha})`);

const makeProcessPanelStyle = (primary: string, secondary: string): CSSProperties => ({
  borderColor: withAlpha(primary, 0.9),
  backgroundColor: withAlpha(primary, 0.08),
  boxShadow: `
    inset 0 -8px 8px rgba(0,0,0,1),
    inset 0 -16px 32px ${withAlpha(secondary, 0.35)},
    inset 0 -8px 8px ${withAlpha(primary, 0.95)},
    inset 0 -1px 2px rgba(0,0,0,1),
    inset 0 4px 16px ${withAlpha(secondary, 0.35)},
    inset 0 2px 2px ${withAlpha(primary, 0.75)}
  `,
});

function BlobAvatar({
  size,
  circles,
  gradientStops,
  blur,
  alpha,
  idPrefix,
  label,
}: {
  size: number;
  circles: Circle[];
  gradientStops: { offset: string; color: string }[];
  blur: number;
  alpha: number;
  idPrefix: string;
  label: string;
}) {
  const gooId = `${idPrefix}-goo`;
  const gradientId = `${idPrefix}-gradient`;
  const maskId = `${idPrefix}-mask`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label}>
      <defs>
        <filter id={gooId} colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values={`1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 ${alpha} ${-alpha * 0.5}`}
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" mode="normal" />
        </filter>
        <linearGradient id={gradientId} x1="50%" y1="0%" x2="50%" y2="100%">
          {gradientStops.map((stop) => (
            <stop key={`${idPrefix}-${stop.offset}`} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
        <mask id={maskId}>
          <rect width={size} height={size} fill="black" />
          <g filter={`url(#${gooId})`}>
            {circles.map(({ x, y, r, id }) => (
              <circle key={`${idPrefix}-${id}`} cx={x} cy={y} r={r} fill="white" />
            ))}
          </g>
        </mask>
      </defs>

      <rect width={size} height={size} fill={`url(#${gradientId})`} mask={`url(#${maskId})`} />
    </svg>
  );
}

export default function GitHubAvatarGeneratorPage() {
  const [seed, setSeed] = useState('octocat');
  const [isDark, setIsDark] = useState(true);
  const metaballStrength = 0;
  const normalizedSeed = seed.trim() || 'default-seed';
  const size = 160;
  const padding = 10;

  const randomCircles = useMemo(() => {
    const rand = mulberry32(hashSeed(`${normalizedSeed}-random`));
    const mirroredPairCount = 3 + Math.floor(rand() * 4);
    const minRadiusSpread = 7;
    const maxSetAttempts = 12;
    const maxPairAttempts = 60;
    let best: Circle[] = [];
    let bestSpread = -1;

    for (let setAttempt = 0; setAttempt < maxSetAttempts; setAttempt += 1) {
      const generated: Circle[] = [];
      const pairRadii: number[] = [];

      for (let index = 0; index < mirroredPairCount; index += 1) {
        for (let pairAttempt = 0; pairAttempt < maxPairAttempts; pairAttempt += 1) {
          const r = 8 + rand() * 18;
          const xLeft = padding + r + rand() * (size / 2 - (padding + r));
          const xRight = size - xLeft;
          const y = padding + r + rand() * (size - 2 * (padding + r));

          const left: Circle = { x: xLeft, y, r, id: `${index}-left` };
          const right: Circle = { x: xRight, y, r, id: `${index}-right` };
          const candidates = [left, right];
          const hasTooSimilarRadius = pairRadii.some((existingR) => radiiTooSimilar(existingR, r));

          const hasContainment = generated.some((existing) =>
            candidates.some(
              (candidate) => circleContains(existing, candidate) || circleContains(candidate, existing),
            ),
          );

          if (!hasContainment && !hasTooSimilarRadius) {
            generated.push(left, right);
            pairRadii.push(r);
            break;
          }
        }
      }

      const radii = generated.map((circle) => circle.r);
      const spread = radii.length > 0 ? Math.max(...radii) - Math.min(...radii) : 0;
      if (spread > bestSpread) {
        best = generated;
        bestSpread = spread;
      }
      if (generated.length >= 4 && spread >= minRadiusSpread) {
        return generated;
      }
    }

    return best;
  }, [normalizedSeed, size, padding]);

  const gridCircles = useMemo(() => {
    const rand = mulberry32(hashSeed(`${normalizedSeed}-grid`));
    const gridSize = 5;
    const halfGrid = Math.ceil(gridSize / 2);
    const fillDensity = 0.25 + rand() * 0.5;
    const cellSize = (size - padding * 2) / gridSize;
    const r = cellSize / 2;
    const cells: boolean[][] = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => false),
    );

    for (let y = 0; y < gridSize; y += 1) {
      for (let x = 0; x < halfGrid; x += 1) {
        const filled = rand() < fillDensity;
        cells[y][x] = filled;
        cells[y][gridSize - 1 - x] = filled;
      }
    }

    return cells.flatMap((row, y) =>
      row.flatMap((filled, x) => {
        if (!filled) return [];
        const cx = padding + r + x * cellSize;
        const cy = padding + r + y * cellSize;
        return [{ x: cx, y: cy, r, id: `${x}-${y}` }];
      }),
    );
  }, [normalizedSeed, size, padding]);

  const randomGradientStops = useMemo(
    () => makeGradientStops(`${normalizedSeed}-random-gradient`),
    [normalizedSeed],
  );
  const gridGradientStops = useMemo(
    () => makeGradientStops(`${normalizedSeed}-grid-gradient`),
    [normalizedSeed],
  );

  const randomPanelStyle = useMemo(
    () => makeProcessPanelStyle(randomGradientStops[0].color, randomGradientStops[1].color),
    [randomGradientStops],
  );
  const gridPanelStyle = useMemo(
    () => makeProcessPanelStyle(gridGradientStops[0].color, gridGradientStops[1].color),
    [gridGradientStops],
  );

  const blur = 3 + (metaballStrength / 100) * 8;
  const alpha = 18 + (metaballStrength / 100) * 22;

  return (
    <main className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
          <h1 className="text-3xl font-semibold">GitHub Style Avatar Generator</h1>
          <p className={`text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
            Live compare: random mirrored blobs vs 5x5 mirrored grid.
          </p>
          </div>
          <button
            type="button"
            onClick={() => setIsDark((prev) => !prev)}
            role="switch"
            aria-label="Toggle dark and light background"
            aria-pressed={isDark}
            className={`flex cursor-pointer select-none items-center gap-3 rounded-full border px-3 py-2 text-sm transition-colors duration-300 focus:outline-none focus-visible:ring-2 ${
              isDark
                ? 'border-zinc-600 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 focus-visible:ring-zinc-300'
                : 'border-zinc-300 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus-visible:ring-zinc-700'
            }`}
          >
            <span className="min-w-10 text-left">{isDark ? 'Moon' : 'Sun'}</span>
            <span
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                isDark ? 'bg-zinc-700' : 'bg-amber-300'
              }`}
            >
              <span
                className={`absolute h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
                  isDark ? 'translate-x-0.5' : 'translate-x-5'
                }`}
              />
            </span>
          </button>
        </div>

        <div className={`space-y-5 rounded-xl border p-5 ${isDark ? 'border-zinc-700' : 'border-zinc-300'}`}>
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium">Seed</span>
            <input
              type="text"
              value={seed}
              onChange={(event) => setSeed(event.target.value)}
              placeholder="Enter a seed"
              className={`rounded-md border px-3 py-2 outline-none ${
                isDark
                  ? 'border-zinc-600 bg-zinc-900 text-white focus:border-white'
                  : 'border-zinc-300 bg-white text-black focus:border-black'
              }`}
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div
            className="flex flex-col items-center gap-3 rounded-xl border p-6 transition-all duration-300"
            style={randomPanelStyle}
          >
            <p className="text-sm transition-colors duration-300" style={{ color: randomGradientStops[0].color }}>
              Random (Y-mirrored)
            </p>
            <BlobAvatar
              size={size}
              circles={randomCircles}
              gradientStops={randomGradientStops}
              blur={blur}
              alpha={alpha}
              idPrefix="random"
              label="Random mirrored avatar"
            />
          </div>

          <div
            className="flex flex-col items-center gap-3 rounded-xl border p-6 transition-all duration-300"
            style={gridPanelStyle}
          >
            <p className="text-sm transition-colors duration-300" style={{ color: gridGradientStops[0].color }}>
              Grid 5x5 (Y-mirrored)
            </p>
            <BlobAvatar
              size={size}
              circles={gridCircles}
              gradientStops={gridGradientStops}
              blur={blur}
              alpha={alpha}
              idPrefix="grid"
              label="Grid mirrored avatar"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
