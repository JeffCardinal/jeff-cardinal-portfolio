'use client'
import React, { ReactNode } from 'react';
import Image from 'next/image'


export default function CodeFeature({
  title,
  bgColor,
  textColor,
 }: {
  title: string,
  bgColor: string,
  textColor: string
}) {
  return (
    <div className={`box-border p-8 flex ${bgColor} ${textColor}`}>
      <div className="flex-1 w-full justify-end">
      <div className="">
        <span className="text-3xl lg:text-4xl font-distancia">{title}</span>
        <div className="mt-8">
          Music can be code, too. I made a unique synthesizer oscillator using the Korg SDK. Here's a commented code snippet from the project:
        </div>
        <div className="bg-[#111111] p-4 mt-8 rounded-lg">
          <pre className="font-mono overflow-scroll">
{`//Main oscillator loop
for (; y != y_e; ) {
  const float dist_mod = dist + lfoz * dist;

  float p = phase + linintf(dist_mod, 1.f, dist_mod * osc_sawf(0.1f-phase));
  
  //Reset phase if needed, basically a mod function
  p = (p <= 0) ? 1.f - p : p - (uint32_t)p;

  float sig = osc_sawf(p);

  //Apply soft clip
  sig = osc_softclipf(0.5f, drive * sig);

  //Convert the signal from floating point to fixed point integer  
  *(y++) = f32_to_q31(sig);

  phase += w0;
  phase -= (uint32_t)phase;

  lfoz += lfo_inc;
}
`}
          </pre>
        </div>
      </div>
      </div>
    </div>
  );
};
