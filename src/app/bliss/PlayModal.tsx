import Marquee from "react-fast-marquee";
import { useEffect, useRef, useState } from "react";
import { usePlayback } from "./PlaybackContext";
import SparkleSvg from "../svg/SparkleSvg";

const bpm = 155;
export default function PlayModal() {
    const [showPlayNowModal, setShowPlayNowModal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const { audioRef } = usePlayback();
    const { pause } = usePlayback();
    const prevBeatRef = useRef(0);
    const triggeredRef = useRef(false);

    const handleOpen = () => {
        setShowPlayNowModal(true);
        setTimeout(() => setIsVisible(true), 10);
    };

    const handleClose = () => {
        setIsVisible(false);
        setIsFadingOut(true);
        setTimeout(() => {
            setShowPlayNowModal(false);
            setIsFadingOut(false);
        }, 200);
    };

    useEffect(() => {
        const checkBeat = () => {
            const currentTime = audioRef.current?.currentTime ?? 0;
            const beat = currentTime * (bpm / 60);
        
            if (!triggeredRef.current && beat < prevBeatRef.current) {
                handleOpen();
                triggeredRef.current = true;
            }
        
            prevBeatRef.current = beat;
            requestAnimationFrame(checkBeat);
        };
        
        requestAnimationFrame(checkBeat);
    }, []);

    return (
        <>
            {showPlayNowModal && (
                <div
                    className={`fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm transition-opacity duration-500
                        ${isVisible && !isFadingOut ? 'opacity-100 bg-black/70' : 'opacity-0 bg-black/0'}`}
                    onClick={handleClose}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`bg-white rounded-xl text-center shadow-xl max-w-sm m-8 relative pointer-events-auto transform transition-opacity duration-500 my-8
                            ${isVisible && !isFadingOut ? 'opacity-100' : 'opacity-0'}
                            min-h-[400px] max-h-[90vh] w-full overflow-y-auto`}
                    >
                        <button
                            onClick={handleClose}
                            className="sticky top-2 right-4 left-full transform -translate-x-full z-10 text-black hover:text-gray-600 text-xl"
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <div className="p-8 overflow-x-hidden">

                            <h2 className="text-xl font-semibold mb-4 text-black text-pretty -mt-4">Ya like that? Stream now!</h2>

                            <div className="flex flex-col items-center">
                                <img
                                    src="bliss/Bliss-Digital-500px.jpg"
                                    alt="Bliss Album Cover"
                                    className="w-full max-w-[500px] mx-4 rounded-lg"
                                />
                                    <Marquee 
                                        speed={40} 
                                        className="my-6"
                                        gradient={true}
                                        gradientWidth={"40px"}
                                    >
                                        <div className="text-sm text-gray-700 inline-flex items-center">
                                            Dreaming Diary, VAPERROR – Bliss
                                            <div className="px-2"><SparkleSvg color="black" dim="12px"/></div>
                                            Dreaming Diary, VAPERROR – Bliss
                                            <div className="px-2"><SparkleSvg color="black" dim="12px"/></div>
                                        </div>
                                    </Marquee>
                            </div>

                            <button
                                onClick={() => {
                                    window.open('https://open.spotify.com/track/60LsGDYCP5q5fpKCLHeQSz?si=1e486a463f024068', '_blank');
                                    pause();
                                }}
                                className="bg-[#1DB954] text-white px-4 py-2 hover:bg-gray-800 transition rounded-full min-w-[200px]"
                            >
                                Play On Spotify
                            </button>
                            
                            <button
                                onClick={() => {
                                    window.open('https://music.apple.com/tr/album/bliss-single/1817013666', '_blank');
                                    pause();
                                }}
                                className="bg-[#FA2D48] text-white px-4 py-2 mt-4 hover:bg-gray-800 transition rounded-full min-w-[200px]"
                            >
                                Play On Apple Music
                            </button>
                            <button
                                onClick={() => {
                                    window.open('https://link.deezer.com/s/30goH34HBFO5SEht8b0iy', '_blank');
                                    pause();
                                }}
                                className="bg-[#7f00ff] text-white px-4 py-2 mt-4 hover:bg-gray-800 transition rounded-full min-w-[200px]"
                            >
                                Play On Deezer
                            </button>
                            <button
                                onClick={() => {
                                    window.open('https://www.youtube.com/watch?v=WycN5FXmI-I', '_blank');
                                    pause();
                                }}
                                className="bg-[#FF0000] text-white px-4 py-2 mt-4 hover:bg-gray-800 transition rounded-full min-w-[200px]"
                            >
                                Play On YouTube
                            </button>
                        </div>
                        <div className="sticky bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent pointer-events-none -mt-8" />
                    </div>
                </div>
            )}
        </>
    );
}