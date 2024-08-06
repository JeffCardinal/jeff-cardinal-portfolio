import React from 'react';
import Header from '../components/Header';
import Splash from '../components/Splash'
import Image from 'next/image'
import Link from 'next/link';

export default function Page() {
    return ( 
      <div className="bg-white">
        <Header>
          <Link href="/">     <button className="pt-[2px] pr-4 pl-4 mr-4 outline outline-white hover:text-sky-400 hover:bg-white text-white rounded-full transition duration-300ms font-distancia text-md">Home</button></Link>
          <Link href="/about"><button className="pt-[2px] pr-4 pl-4 mr-4 outline outline-white hover:text-sky-400 hover:bg-white text-white rounded-full transition duration-300ms font-distancia text-md">About</button></Link>
          <button className="pt-[2px] pr-4 pl-4 mr-0 outline outline-white hover:text-sky-400 hover:bg-white text-white rounded-full transition duration-300ms font-distancia text-md">Resume</button>
        </Header>
        <Splash bgColor={'bg-white'}>
        <div>
          <div className="z-10">
          <div className="text-7xl font-distancia p-8 pt-0 pb-0 bg-transparent text-black">
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
          <Image
              className="rounded-full shadow-2xl outline outline-white outline-1"
              src={`/images/plus100logo.png`}
              alt='' 
              width="500"
              height="500"
          />
        </div>
        </Splash>
      </div>
    )
}