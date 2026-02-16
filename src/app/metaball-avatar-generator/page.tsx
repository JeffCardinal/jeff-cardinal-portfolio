'use client';

import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, MarchingCube, MarchingCubes, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

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

const centersOutsideEachOther = (a: Circle, b: Circle): boolean => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distance = Math.hypot(dx, dy);
  return distance > a.r && distance > b.r;
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
const toThreeColor = (hsl: string) => {
  const match = hsl.match(/hsl\(([-\d.]+)\s+([\d.]+)%\s+([\d.]+)%\)/);
  if (!match) return hsl;
  const hue = ((Number(match[1]) % 360) + 360) % 360;
  const saturation = Number(match[2]) / 100;
  const lightness = Number(match[3]) / 100;
  const color = new THREE.Color();
  color.setHSL(hue / 360, saturation, lightness);
  return `#${color.getHexString()}`;
};

const makeProcessPanelStyle = (primary: string, secondary: string): CSSProperties => ({
  backgroundImage: `
    linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%),
    linear-gradient(180deg, ${withAlpha(primary, 1)} 0%, ${withAlpha(secondary, 1)} 100%)
  `,
  border: '1px solid transparent',
  backgroundOrigin: 'padding-box, border-box',
  backgroundClip: 'padding-box, border-box',
});

function SphereCloud3D({
  circles,
  size,
  colorA,
  colorB,
  sceneScale,
  xScale,
  yScale,
  radiusScale,
}: {
  circles: Circle[];
  size: number;
  colorA: string;
  colorB: string;
  sceneScale: number;
  xScale: number;
  yScale: number;
  radiusScale: number;
}) {
  const spheres = useMemo(
    () =>
      circles.map((circle) => {
        const x = ((circle.x / size) - 0.5) * 2 * sceneScale * xScale;
        const y = (0.5 - circle.y / size) * 2 * sceneScale * yScale;
        const r = (circle.r / size) * 2 * sceneScale * radiusScale;
        return { id: circle.id, x, y, r };
      }),
    [circles, size, sceneScale, xScale, yScale, radiusScale],
  );
  const materialColorA = useMemo(() => toThreeColor(colorA), [colorA]);
  const materialColorB = useMemo(() => toThreeColor(colorB), [colorB]);
  const sharedMaterialProps = useMemo(
    () => ({
      color: materialColorA,
      emissive: materialColorB,
      emissiveIntensity: 0.22,
      metalness: 0.52,
      roughness: 0.08,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      sheen: 1,
      sheenRoughness: 0.12,
      sheenColor: materialColorB,
      iridescence: 1,
      iridescenceIOR: 1.55,
      iridescenceThicknessRange: [260, 1200] as [number, number],
    }),
    [materialColorA, materialColorB],
  );

  return (
    <group>
      {spheres.map((sphere) => (
        <mesh key={sphere.id} position={[sphere.x, sphere.y, 0]}>
          <sphereGeometry args={[sphere.r, 40, 40]} />
          <meshPhysicalMaterial {...sharedMaterialProps} />
        </mesh>
      ))}
    </group>
  );
}

function MetaballCloud3D({
  circles,
  size,
  colorA,
  colorB,
  sceneScale,
  xScale,
  yScale,
  radiusScale,
}: {
  circles: Circle[];
  size: number;
  colorA: string;
  colorB: string;
  sceneScale: number;
  xScale: number;
  yScale: number;
  radiusScale: number;
}) {
  const subtract = 12;
  const metaballs = useMemo(
    () =>
      circles.map((circle) => {
        const x = ((circle.x / size) - 0.5) * 2 * sceneScale * xScale;
        const y = (0.5 - circle.y / size) * 2 * sceneScale * yScale;
        const radius = (circle.r / size) * 2 * sceneScale * radiusScale;
        const strength = subtract * Math.pow(radius, 1.75);
        return { id: circle.id, x, y, strength };
      }),
    [circles, size, sceneScale, xScale, yScale, radiusScale],
  );
  const materialColorA = useMemo(() => toThreeColor(colorA), [colorA]);
  const materialColorB = useMemo(() => toThreeColor(colorB), [colorB]);
  const sharedMaterialProps = useMemo(
    () => ({
      color: materialColorA,
      emissive: materialColorB,
      emissiveIntensity: 0.22,
      metalness: 0.52,
      roughness: 0.08,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
      sheen: 1,
      sheenRoughness: 0.12,
      sheenColor: materialColorB,
      iridescence: 1,
      iridescenceIOR: 1.55,
      iridescenceThicknessRange: [260, 1200] as [number, number],
    }),
    [materialColorA, materialColorB],
  );

  return (
    <MarchingCubes resolution={56} maxPolyCount={90000} enableUvs={false} enableColors={false}>
      <meshPhysicalMaterial {...sharedMaterialProps} />
      {metaballs.map((ball) => (
        <MarchingCube key={ball.id} position={[ball.x, ball.y, 0]} strength={ball.strength} subtract={subtract} />
      ))}
    </MarchingCubes>
  );
}

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

export default function MetaballAvatarGeneratorPage() {
  const [seed, setSeed] = useState('jeff!');
  const sceneScale = 1;
  const xScale = 1;
  const yScale = 1;
  const radiusScale = 1;
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
          const r = 8 + rand() * 23.4;
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
          const hasCenterInside = generated.some((existing) =>
            candidates.some((candidate) => !centersOutsideEachOther(existing, candidate)),
          );
          const pairCentersOverlap = !centersOutsideEachOther(left, right);

          if (!hasContainment && !hasTooSimilarRadius && !hasCenterInside && !pairCentersOverlap) {
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
    const fillDensity = 0.2 + rand() * 0.5;
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

  const gradientStops = useMemo(
    () => makeGradientStops(`${normalizedSeed}-random-gradient`),
    [normalizedSeed],
  );

  const panelStyle = useMemo(
    () => makeProcessPanelStyle(gradientStops[0].color, gradientStops[1].color),
    [gradientStops],
  );

  const blur = 3 + (metaballStrength / 100) * 8;
  const alpha = 18 + (metaballStrength / 100) * 22;

  return (
    <main className={`min-h-screen bg-black text-white`}>
      <section className="mx-auto flex w-full max-w-[1000px] flex-col gap-4 px-4 py-32">
        <h1 className="text-3xl font-semibold font-distancia text-center">Metaball Avatar Generator</h1>

        <div className={`space-y-4 rounded-xl border p-4 border-zinc-300`}>
          <label className="flex flex-col gap-4 text-sm">
            <span className="font-distancia">Seed</span>
            <input
              type="text"
              value={seed}
              onChange={(event) => setSeed(event.target.value)}
              placeholder="Enter a seed"
              className={`rounded-md border px-2 outline-none border-zinc-300 bg-white text-black focus:border-black`}
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div
            className="flex flex-col items-center rounded-xl border p-4 transition-all duration-300"
            style={panelStyle}
          >
            <BlobAvatar
              size={size}
              circles={randomCircles}
              gradientStops={gradientStops}
              blur={blur}
              alpha={alpha}
              idPrefix="random"
              label="Random mirrored avatar"
            />
          </div>

          <div
            className="flex flex-col items-center rounded-xl border p-4 transition-all duration-300"
            style={panelStyle}
          >
            <BlobAvatar
              size={size}
              circles={gridCircles}
              gradientStops={gradientStops}
              blur={blur}
              alpha={alpha}
              idPrefix="grid"
              label="Grid mirrored avatar"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div
            className="flex flex-col items-center rounded-xl border p-4 transition-all duration-300"
            style={panelStyle}
          >
            <div className="h-[360px] w-full overflow-hidden rounded-lg bg-black">
              <Canvas camera={{ position: [0, 0, 2.3], fov: 45 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[2, 3, 4]} intensity={1.2} />
                <directionalLight position={[-2, -1, 2]} intensity={0.5} />
                <Environment preset="studio" />
                <SphereCloud3D
                  circles={randomCircles}
                  size={size}
                  colorA={gradientStops[0].color}
                  colorB={gradientStops[1].color}
                  sceneScale={sceneScale}
                  xScale={xScale}
                  yScale={yScale}
                  radiusScale={radiusScale}
                />
                <OrbitControls enablePan={false} minDistance={1.4} maxDistance={3.5} />
              </Canvas>
            </div>
          </div>

          <div
            className="flex flex-col items-center rounded-xl border p-4 transition-all duration-300"
            style={panelStyle}
          >
            <div className="h-[360px] w-full overflow-hidden rounded-lg bg-black">
              <Canvas camera={{ position: [0, 0, 2.3], fov: 45 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[2, 3, 4]} intensity={1.2} />
                <directionalLight position={[-2, -1, 2]} intensity={0.5} />
                <Environment preset="studio" />
                <MetaballCloud3D
                  circles={randomCircles}
                  size={size}
                  colorA={gradientStops[0].color}
                  colorB={gradientStops[1].color}
                  sceneScale={sceneScale}
                  xScale={xScale}
                  yScale={yScale}
                  radiusScale={radiusScale}
                />
                <OrbitControls enablePan={false} minDistance={1.4} maxDistance={3.5} />
              </Canvas>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
