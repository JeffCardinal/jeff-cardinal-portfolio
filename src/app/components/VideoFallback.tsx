import React from "react";
import Image from "next/image";

const VideoFallback = () => {
  return (
    <div className="bg-black">
        {/* 
            This is my hack to get the React Suspense object to fit the exact dimensions of the video that will replace it. 
            It's only a 1.2KB image, so the performance hit is negligible.
        */}
        <div className="relative flex items-center justify-center">
            <Image 
                src={"/images/util/9x16.jpg"} 
                alt={""}
                width={0}
                height={0}
                style={{ width: '400px', height: 'auto' }}
                objectFit='contain'
            >
            </Image>
            <div className="absolute">
                <div className="relative w-12 h-12 border-8 border-white border-t-black rounded-full animate-spin items-center justify-center"/>
            </div>
        </div>
    </div>
  );
};

export default VideoFallback;
