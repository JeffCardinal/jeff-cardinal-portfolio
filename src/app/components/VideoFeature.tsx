'use client'
import React from 'react';
import Video from './Video';

export default function VideoFeature() {
  return (
      <div className={`box-border lg:p-8 items-center justify-center flex flex-3 flex-col lg:flex-row bg-black`}>
        <Video 
          videoUrl="/videos/ditb-reel.mp4" 
          title={"xJermsx - Drugs in the Bathroom [DJ CAMGIRL Remix]"} 
          description={"Remix promotional reel. Smiley pressed pill rendered in Cinema 4D and imported to Adobe AE. Custom glitch effect."} />
        <Video 
          videoUrl="/videos/funk-forever-reel.mp4" 
          title={"Funk Forever Party"}
          description={"Future Funk party promotion reel."} />
        <Video 
          videoUrl="/videos/sega-dreamland-reel.mp4" 
          title={"VAPERROR - Sega Dreamland Reel"} 
          description={"10 year anniversary commemorative reel based on the original single cover posted on SoundCloud."} />
        <Video 
          videoUrl="/videos/tribal-heart-reel.mp4" 
          title={"Tribal Diamond Heart"} 
          description={"Rendered in Blender using Cycles. Custom material set to mimic real diamond refractive index. Graffiti background from construction zone in Montreal, shot on iPhone 13."} />
        <Video 
          videoUrl="/videos/metalheartreel1.mp4" 
          title={"DJ CAMGIRL - Aberrations"} 
          description={"Promotional reel. Metalheart created in Blender."} />
      </div>
  );
};
