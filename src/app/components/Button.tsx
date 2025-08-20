'use client'

import Link from 'next/link';
import React, { Component, ReactNode, useEffect, useState } from 'react';

export default function Button ({
    text,
    link,
    textColor,
    hoverTextColor,
    bgColor,
    hoverBgColor,
    borderColor,
    hoverBorderColor,
    optional,
    hoverGlyph,
    hoverable,
    styling,
    shadow,
} : {
    text: string,
    link: string,
    textColor: string,
    hoverTextColor: string,
    bgColor: string,
    hoverBgColor: string,
    borderColor: string,
    hoverBorderColor: string,
    optional: string,
    hoverGlyph?: ReactNode,
    hoverable: boolean, // Denotes animation glyph, consider refactoring
    styling?: string,
    shadow?: string,
}) {
    const [hovering, setHovering] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 640);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    return (
        <Link href={link} target="_blank">
            <button
                onMouseEnter={() => setHovering(false)}
                onMouseLeave={() => setHovering(true)}
                className={`
                    pt-1 px-4 border-[6px] rounded-full text-2xl
                    transition-all duration-300 ease-in-out font-distancia text-md
                    ${shadow}
                    ${styling}
                    ${borderColor}
                    ${hoverBorderColor}
                    ${bgColor}
                    ${hoverBgColor}
                    ${textColor}
                    ${hoverTextColor}
                    ${optional}
            `}>
                {
                hoverable && !isSmallScreen ?
                    (
                        <span className="flex items-center">
                            <span>{text}</span> 
                            <span 
                                className={`inline-block transition-all duration-300 ease-in-out text-center
                                    ${!hovering ? 'opacity-100 -translate-x-0 ml-0' : 'opacity-0 -ml-6'}
                                `}
                            >
                                {hoverGlyph}
                            </span>
                        </span>
                    ) : (
                        <>{text}</>
                    )
                }
            </button>
        </Link>
    );
}
