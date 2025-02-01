'use client'

import Link from 'next/link';
import React, { Component, ReactNode, useState } from 'react';

export default function Button ({
    text,
    link,
    textColor,
    hoverTextColor,
    bgColor,
    hoverBgColor,
    outlineColor,
    hoverOutlineColor,
    optional,
    hoverGlyph,
    hoverable,
} : {
    text: string,
    link: string,
    textColor: string,
    hoverTextColor: string,
    bgColor: string,
    hoverBgColor: string,
    outlineColor: string,
    hoverOutlineColor: string,
    optional: string,
    hoverGlyph: ReactNode,
    hoverable: boolean, // Denotes animation glyph, consider refactoring
}) {
    const [hovering, setHovering] = useState(true);
    return (
        <Link href={link}>
            <button 
                onMouseEnter={() => setHovering(false)}
                onMouseLeave={() => setHovering(true)}
                className={`
                    pt-[2px] px-4 mx-4 outline outline-[5px] rounded-full text-2xl
                    transition-all duration-300 ease-in-out font-distancia text-md
                    ${outlineColor}
                    ${hoverOutlineColor}
                    ${bgColor}
                    ${hoverBgColor}
                    ${textColor}
                    ${hoverTextColor}
                    ${optional}
            `}>
                {
                hoverable ?
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
