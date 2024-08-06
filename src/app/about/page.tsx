import React from 'react';
import Splash from '../components/Splash'
import Image from 'next/image'

export default function Page() {
    return (
      <div className="bg-white">
        <div className={`flex min-h-screen min-w-screen bg-sky-400 text-center items-center justify-center`}>
          <div className="justify-center flex sm:flex-row flex-wrap">
            <div className="place-content-center lg:w-[500px] md:w-[300px] sm:w-[300px] px-8 pt-8">
              <Image
                className="rounded-full shadow-2xl outline outline-white outline-1"
                src={`/images/suit-square-sm.png`}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                objectFit='contain'
              />
            </div>
            <div className="justify-start text-start sm:px-2 px-8 lg:w-[500px] md:w-[300px] sm:w-[300px]">
              <div className="font-distancia text-2xl pt-8">
                Yeah, about me.
              </div>
              <div className="p-6">
                I spent my time in college studying Computer Science at the University of Georgia and running a record label, PLUS100 Records.
                <div className="pt-4">As a musician, I've played shows and festivals in destinations all over the world, like Japan and Australia.</div>
                <div className="pt-4">I've worked as a Software Engineer and SEII for The Home Depot and Greenlight Financial Technologies respectively.</div>
                <div className="pt-4">I spend my life in my creative pursuits and technical endeavors, bettering myself and those around me as best as I can.</div>
                <div className="pt-4">Wanna work together? Contact me.</div>
              </div>
            </div>
          </div>
      </div>
      </div>
    )
}
