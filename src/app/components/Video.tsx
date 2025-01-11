import React from 'react';

export default function Video(
    { videoUrl, title, description }: { videoUrl: string, title: string, description: string }
) {
  return (
    <div className="relative group " style={{ width: "400px", overflow: "hidden" }}>
        <video width="400" playsInline autoPlay loop muted className="block">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className="p-8 absolute bottom-0 left-0 w-full h-1/3 bg-black bg-opacity-100 text-white flex flex-col items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="font-bold">{title}</div>
            <div>{description}</div>
        </div>
    </div>
  );
};