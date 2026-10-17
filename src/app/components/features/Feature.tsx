"use client";
import React, { ReactNode, useState } from "react";
import Image from 'next/image'

export default function Feature({
  children,
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
  children: ReactNode;
  title: string;
  description: ReactNode;
  inspiration: ReactNode;
  tools: string;
  year: string;
  imageName: string;
  imageHoverName?: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}) {
  const [hovering, setHovering] = useState(true);
  const hasHoverImage = Boolean(imageHoverName);
  const imageSrc = !hovering && hasHoverImage ? imageHoverName : imageName;
  const bottomPadding = children ? "my-6" : "";

  return (
    <>
      <div className={`box-border p-8 flex flex-col lg:flex-row ${bgColor} ${textColor}`} >
        {/* Image Container */}
        <div className="flex flex-1 justify-center items-center lg:justify-end observableLeft opacity-0 pb-8 lg:pb-0">
          <Image
            width={1000}
            height={1000}
            sizes="100vw"
            onMouseEnter={hasHoverImage ? () => setHovering(false) : undefined}
            onMouseLeave={hasHoverImage ? () => setHovering(true) : undefined}
            src={`/images/${imageSrc}`}
            alt={title}
          />
        </div>

        {/* Main Grid Container */}
        <div className="flex-1 lg:pl-8">
          <span
            className="observableRight opacity-0 w-full block text-3xl lg:text-4xl font-distancia"
            style={{ lineHeight: 1 }}
          >
            {title}
          </span>

          <div className={`flex-col max-w-[1000px]`}>
            {/* Year */}
            <div className={`observableRight opacity-0 relative my-8`}>
              <div
                className={`absolute -top-6 left-4 ${bgColor} ${textColor} rounded-full px-2 py-2 text-2xl ${borderColor} font-semibold`}
              >
                Year
              </div>
              <div
                className={`p-8 border-[3px] rounded-xl ${borderColor} border-opacity-50`}
              >
                <p className="">{year}</p>
              </div>
            </div>

            {/* Overview */}
            <div className="observableRight opacity-0 relative my-8">
              <div
                className={`absolute -top-6 left-4 ${bgColor} ${textColor} rounded-full px-2 py-2 text-2xl  font-semibold`}
              >
                Overview
              </div>
              <div
                className={`p-8 border-[3px] rounded-xl ${borderColor} border-opacity-50`}
              >
                <p>{description}</p>
              </div>
            </div>

            {/* Inspiration */}
            <div className="observableRight opacity-0 relative my-8">
              <div
                className={`absolute -top-6 left-4 ${bgColor} ${textColor} rounded-full px-2 py-2 text-2xl ${borderColor} font-semibold`}
              >
                Inspiration
              </div>
              <div
                className={`p-8 border-[3px] rounded-xl ${borderColor} border-opacity-50`}
              >
                <p>{inspiration}</p>
              </div>
            </div>

            {/* Tools */}
            <div
              className={`observableRight opacity-0 relative ${bottomPadding}`}
            >
              <div
                className={`absolute -top-6 left-4 ${bgColor} ${textColor} rounded-full px-2 py-2 text-2xl ${borderColor} font-semibold`}
              >
                Tools
              </div>
              <div
                className={`p-8 border-[3px] rounded-xl ${borderColor} border-opacity-50`}
              >
                <p className="">{tools}</p>
              </div>
            </div>
          </div>

          <div className="observableRight opacity-0">{children}</div>
        </div>
      </div>
    </>
  );
}
