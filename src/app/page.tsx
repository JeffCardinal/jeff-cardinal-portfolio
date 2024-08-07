import React from 'react';
import Marquee from "react-fast-marquee";
import Link from 'next/link';

import Feature from './components/Feature'
import CodeFeature from './components/CodeFeature'
import VideoFeature from './components/VideoFeature'
import Container from './components/Container'
import Breaker from './components/Breaker'
import Scroller from './components/Scroller'
import Splash from './components/Splash'
import Image from 'next/image'
import UnderConstruction from './components/UnderConstruction'

export default function Page() {
  return (
    <div className="bg-white">

      <Splash bgColor={'bg-sky-400'}>
        <div className="z-10 max-w-screen">
          <div className='flex flex-col items-center text-center'>
            <Image
              className="flex flex-1 lg:hidden md:hidden items-center text-center"
              src={`/images/jclogo-shiny-2.png`}
              alt=''
              width="400"
              height="0"
            />
          </div>
          <div className="text-4xl">Hey, my name is</div>
          <div className="
            font-distancia pt-2 bg-transparent
            text-4xl
            lg:text-7xl
          ">
            Jeff Cardinal
          </div>
          <div className="text-4xl">I'm a programmer, designer, and musician.</div>
          <div className="mt-4">I have a <span className="italic">vision</span> for the <span className="italic">future.</span> Here's some glimpses inside.</div>
        </div>
          <Image
            className="absolute left-16 z-0 max-md:hidden"
            src={`/images/jclogo-shiny-2.png`}
            alt=''
            width="400"
            height="0"
          />
      </Splash>
      
      <Container>
        <Marquee
          pauseOnHover={true}
          speed={100}
          className="border-t-2 border-b-2 border-black"
        >
          <Scroller title="FEATURES ✦"/>
          <Scroller title="FEATURES ✦"/>
          <Scroller title="CLICK SOMETHIN' WILL YA? ✦"/>
          <Scroller title="FEATURES ✦"/>
          <Scroller title="FEATURES ✦"/>
        </Marquee>

        <Breaker
          title="[GFX]"
          bgColor="bg-orange-400"
        >
          <Feature
            title="PLUS100 Branding"
            description="Branding for my record company, PLUS100 Records. Shown here is the logo. Click the button below to learn more."
            inspiration="Minimalism and kawaii Japanese emoji."
            tools="Illustrator, Photoshop"
            imageName="plus100logo"
            imageHoverName="plus100logo"
            bgColor="bg-white"
            textColor="text-black"
          >
            <div className="pt-2"><Link href="/case-plus100"><button className="pt-[2px] pr-4 pl-4 mr-4 outline outline-rose-500 text-rose-500 bg-white hover:text-white hover:bg-rose-500 rounded-full transition duration-300 font-distancia text-2xl">Case Study</button></Link></div>
          </Feature>

          <Feature
            title="DR. GABBA Flyer"
            description="Flyer advertisement for Chicago techno party."
            inspiration="Liquid chrome entangles an iconic 90s acid smiley in Y2K fashion. Custom goop font for DR. GABBA."
            tools="Cinema 4D, Illustrator, Photoshop"
            imageName="drgabbaflyer"
            imageHoverName="drgabbaflyer"
            bgColor="bg-black"
            textColor="text-lime-500"
          >
            {undefined}
          </Feature>

          <Feature
            title="Mana Pool Album Cover"
            description="Album cover for my debut album, Mana Pool."
            inspiration="Minimalistic aquatic ambiance."
            tools="Illustrator, Photoshop"
            imageName="manapool"
            imageHoverName="manapool"
            bgColor="bg-sky-400"
            textColor="text-white"
          >
            {undefined}
          </Feature>

          <Feature
            title="HTMHELL Logo"
            description="Logo design for a band. It's mirrored on the y-axis, try to read it. Hover for a surprise."
            inspiration="Metalcore logo."
            tools="Illustrator, Photoshop"
            imageName="htmhell-pink"
            imageHoverName="htmhell-sage"
            bgColor="bg-black"
            textColor="text-[#ff00aa]"
          >
            {undefined}
          </Feature>
        </Breaker>

        <Breaker 
          title={"[VFX]"}
          bgColor={"bg-rose-400"}
        >
          <VideoFeature/>
        </Breaker>

        <Breaker 
          title={"[PHOTO]"}
          bgColor={"bg-purple-400"}
        >
          <UnderConstruction textColor='black' bgColor='bg-black'/>
        </Breaker>

        <Breaker 
          title={"[CODE]"}
          bgColor={"bg-sky-400"}
        >
          <CodeFeature
            title='GOJIRA - SYNTH OSC'
            bgColor='bg-black'
            textColor='text-lime-500'
          >
          </CodeFeature>
        </Breaker>

        <Breaker 
          title={"[UI/UX]"}
          bgColor={"bg-teal-400"}
        >
          <UnderConstruction textColor='black' bgColor='bg-black'/>
        </Breaker>

        <Breaker 
          title={"[PD]"}
          bgColor={"bg-lime-400"}
        >
          <UnderConstruction textColor='black' bgColor='bg-black'/>
        </Breaker>
        
        <div className="
          flex flex-3
          flex-col-reverse
          lg:flex-row
          justify-left items-center
        ">
          <Image
            className="p-8"
            alt='Chrome JC Logo'
            src='/images/jclogo-shiny-3.png'
            width="400" 
            height="0"
          />
          <div className='flex grow pt-8 min-w-[300px] justify-center text-center'>
            <div className="text-2xl text-black flex-auto">
            <div className="font-distancia text-2xl">Nav</div>
              <Link href='/'>Home</Link><br></br>
              <Link href='/about'>About</Link><br></br>
              <Link href='/resume'>Resume</Link><br></br>
            </div>
          </div>
          <div className='flex grow pt-8 min-w-[300px] justify-center text-center'>
            <div className="text-2xl text-black flex-auto">
            <div className="font-distancia text-2xl">Social</div>
              <Link href='https://www.instagram.com/vaperror'>IG</Link><br></br>
              <Link href='https://www.x.com/vaperror'>X</Link><br></br>
              <Link href='https://www.linkedin.com/in/jeffjcardinal'>LinkedIn</Link><br></br>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
