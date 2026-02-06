import React from 'react';
import VideoCarousel25D from './VideoCarousel25D';

export default function VideoFeature() {
  const items = [
    {
      videoUrl: "/videos-optimized/ditb-reel.mp4",
      title: "xJermsx - Drugs in the Bathroom [DJ CAMGIRL Remix]",
      description: "",
      caseStudyUrl: "",
    },
    {
      videoUrl: "/videos-optimized/funk-forever-reel.mp4",
      title: "Funk Forever Party",
      description: "",
      caseStudyUrl: "",
    },
    {
      videoUrl: "/videos-optimized/sega-dreamland-reel.mp4",
      title: "VAPERROR - Sega Dreamland Reel",
      description: "",
      caseStudyUrl: "",
    },
    {
      videoUrl: "/videos-optimized/tribal-heart-reel.mp4",
      title: "Tribal Diamond Heart",
      description: "",
      caseStudyUrl: "./case-tribal-heart",
    },
    {
      videoUrl: "/videos-optimized/metalheartreel1.mp4",
      title: "DJ CAMGIRL - Aberrations",
      description: "",
      caseStudyUrl: "",
    },
  ];

  return (
    <div className="box-border items-center justify-center flex flex-3 flex-col bg-black">
      <VideoCarousel25D items={items} />
    </div>
  );
};
