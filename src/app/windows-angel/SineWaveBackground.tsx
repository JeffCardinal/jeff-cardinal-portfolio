'use client'

import React, { useMemo } from 'react'

export default function SineWavesBackground() {
  // fixed viewbox keeps math simple; it stretches to fit via preserveAspectRatio="none"
  const W = 1440
  const H = 900

  const makeSine = (
    amp: number,
    wavelength: number,
    phase: number,
    yCenter: number,
    step = 12
  ) => {
    const extra = wavelength // extend so drift loops seamlessly
    let d = `M ${-extra},${yCenter + amp * Math.sin(((-extra + phase) * 2 * Math.PI) / wavelength)}`
    for (let x = -extra + step; x <= W + extra; x += step) {
      const y = yCenter + amp * Math.sin(((x + phase) * 2 * Math.PI) / wavelength)
      d += ` L ${x},${y}`
    }
    return d
  }

  // precompute the three waves
  const paths = useMemo(() => {
    return [
      {
        d: makeSine(64, 320, 40, H * 0.5),
        className: 'text-indigo-400',
        strokeWidth: 2,
        driftClass: 'drift-med',
        wavelength: 320,
      },
      {
        d: makeSine(24, 220, 0, H * 0.5),
        className: 'text-indigo-400 opacity-50',
        strokeWidth: 2,
        driftClass: 'drift-slow',
        wavelength: 220,
      },
      {
        d: makeSine(4, 160, 80, H * 0.5),
        className: 'text-indigo-400 opacity-20',
        strokeWidth: 2,
        driftClass: 'drift-fast',
        wavelength: 160,
      },
    ]
  }, [H])

  return (
    <div
      aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >

        {paths.map((p, i) => (
          <g
            key={i}
            className={p.driftClass}
            style={{ transform: `translateZ(0)` }}
          >
            <path
              d={p.d}
              stroke="currentColor"
              className={p.className}
              strokeWidth={p.strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>

      {/* local styles for drifting motion */}
      <style jsx>{`
        @keyframes driftX {
          from { transform: translateX(0); }
          to   { transform: translateX(-220px); } /* overridden per layer below */
        }
        .drift-slow { animation: driftX 3s linear infinite; }
        .drift-med  { animation: driftX 2s linear infinite; }
        .drift-fast { animation: driftX 1s linear infinite; }

        /* customize each group's travel distance to its wavelength so loops are seamless */
        .drift-slow { animation-name: driftXSlow; }
        .drift-med  { animation-name: driftXMed; }
        .drift-fast { animation-name: driftXFast; }

        @keyframes driftXSlow { from { transform: translateX(0); } to { transform: translateX(-220px); } }
        @keyframes driftXMed  { from { transform: translateX(0); } to { transform: translateX(-320px); } }
        @keyframes driftXFast { from { transform: translateX(0); } to { transform: translateX(-160px); } }
      `}</style>
    </div>
  )
}
