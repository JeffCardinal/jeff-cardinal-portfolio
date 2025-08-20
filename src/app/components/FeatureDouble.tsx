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
    imageHover1Name: string,
    imageName2: string,
    imageHover2Name: string,
    bgColor: string,
    textColor: string
  }) {
  const [hovering1, setHovering1] = useState(true);
  const [hovering2, setHovering2] = useState(true);

  return (
    <div className={`${bgColor}`}>
      <div className={`box-border pb-8 mx-8 lg:px-16 flex flex-col lg:flex-row items-center justify-center gap-8`}>
        <Image
          className="observableLeft opacity-0"
          onMouseEnter={() => setHovering1(false)}
          onMouseLeave={() => setHovering1(true)}
          src={hovering1 ? `/images/${imageName1}` : `/images/${imageHover1Name}`}
          alt={alt1}
          width={500}
          height={0}
        />
        <Image
          className="observableRight opacity-0"
          onMouseEnter={() => setHovering2(false)}
          onMouseLeave={() => setHovering2(true)}
          src={hovering2 ? `/images/${imageName2}` : `/images/${imageHover2Name}`}
          alt={alt2}
          width={500}
          height={0}
        />
      </div>
    </div>
  );
};
