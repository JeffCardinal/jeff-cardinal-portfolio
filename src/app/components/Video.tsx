import Link from 'next/link';

export default function Video(
  {
    videoUrl,
    title,
    description,
    caseStudyUrl,
    className = "",
    videoClassName = "",
    caseStudyVisible = true,
  }: {
    videoUrl: string;
    title: string;
    description: string;
    caseStudyUrl: string;
    className?: string;
    videoClassName?: string;
    caseStudyVisible?: boolean;
  }
) {
    let caseStudy;
    if (caseStudyUrl) {
      caseStudy =
        <div
          className={`px-4 pb-4 absolute bottom-0 left-0 w-full flex flex-col items-center justify-center transform translate-y-0 transition-opacity duration-300 ${
            caseStudyVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
            <Link href={caseStudyUrl}>
              <button className="px-2 sm:px-4 mr-0 pt-[2px] outline outline-[5px] outline-black hover:text-rose-500 hover:outline-rose-500 bg-white text-black rounded-full font-distancia text-sm lg:text-lg whitespace-nowrap transition-all duration-300">
                  Case Study
              </button>
            </Link>
        </div>
    }
  return (
    <div className={`relative group overflow-hidden select-none h-fit ${className}`}>
        <video playsInline autoPlay loop muted className={`block w-full h-auto select-none ${videoClassName}`}>
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
