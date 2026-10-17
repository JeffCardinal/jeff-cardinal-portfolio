export default function Video(
  {
    videoUrl,
    title,
    description,
    className = "",
    videoClassName = "",
  }: {
    videoUrl: string;
    title: string;
    description: string;
    className?: string;
    videoClassName?: string;
  }
) {
  return (
    <div className={`relative group overflow-hidden select-none h-fit ${className}`}>
        <div
          className="relative z-10"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
        >
          <video 
            playsInline 
            autoPlay
            loop 
            muted 
            className={`block w-full h-auto select-none ${videoClassName}`}
          >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
          </video>
        </div>
        {/* <div className="p-8 overflow-y-scroll absolute bottom-0 left-0 w-full h-1/3 bg-black bg-opacity-100 text-white flex flex-col items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="font-bold">{title}</div>
            <div>{description}</div>
        </div> */}
    </div>
  );
};
