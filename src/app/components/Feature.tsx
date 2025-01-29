'use client'
import React, { ReactNode, Suspense, useEffect, useState } from 'react';
import Image from 'next/image'

// function ImageWithDelay({ imageName, imageHoverName, title }) {
//   const [hovering, setHovering] = useState(false);
//   const [isSuspended, setIsSuspended] = useState(true);

//   useEffect(() => {
//     // Simulate a 5-second delay for the Suspense fallback
//     const timeout = setTimeout(() => {
//       setIsSuspended(false); // Allow Suspense to render the children
//     }, 5000);

//     return () => clearTimeout(timeout); // Cleanup timeout on unmount
//   }, []);
// }

export default function Feature(
  { children,
    title,
    description,
    inspiration,
    tools,
    imageName,
    imageHoverName,
    bgColor,
    textColor
  }: { 
    children: ReactNode,
    title: string,
    description: string,
    inspiration: string,
    tools: string,
    imageName: string,
    imageHoverName: string,
    bgColor: string,
    textColor: string
  }) {
  const [hovering, setHovering] = useState(true);

  return (
    <div className={`box-border p-8 flex flex-col lg:flex-row ${bgColor} ${textColor}`}>
      <div className="flex flex-1 justify-center lg:justify-end observableLeft opacity-0">
      <Suspense fallback={<div className="max-w-[500px] mb-8 w-full h-auto aspect-square text-black justify-center items-center">Test!</div>}>
        <Image
          className="pb-8 lg:pb-0"
          onMouseEnter={() => setHovering(false)}
          onMouseLeave={() => setHovering(true)}
          src={hovering ? `/images/${imageName}`: `/images/${imageHoverName}`}
          alt={title} 
          width="500"
          height="0"
        />
      </Suspense>
      </div>
      <div className="flex-1 lg:pl-8 observableRight opacity-0">
        <span className={`w-full block text-3xl lg:text-4xl font-distancia`}>{title}</span>
        <p>{description}</p>
        <p>{inspiration}</p>
        <p className="opacity-50">Tools: {tools}</p>
        <div>{ children }</div>
      </div>
    </div>
  );
};
