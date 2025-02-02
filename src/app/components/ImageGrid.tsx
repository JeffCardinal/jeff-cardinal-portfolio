'use client'
import { useState, useEffect } from "react";

const ImageGrid = () => {
    const imageNames = [
      "manapool.jpg", "systemdelight.jpg", "polychromaticcompiler.jpg", "acidarcadia.jpg",
      "hexa.jpg", "octa.jpg", "opentournament27XX.jpg", "cannon.jpg",
      "saccharinesynergy.jpg", "radiantracer.jpg", "transcendentallove.jpg", "eternity.jpg",
      "aberrations.jpg", "anopenandfreeinternet.jpg", "greatesthits.jpg", "illumina.jpg",
    ];
  
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (selectedIndex !== null) {
            setIsVisible(true);
        }
    }, [selectedIndex]);

    useEffect(() => {
        setTimeout(() => {
          const observableElements = document.querySelectorAll('.observable');
    
          const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.target.classList.contains('observable')) {
                  entry.target.classList.toggle('animate-loadIn', entry.isIntersecting);
                }
                if (entry.isIntersecting) {
                  observer.unobserve(entry.target);
                  entry.target.classList.remove('opacity-0');
                  entry.target.classList.remove('observable');
                }
              })
          }, { threshold: 1 });
      
          observableElements.forEach((element) => {
            observer.observe(element);
          });
        }, 250)
      }, [open])

    const closeModal = () => {
        setIsVisible(false);
        setTimeout(() => setSelectedIndex(null), 300);
    };

    const nextImage = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => ((prev ?? 0) + 1) % imageNames.length);
        }
    };

    const prevImage = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((prev) => ((prev ?? 0) - 1 + imageNames.length) % imageNames.length);
        }
    };

    return (
    <>
        <div className="font-distancia bg-black pt-2 text-center text-4xl">Album Cover Grid</div>
        <div className="grid md:grid-cols-4 md:grid-rows-4 lg:grid-cols-4 lg:grid-rows-4 grid-cols-2 grid-rows-8 gap-[5px] p-[5px] lg:px-[300px] bg-black">
            {imageNames.map((name, index) => (
            <div key={index} className="w-full h-full bg-black flex items-center justify-center cursor-pointer"
                onClick={() => setSelectedIndex(index)}
            >
                <img 
                    src={`/images/album-covers/${name}`} 
                    alt={`Image ${index + 1}`} 
                    className="w-full h-full object-cover observable loadIn opacity-0"
                />
            </div>
            ))}
        </div>

        {selectedIndex !== null && (
            <div 
                className={`fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-40 
                    transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
                onClick={closeModal}
            >
                <button 
                    onClick={(e) => { e.stopPropagation(); prevImage(); }} 
                    className="z-50 mx-4 text-white text-5xl p-2"
                >
                    <div className="justify-left outline outline-white hover:outline-rose-500 transition-all duration-300 outline-[5px] p-2 rounded-full hover:fill-rose-500 fill-white">
                        <svg
                            className=""
                            id="a" 
                            data-name="Nav Arrow Prev" 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="25" 
                            height="25" 
                            viewBox="0 0 100 100">
                            <polygon points="80 0 50 0 0 50 50 100 80 100 30 50 80 0"/>
                        </svg>
                    </div>
                </button>

                <img 
                    src={`/images/album-covers/${imageNames[selectedIndex]}`} 
                    alt="Full Size" 
                    className="max-w-full max-h-full shadow-lg"
                />

                <button 
                    onClick={(e) => { e.stopPropagation(); nextImage(); }} 
                    className="z-50 mx-4 text-white text-5xl p-2"
                >
                    <div className="justify-left outline outline-white hover:outline-rose-500 transition-all duration-300 outline-[5px] p-2 rounded-full -rotate-180 hover:fill-rose-500 fill-white">
                        <svg
                            className=""
                            id="a" 
                            data-name="Nav Arrow Next" 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="25" 
                            height="25" 
                            viewBox="0 0 100 100">
                            <polygon points="80 0 50 0 0 50 50 100 80 100 30 50 80 0"/>
                        </svg>
                    </div>
                </button>
            </div>
        )}
    </>
    );
};

export default ImageGrid;
