import React from 'react';
import Header from '../components/Header';
import Splash from '../components/Splash'
import Image from 'next/image'
import Link from 'next/link';

export default function Page() {
    return ( 
      <div className="bg-white">
        <Splash bgColor={'bg-white'}>
        <div>
          <div className="z-10">
            <div className="text-2xl md:text-4xl lg:text-7xl font-distancia px-4 bg-transparent text-black">
              PLUS100 Branding
            </div>
            <div className="justify-start items-start">
              <span className="text-2xl font-distancia text-black pr-4">⮑</span>
              <button className="pt-[2px] pr-4 pl-4 mr-4 outline outline-sky-400 text-sky-400 rounded-full transition duration-[300ms] font-distancia text-md">
                  GFX
              </button>
              <button className="pt-[2px] pr-4 pl-4 mr-4 outline outline-sky-400 text-sky-400 rounded-full transition duration-[300ms] font-distancia text-md">
                  Web Design
              </button>
            </div>  
          </div>
          <div className="flex sm:flex-row flex-wrap md:justify-center sm:justify-center">
            <div className="place-content-center lg:w-[500px] md:w-[500px] sm:w-[300px] px-8 pt-8">
              <Image
                  className="rounded-full shadow-2xl outline outline-white outline-1"
                  src={`/images/plus100logo.png`}
                  alt='' 
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                  objectFit='contain'
                />
            </div>
            <div className="text-black w-[500px] text-left justify-center items-center align-middle p-8">
              This is my label! This part is under construction, so please check back for more updates.
            </div>
          </div>
        </div>
        </Splash>
      </div>
    )
}



