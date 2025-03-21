'use client'
import React, { ReactNode, useState } from 'react';
import Image from 'next/image'

export default function Feature(
  { children,
    title,
    description,
    inspiration,
    tools,
    year,
    imageName,
    imageHoverName,
    bgColor,
    textColor,
    borderColor,
  }: { 
    children: ReactNode,
    title: string,
    description: string,
    inspiration: string,
    tools: string,
    year: string,
    imageName: string,
    imageHoverName: string,
    bgColor: string,
    textColor: string,
    borderColor: string,
  }) {
  const [hovering, setHovering] = useState(true);
  const bottomPadding = children ? "my-6" : "";

  return (
    <>
      <div className={`box-border p-8 flex flex-col lg:flex-row ${bgColor} text-${textColor}`}>
        
        <div className="flex flex-1 justify-center lg:justify-end observableLeft opacity-0">
          <div className="aspect-square text-black justify-center items-center">
            <Image
              className="pb-8 lg:pb-0"
              onMouseEnter={() => setHovering(false)}
              onMouseLeave={() => setHovering(true)}
              src={hovering ? `/images/${imageName}` : `/images/${imageHoverName}`}
              alt={title}
              width="1000"
              height="0"
            />
          </div>
        </div>

        <div className="flex-1 lg:pl-8 observableRight opacity-0">
          <span className="w-full block text-3xl lg:text-4xl font-distancia">{title}</span>

          {/* Main Grid Container */}
          <div className={`flex-col`}>

            {/* Year */}
            <div className={`relative my-8`}>
              <div className={`absolute -top-6 left-4 ${bgColor} text-${textColor} rounded-full px-2 py-2 text-2xl ${borderColor} font-semibold`} >
                Year
              </div>
              <div className={`p-8 border-[1px] rounded-xl ${borderColor} border-opacity-50`}>
                <p className="">{year}</p>
              </div>
            </div>

            {/* Overview */}
            <div className="relative my-8">
              <div className={`absolute -top-6 left-4 ${bgColor} text-${textColor} rounded-full px-2 py-2 text-2xl  font-semibold`}>
                Overview
              </div>
              <div className={`p-8 border-[1px] rounded-xl ${borderColor} border-opacity-50`}>
                <p>{description}</p>
              </div>
            </div>

            {/* Inspiration */}
            <div className="relative my-8">
              <div className={`absolute -top-6 left-4 ${bgColor} text-${textColor} rounded-full px-2 py-2 text-2xl ${borderColor} font-semibold`} >
                Inspiration
              </div>
              <div className={`p-8 border-[1px] rounded-xl ${borderColor} border-opacity-50`}>
                <p>{inspiration}</p>
              </div>
            </div>

            {/* Tools */}
            <div className={`relative ${bottomPadding}`}>
              <div className={`absolute -top-6 left-4 ${bgColor} text-${textColor} rounded-full px-2 py-2 text-2xl ${borderColor} font-semibold`} >
                Tools
              </div>
              <div className={`p-8 border-[1px] rounded-xl ${borderColor} border-opacity-50`}>
                <p className="">{tools}</p>
              </div>
            </div>

          </div>

          <div>{children}</div>
        </div>
      </div>
    </>
  );
};
