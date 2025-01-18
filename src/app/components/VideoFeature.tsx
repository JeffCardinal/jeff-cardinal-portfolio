'use client'
import React, { lazy, Suspense } from 'react';
import VideoFallback from './VideoFallback';
const Video = lazy(() => import('./Video'));

export default function VideoFeature() {
  return (
      <div className="box-border lg:p-8 items-center justify-center flex flex-3 flex-col lg:flex-row bg-black">
        <Suspense fallback={<VideoFallback/>}>
          <Video 
          videoUrl="/videos-optimized/ditb-reel.mp4"
          title={"xJermsx - Drugs in the Bathroom [DJ CAMGIRL Remix]"}
          description={""} caseStudyUrl={""} />
            {/* Remix promotional reel. Smiley pressed pill rendered in Cinema 4D and imported to Adobe AE. Custom glitch effect. */}
        </Suspense>
        <Suspense fallback={<VideoFallback/>}>
          <Video 
          videoUrl="/videos-optimized/funk-forever-reel.mp4"
          title={"Funk Forever Party"}
          description={""} caseStudyUrl={""} />
            {/* Future Funk party promotion reel. */}
        </Suspense>
        <Suspense fallback={<VideoFallback/>}>
        <Video 
        videoUrl="/videos-optimized/sega-dreamland-reel.mp4"
        title={"VAPERROR - Sega Dreamland Reel"}
        description={""} caseStudyUrl={""} />
          {/* 10 year anniversary commemorative reel based on the original single cover posted on SoundCloud. */}
        </Suspense>
        <Suspense fallback={<VideoFallback/>}>
          <Video 
          videoUrl="/videos-optimized/tribal-heart-reel.mp4"
          title={"Tribal Diamond Heart"}
          description={""} caseStudyUrl={"./case-tribal-heart"} />
        </Suspense>
        <Suspense fallback={<VideoFallback/>}>
          <Video 
          videoUrl="/videos-optimized/metalheartreel1.mp4"
          title={"DJ CAMGIRL - Aberrations"}
          description={""} caseStudyUrl={""} />
            {/* Promotional reel. Metalheart created in Blender. */}
        </Suspense>
      </div>
  );
};
