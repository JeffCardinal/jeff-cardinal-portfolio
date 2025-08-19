'use client'
import React, { ReactNode, useState } from 'react';
import Image from 'next/image'

export default function Feature(
  { children,
    title,
    description,
    year,
    tools,
    imageName,
    imageHoverName,
    bgColor,
    borderColor,
    textColor,
    font,
    isTitleVerticallyCentered
  }: { 
    children: ReactNode,
    title: string,
    description: string,
    year: string,
    tools: string,
    imageName: string,
    imageHoverName: string,
    bgColor: string,
    borderColor: string,
    textColor: string,
    font: string,
    isTitleVerticallyCentered: boolean
  }) {
  const [hovering, setHovering] = useState(true);
  let verticalCentering = '';
  if(isTitleVerticallyCentered) verticalCentering = 'items-center';

  return (
    <div className={`box-border p-8 flex flex-col lg:flex-row ${bgColor} ${textColor}`}>
      <div className="flex flex-1 justify-center lg:justify-end observableLeft opacity-0">
        <Image
          className="pb-8 lg:pb-0  object-scale-down"
          onMouseEnter={() => setHovering(false)}
          onMouseLeave={() => setHovering(true)}
          src={hovering ? `/images/${imageName}`: `/images/${imageHoverName}`}
          alt={title} 
          width="1000"
          height="0"
        />
      </div>
      <div className={`flex-1 lg:pl-8 ${textColor}`}>
        <span className={`w-full block ${font}`}>{title}</span>
        <div className="max-w-[1000px]">
          <div className={`observableRight opacity-0 relative my-8`}>
            <div className={`absolute -top-6 left-4 ${bgColor} rounded-full px-2 py-2 text-2xl font-semibold`} >
              Year
            </div>
            <div className={`p-8 border-[1px] rounded-xl ${borderColor} border-opacity-50`}>
              <p className="">{year}</p>
            </div>
          </div>
          <div className={`observableRight opacity-0 relative my-8`}>
            <div className={`absolute -top-6 left-4 ${bgColor} rounded-full px-2 py-2 text-2xl font-semibold`} >
              Overview
            </div>
            <div className={`p-8 border-[1px] rounded-xl ${borderColor} border-opacity-50`}>
              <p>{description}</p>
            </div>
          </div>
          
          <div className={`observableRight opacity-0 relative my-6`}>
            <div className={`absolute -top-6 left-4 ${bgColor} rounded-full px-2 py-2 text-2xl font-semibold`} >
              Tools
            </div>
            <div className={`p-8 border-[1px] rounded-xl ${borderColor} border-opacity-50`}>
              <p className="">{tools}</p>
            </div>
          </div>
          <div className="observableRight opacity-0">{ children }</div>
        </div>
      </div>
    </div>
  );
};