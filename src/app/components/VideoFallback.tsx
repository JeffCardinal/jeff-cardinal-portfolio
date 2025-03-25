import React from "react";
import Image from "next/image";

const VideoFallback = () => {
    return (
      <div className="bg-black">
          <div className="relative flex items-center justify-center">
              <div 
                  className="bg-red"
                  style={{ width: '400px', height: '711px' }}
              />
              <div className="absolute">
                  <div className="relative w-12 h-12 border-8 border-white border-t-black rounded-full animate-spin items-center justify-center"/>
              </div>
          </div>
      </div>
    );
  };
  

export default VideoFallback;
