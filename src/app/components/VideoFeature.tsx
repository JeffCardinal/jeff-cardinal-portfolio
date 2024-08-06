'use client'
import React, { useState } from 'react';
import Image from 'next/image'

interface VideoFeatureProps {
  bgColor: string;
  textColor: string;
}


const VideoFeature: React.FC<VideoFeatureProps> = ({ bgColor, textColor }) => {
  return (
      <div className={`box-border lg:p-8 items-center justify-center flex flex-3 flex-col lg:flex-row ${bgColor} ${textColor}`}>
          <video className="lg:p-4 lg:pr-8" width="400" playsInline autoPlay loop muted>
            <source src="/videos/ditb-reel.mp4" type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
          <video className="lg:p-4 lg:pr-8" width="400" playsInline autoPlay loop muted>
            <source src="/videos/funk-forever-reel.mp4" type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
          <video className="lg:p-4 lg:pr-8" width="400" playsInline autoPlay loop muted>
            <source src="/videos/sega-dreamland-reel.mp4" type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
      </div>
  );
};

export default VideoFeature;