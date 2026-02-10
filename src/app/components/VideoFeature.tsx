import React from 'react';
import VideoCarousel25D from './VideoCarousel25D';

export default function VideoFeature() {
  const items = [
    {
      videoUrl: "/videos-optimized/qhd/windows-angel-reel-qhd.mp4",
      title: "Dreaming Diary - Windows Angel Reel",
      description: "",
      caseStudyUrl: "",
    },
    {
      videoUrl: "/videos-optimized/qhd/sega-dreamland-reel-qhd.mp4",
      title: "VAPERROR - Sega Dreamland Reel",
      description: "",
      caseStudyUrl: "",
    },
    {
      videoUrl: "/videos-optimized/qhd/funk-forever-reel-qhd.mp4",
      title: "Funk Forever Party",
      description: "",
      caseStudyUrl: "",
    },
    {
      videoUrl: "/videos-optimized/qhd/rupee-spin-qhd.mp4",
      title: "Electric Mallet - Whirlwind",
      description: "",
      caseStudyUrl: "",
    },
    {
      videoUrl: "/videos-optimized/qhd/tribal-heart-reel-qhd.mp4",
      title: "Tribal Diamond Heart",
      description: "",
      caseStudyUrl: "./case-tribal-heart",
    },
    {
      videoUrl: "/videos-optimized/qhd/fitb-remix-reel-qhd.mp4",
      title: "Heaven Sample Floating in the Breeze (VAPERROR REMIX) Reel",
      description: "",
      caseStudyUrl: "",
    },
    {
      videoUrl: "/videos-optimized/qhd/tribal-fisheye-heart-reel-qhd.mp4",
      title: "VAPERROR - Fatal Angels 「死の天使」 Reel",
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
