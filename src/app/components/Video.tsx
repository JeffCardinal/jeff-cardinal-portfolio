import Link from 'next/link';
import React from 'react';

export default function Video(
  {
    videoUrl,
    title,
    description,
    caseStudyUrl,
    className = "",
    videoClassName = "",
  }: {
    videoUrl: string;
    title: string;
    description: string;
    caseStudyUrl: string;
    className?: string;
    videoClassName?: string;
  }
) {
    let caseStudy;
    if (caseStudyUrl) {
      caseStudy = 
        <div className="px-4 pb-4 absolute bottom-0 left-0 w-full flex flex-col items-center justify-center transform translate-y-0">
            <Link href={caseStudyUrl}>
              <button className="px-4 mr-0 pt-[2px] outline outline-[5px] outline-black hover:text-rose-500 hover:outline-rose-500 bg-white text-black rounded-full font-distancia text-lg transition-all duration-300">
                  Case Study
              </button>
            </Link>
        </div>
    }
  return (
    <div className={`relative group overflow-hidden ${className}`}>
        <video playsInline autoPlay loop muted className={`block w-full h-auto ${videoClassName}`}>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        {caseStudy}
        {/* <div className="p-8 overflow-y-scroll absolute bottom-0 left-0 w-full h-1/3 bg-black bg-opacity-100 text-white flex flex-col items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="font-bold">{title}</div>
            <div>{description}</div>
        </div> */}
    </div>
  );
};
