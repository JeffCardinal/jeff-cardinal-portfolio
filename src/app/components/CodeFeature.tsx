'use client'
import React, { ReactNode } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { obsidian } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Video from './Video';

export default function CodeFeature({
  title,
  bgColor,
  textColor,
 }: {
  title: string,
  bgColor: string,
  textColor: string
}) {
  const code = `//Main oscillator loop
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
`
return (
  <div className={`box-border p-8 flex ${bgColor} ${textColor}`}>
    <div className="flex-1 w-full justify-end">
      <div>
        <span className="text-3xl lg:text-4xl font-distancia w-full">{title}</span>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="bg-[#111111] mt-8">
              <span className="flex flex-col px-8 pt-8">
                Music can be code, too. 
                <br />
                <br />
                I made a unique synthesizer oscillator using the Korg SDK. Based on parameters the user can control, the oscillator will take many unique wave shapes, morphing from a saw wave to a pulse wave to something inbetween as you might expect in a wavetable synthesizer.
                <br/>
                <br/>
                Here's a commented code snippet from the project:
              </span>
              <div className="p-8">
                <SyntaxHighlighter language="cpp" style={obsidian}>{code}</SyntaxHighlighter>
              </div>
            </div>
          </div>
          <div className="lg:mt-8 align-middle lg:w-1/2">
            <div className="w-full bg-[#111111] p-8">
              <span>Check out the eponymous track made entirely with Gojira here:</span>
              <div className="mt-8">
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/track/7EbBmhutSnvaBjIf7uA4BV?utm_source=generator&theme=0"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            <div className="mt-8 p-8 bg-[#111111]">
              <video 
                className="w-full h-60 object-cover" 
                autoPlay 
                loop
                muted
                playsInline
              >
                <source src="/videos-optimized/gojira-osc.mp4" type="video/mp4"/>
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


};
