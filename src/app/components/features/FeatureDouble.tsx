'use client'
import React, { useState } from 'react';
import Image from 'next/image'

export default function Feature(
  { alt1,
    alt2,
    imageName1,
    imageHover1Name,
    imageName2,
    imageHover2Name,
    bgColor,
  }: { 
    alt1: string,
    alt2: string,
    imageName1: string,
    imageHover1Name?: string,
    imageName2: string,
    imageHover2Name?: string,
    bgColor: string,
    textColor: string
  }) {
  const [hovering1, setHovering1] = useState(true);
  const [hovering2, setHovering2] = useState(true);
  const hasHoverImage1 = Boolean(imageHover1Name);
  const hasHoverImage2 = Boolean(imageHover2Name);
  const imageSrc1 = !hovering1 && hasHoverImage1 ? imageHover1Name : imageName1;
  const imageSrc2 = !hovering2 && hasHoverImage2 ? imageHover2Name : imageName2;

  return (
    <div className={`${bgColor}`}>
      <div className={`box-border pb-8 mx-8 lg:px-16 flex flex-col lg:flex-row items-center justify-center gap-8`}>
        <Image
          className="observableLeft opacity-0"
          onMouseEnter={hasHoverImage1 ? () => setHovering1(false) : undefined}
          onMouseLeave={hasHoverImage1 ? () => setHovering1(true) : undefined}
          src={`/images/${imageSrc1}`}
          alt={alt1}
          width={500}
          height={0}
        />
        <Image
          className="observableRight opacity-0"
          onMouseEnter={hasHoverImage2 ? () => setHovering2(false) : undefined}
          onMouseLeave={hasHoverImage2 ? () => setHovering2(true) : undefined}
          src={`/images/${imageSrc2}`}
          alt={alt2}
          width={500}
          height={0}
        />
      </div>
    </div>
  );
};
