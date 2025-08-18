'use client'
import React, { ReactNode, useState } from 'react';
import Image from 'next/image';

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
    headerTextColor,
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
    headerTextColor?: string
    borderColor: string,
  }) {
  const [hovering, setHovering] = useState(true);
  const bottomPadding = children ? "my-6" : "";
  headerTextColor = headerTextColor || textColor;

  return (
    <>

      <div className={`relative box-border p-8 flex flex-col lg:flex-row overflow-hidden bg-sky-400 ${textColor}`}>

        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-[0]"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="images/bliss-bg-video-6.mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="flex flex-1 justify-center lg:justify-end observableLeft opacity-0 z-10">
          <div className="text-black flex justify-center items-center">
            <Image
              className="pb-8 lg:pb-0 object-fill w-full max-w-[1000px]"
              onMouseEnter={() => setHovering(false)}
              onMouseLeave={() => setHovering(true)}
              src={hovering ? `/images/${imageName}` : `/images/${imageHoverName}`}
              alt={title}
              width={1000}
              height={1000}
            />
          </div>
        </div>

        <div className="flex-1 lg:pl-8 observableRight opacity-0">

          {/* Main Grid Container */}
          <div className={`flex-col max-w-[1000px]`}>

            <span 
                className="relative w-full block text-3xl lg:text-4xl font-distancia z-10"
                style={{ lineHeight: 1 }}
            >
                {title}
            </span>
            {/* Year */}
            <div className={`relative my-8`}>
              <div className={`
                absolute -top-6 left-4 ${bgColor} ${headerTextColor} border-[1px] rounded-full px-4 py-2 text-2xl font-semibold z-10 backdrop-filter border-white bg-opacity-100 text-[#ea43a3] border-opacity-100
                shadow-[inset_0px_10px_12px_rgba(255,255,255,1),inset_0px_-3px_4px_rgba(200,255,255,0.1),inset_0px_-2px_1px_rgba(255,255,255,1),inset_0px_-2px_8px_rgba(222,222,222,1),0_2px_4px_rgba(200,255,255,0.15)]
              `}>
                Year
              </div>
              <div className={` shadow-[inset_0px_-1px_1px_rgba(255,255,255,1),inset_0px_-2px_1px_rgba(255,255,255,1),inset_0px_-2px_8px_rgba(0,75,111,0.2),inset_0px_-4px_16px_rgba(200,255,255,1)] p-8 border-[1px] border-white rounded-xl backdrop-filter backdrop-blur-md ${bgColor}  bg-opacity-20 border-opacity-100`}>
                <p className={`${textColor}`}>{year}</p>
              </div>
            </div>

            {/* Overview */}
            <div className="relative my-8">
              <div className={`shadow-sm absolute -top-6 left-4 ${bgColor} ${headerTextColor} border-[1px] rounded-full px-4 py-2 text-2xl font-semibold z-10 backdrop-filter border-white bg-opacity-100 bg-white text-[#ea43a3] border-opacity-100
              shadow-[inset_0px_10px_12px_rgba(255,255,255,1),inset_0px_-3px_4px_rgba(200,255,255,0.1),inset_0px_-2px_1px_rgba(255,255,255,1),inset_0px_-2px_8px_rgba(222,222,222,1),0_2px_4px_rgba(200,255,255,0.15)]`} >
                Overview
              </div>
              <div className={` shadow-[inset_0px_-1px_1px_rgba(255,255,255,1),inset_0px_-2px_1px_rgba(255,255,255,1),inset_0px_-2px_8px_rgba(0,75,111,0.2),inset_0px_-4px_16px_rgba(200,255,255,1)] p-8 border-[1px] border-white rounded-xl backdrop-filter backdrop-blur-md ${bgColor}  bg-opacity-20 border-opacity-100`}>
                <p className={`${textColor}`}>{description}</p>
              </div>
            </div>

            {/* Inspiration */}
            <div className="relative my-8">
              <div className={`shadow-sm absolute -top-6 left-4 ${bgColor} ${headerTextColor} border-[1px] rounded-full px-4 py-2 text-2xl font-semibold z-10 backdrop-filter border-white bg-opacity-100 bg-white text-[#ea43a3] border-opacity-100
              shadow-[inset_0px_10px_12px_rgba(255,255,255,1),inset_0px_-3px_4px_rgba(200,255,255,0.1),inset_0px_-2px_1px_rgba(255,255,255,1),inset_0px_-2px_8px_rgba(222,222,222,1),0_2px_4px_rgba(200,255,255,0.15)]`} >
                Inspiration
              </div>
              <div className={` shadow-[inset_0px_-1px_1px_rgba(255,255,255,1),inset_0px_-2px_1px_rgba(255,255,255,1),inset_0px_-2px_8px_rgba(0,75,111,0.2),inset_0px_-4px_16px_rgba(200,255,255,1)] p-8 border-[1px] border-white rounded-xl backdrop-filter backdrop-blur-md ${bgColor}  bg-opacity-20 border-opacity-100`}>
                <p className={`${textColor}`}>{inspiration}</p>
              </div>
            </div>

            {/* Tools */}
            <div className={`relative ${bottomPadding}`}>
              <div className={`shadow-sm absolute -top-6 left-4 ${bgColor} ${headerTextColor} border-[1px] rounded-full px-4 py-2 text-2xl font-semibold z-10 backdrop-filter border-white bg-opacity-100 bg-white text-[#ea43a3] border-opacity-100
              shadow-[inset_0px_10px_12px_rgba(255,255,255,1),inset_0px_-3px_4px_rgba(200,255,255,0.1),inset_0px_-2px_1px_rgba(255,255,255,1),inset_0px_-2px_8px_rgba(222,222,222,1),0_2px_4px_rgba(200,255,255,0.15)]`} >
                Tools
              </div>
              <div className={` shadow-[inset_0px_-1px_1px_rgba(255,255,255,1),inset_0px_-2px_1px_rgba(255,255,255,1),inset_0px_-2px_8px_rgba(0,75,111,0.2),inset_0px_-4px_16px_rgba(200,255,255,1)] p-8 border-[1px] border-white rounded-xl backdrop-filter backdrop-blur-md ${bgColor}  bg-opacity-20 border-opacity-100`}>
                <p className={`${textColor}`}>{tools}</p>
              </div>
            </div>

            <div className="relative">{children}</div>
          </div>

        </div>
      </div>
    </>
  );
};
