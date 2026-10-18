'use client';
import { useState } from 'react';
import Image from 'next/image';

type ImagePairGalleryProps = {
  alt1: string;
  alt2: string;
  imageName1: string;
  imageHover1Name?: string;
  imageName2: string;
  imageHover2Name?: string;
  bgColor: string;
};

export default function ImagePairGallery({
  alt1,
  alt2,
  imageName1,
  imageHover1Name,
  imageName2,
  imageHover2Name,
  bgColor,
}: ImagePairGalleryProps) {
  const [hovering1, setHovering1] = useState(true);
  const [hovering2, setHovering2] = useState(true);
  const imageSrc1 = !hovering1 && imageHover1Name ? imageHover1Name : imageName1;
  const imageSrc2 = !hovering2 && imageHover2Name ? imageHover2Name : imageName2;

  return (
    <div className={bgColor}>
      <div className="box-border pb-8 mx-8 lg:px-16 flex flex-col lg:flex-row items-center justify-center gap-8">
        <Image
          className="observableLeft opacity-0"
          onMouseEnter={imageHover1Name ? () => setHovering1(false) : undefined}
          onMouseLeave={imageHover1Name ? () => setHovering1(true) : undefined}
          src={`/images/${imageSrc1}`}
          alt={alt1}
          width={500}
          height={0}
        />
        <Image
          className="observableRight opacity-0"
          onMouseEnter={imageHover2Name ? () => setHovering2(false) : undefined}
          onMouseLeave={imageHover2Name ? () => setHovering2(true) : undefined}
          src={`/images/${imageSrc2}`}
          alt={alt2}
          width={500}
          height={0}
        />
      </div>
    </div>
  );
}
