'use client'
import React, { ReactNode, useState } from 'react';
import Image from 'next/image'

export default function Feature(
  { children,
    title,
    description,
    inspiration,
    tools,
    imageName,
    imageHoverName=imageName,
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
      <div className="flex flex-1 justify-center lg:justify-end">
        <Image
          className="pb-8 lg:pb-0"
          onMouseEnter={() => setHovering(false)}
          onMouseLeave={() => setHovering(true)}
          src={hovering ? `/images/${imageName}.png`: `/images/${imageHoverName}.png`}
          alt={title} 
          width="500"
          height="0"
        />
      </div>
      <div className="flex-1 lg:pl-8">
        <span className="w-full block text-3xl lg:text-4xl font-distancia">{title}</span>
        <p>{description}</p>
        <p>{inspiration}</p>
        <p className="italic">{tools}</p>
        <div>{ children }</div>
      </div>
    </div>
  );
};
