'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./Button";
import ArrowNav from "./arrow-nav";
import Marquee from "react-fast-marquee";

const ImageGrid = () => {
    const imageNames = [
      ["VAPERROR - Mana Pool", "manapool.jpg", "https://open.spotify.com/album/3bldb8xoLHFaGtN9oyMcz2?si=YveFgiQ9R2aDEw2vy-90Jw"],
      ["VAPERROR - System Delight", "systemdelight.jpg", "https://open.spotify.com/album/4r6aL3O9TzlAYj82eX2Cfc?si=l-vTV46RRue8zBZfkU2BYg"],
      ["VAPERROR - POLYCHROMATIC COMPILER", "polychromaticcompiler.jpg", "https://open.spotify.com/album/2M8pvG76vhhhyxyPncLsE7?si=AQ_htK9wTPGyWn98nMUDLg"],
      ["VAPERROR - Acid Arcadia", "acidarcadia.jpg", "https://open.spotify.com/album/2i2pvD6EXQuUDzvuIMi9e9?si=AmdH5SjUROCwJjyhyGLMSA"],
      ["Useless - Hexa", "hexa.jpg", "https://open.spotify.com/album/3FMRDiZ2nYFtGQnhf39DJj?si=8hF8KlaUTaOrkVN4GbS7fQ"],
      ["Useless - Octa", "octa.jpg", "https://open.spotify.com/album/3Z0Ts6JjAwNp7JTuhrzpt8?si=GM1uX1kmQKOmI-yFaZHUbg"],
      ["SPORTSGIRL - Open Tournament 27XX", "opentournament27XX.jpg", "https://open.spotify.com/album/7gQLcsp14u3EWidqUMe5u3?si=fxUEHCYPTWa0fF_2zXBd4A"],
      ["DJ CAMGIRL - CANNON", "cannon.jpg", "https://open.spotify.com/album/1lvtaZdfxD1N03BCcpcdPf?si=lKAlsawFSCm7L4tZ64YtKw"],
      ["VAPERROR - Saccharine Synergy", "saccharinesynergy.jpg", "https://open.spotify.com/album/02mcd3k8qPGckCbzUsXGQE?si=ZS9TvV-dQ1OkZEZO53boKA"],
      ["VAPERROR - Radiant Racer", "radiantracer.jpg", "https://open.spotify.com/album/6sd3fUISA9C59vwwoks3rQ?si=2Vo3qGRqQ4-or1EZ4JyRug"],
      ["テレヴァペ - 超越愛", "transcendentallove.jpg", "https://open.spotify.com/album/3zZTqcWQ0DjhUbUlIIc9sL?si=jNFXj88NTrSrO-FxAE86ig"],
      ["テレヴァペ - 永", "eternity.jpg", "https://open.spotify.com/album/1b7ZGSZp9UIr8g2I1SdnR4?si=DG_ox0Z5QMC3nTAthrxhyg"],
      ["DJ CAMGIRL - Aberrations", "aberrations.jpg", "https://open.spotify.com/album/05j1Ia81yVg2Vwt75NOuTA?si=zwPFLTqoSPeUTIQ7Zz6sVQ"],
      ["NET DEATH - An Open and Free Internet", "anopenandfreeinternet.jpg", "https://open.spotify.com/album/2aeKwieB19vohMWu2M6JjF?si=h1HOGpIUQdOeQv93zQdy0A"],
      ["VAPERROR - Greatest Hits Vol. 1", "greatesthits.jpg", "https://open.spotify.com/album/2vjM3iCQvJIdu7sDrt7KUy?si=nnEd1YbLQlWiuKPTWRmSSA"],
      ["VAPERROR - Illumina", "illumina.jpg", "https://open.spotify.com/album/2FlCwxCda5CSOrz5DMPau1?si=EheCdLkUROK0FrPfv-2oxA"],
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
        <div className="grid md:grid-cols-4 md:grid-rows-4 lg:grid-cols-4 lg:grid-rows-4 grid-cols-2 grid-rows-8 bg-black">
            {imageNames.map((name, index) => (
            <div key={index} className="w-full h-full bg-black flex items-center justify-center cursor-pointer"
                onClick={() => setSelectedIndex(index)}
            >
                <img 
                    src={`/images/album-covers/${name[1]}`} 
                    alt={`${name[1]} album cover`}
                    className="w-full h-full object-cover observable loadIn opacity-0"
                />
            </div>
            ))}
        </div>

        {selectedIndex !== null && (
            <div 
                className={`fixed inset-0 bg-black bg-opacity-90 flex items-center h-full justify-center p-4 z-40 
                    transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
                onClick={closeModal}
            >
                <div className="flex flex-col justify-center items-center text-center">
                    <div className="flex">
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            aria-label="Previous"
                            className="
                                grow-0 flex-none
                                hidden md:inline-flex
                                justify-center items-center
                                aspect-square w-10
                                justify-self-end self-center
                                mr-4 z-50 rounded-full
                                outline outline-white outline-[5px]
                                transition-all duration-300
                                group hover:outline-rose-500
                            "
                        >
                            <div className="justify-right outline outline-white hover:outline-rose-500 transition-all duration-300 outline-[5px] p-2 rounded-full hover:fill-rose-500 fill-white">
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
                        <img
                            src={`/images/album-covers/${imageNames[selectedIndex][1]}`}
                            alt={`${imageNames[selectedIndex][1]} album cover`}
                            className="shadow-lg object-contain grow max-h-[85vh]"
                        />
                        <button 
                            onClick={(e) => { e.stopPropagation(); nextImage(); }} 
                            aria-label="Next"
                            className="
                                grow-0 flex-none
                                hidden md:inline-flex
                                justify-center items-center
                                aspect-square w-10
                                justify-self-start self-center
                                ml-4 z-50 rounded-full
                                outline outline-white outline-[5px]
                                transition-all duration-300
                                group hover:outline-rose-500
                            "
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
                    
                    <div className="font-distancia flex flex-col items-center justify-center text-center transition-all duration-300">
                        <span className="mt-[2px] font-bold">{imageNames[selectedIndex][0]}</span>
                        <a
                            href={imageNames[selectedIndex][2]}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex w-fit border-[4px] rounded-full px-3 pt-[2px] hover:text-rose-500 hover:border-rose-500"
                        >
                            STREAM
                        </a>
                    </div>

                    {/* <Button 
                        text="Stream"
                        link={imageNames[selectedIndex][2]}
                        textColor="text-white"
                        hoverTextColor="hover:text-rose-500"
                        bgColor=""
                        hoverBgColor="hover:bg-white"
                        borderColor="border-white"
                        hoverBorderColor="hover:border-rose-500"
                        optional=""
                        hoverGlyph={<ArrowNav color="oklch(64.5% 0.246 16.439)" />}
                        hoverable
                    /> */}
                </div>
            </div>
        )}
    </>
    );
};

export default ImageGrid;
