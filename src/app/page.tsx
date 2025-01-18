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
import _3JS from './components/_3JS'
import Footer from './components/Footer';
import FeatureDouble from './components/FeatureDouble';
import FeatureFont from './components/FeatureFont';

export default function Page() {
  return (
    <div className="bg-white">

      <Splash bgColor={'bg-sky-400'}>
        <_3JS/>
        {/* <div className="z-10 max-w-screen text-white">
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
        /> */}
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
            imageName="plus100logo.png"
            imageHoverName="plus100logo.png"
            bgColor="bg-white"
            textColor="text-black"
          >
            <div className="pt-2"><Link href="https://plus100.bandcamp.com/"><button className="pt-[2px] pr-4 pl-4 mr-4 outline outline-rose-500 text-rose-500 bg-white hover:text-white hover:bg-rose-500 rounded-full transition duration-300 font-distancia text-2xl">To Bandcamp</button></Link></div>
          </Feature>

          <Feature
            title="DR. GABBA Flyer"
            description="Flyer advertisement for Chicago techno party."
            inspiration="Liquid chrome entangles an iconic 90s acid smiley in Y2K fashion. Custom goop font for DR. GABBA."
            tools="Cinema 4D, Illustrator, Photoshop"
            imageName="drgabbaflyer.png"
            imageHoverName="drgabbaflyer.png"
            bgColor="bg-black"
            textColor="text-lime-400"
          >
            {undefined}
          </Feature>

          <Feature
            title="Mana Pool Album Cover"
            description="Album cover for my debut album, Mana Pool."
            inspiration="Minimalistic aquatic ambiance."
            tools="Illustrator, Photoshop"
            imageName="manapool.png"
            imageHoverName="manapool.png"
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
            imageName="htmhell-pink.png"
            imageHoverName="htmhell-sage.png"
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
            textColor='text-lime-400'
          >
          </CodeFeature>
        </Breaker>

        <Breaker 
          title={"[UI/UX]"}
          bgColor={"bg-teal-400"}
        >
          <FeatureFont
            title="GPU Booking (2024)"
            description="Lightweight UI component for booking GPUs. Hover to open."
            inspiration=""
            tools="React, Tailwind"
            imageName="ui-projects/gpu.jpg"
            imageHoverName="ui-projects/gpu-2.jpg"
            bgColor="bg-black"
            textColor="text-white"
            font={'w-full block text-3xl lg:text-4xl font-distancia'}
            isTitleVerticallyCentered={false}>
          {undefined}
          </FeatureFont>
          <FeatureFont
            title="RetRoh! (2017)"
            description="A cute retrospective board for reflecting on your Agile projects after each sprint. Hover for login page."
            inspiration=""
            tools="React, Spring Boot, PostgreSQL"
            imageName="ui-projects/retroh-board.jpg"
            imageHoverName="ui-projects/retroh-login.jpg"
            bgColor="bg-white"
            textColor="text-black"
            font={'w-full block text-3xl lg:text-4xl font-distancia'}
            isTitleVerticallyCentered={false}>
          {undefined}
          </FeatureFont>
        </Breaker>

        <Breaker 
          title={"[PD]"}
          bgColor={"bg-lime-400"}
        >
          <UnderConstruction textColor='black' bgColor='bg-black'/>
        </Breaker>

        <Breaker 
          title={"[FONTS]"}
          bgColor={"bg-yellow-300"}
        >
          <FeatureFont
            title="Goupe"
            description={`Read like "coupe". Goupe is a fun, funky flowing font for all your goopy design needs.`}
            inspiration="Modern retro font. Currently unavailable for download, but I will be releasing it officially in Q1 2025, so please stay tuned."
            tools="Procreate, Illustrator, Fontself"
            imageName="fonts/goopdemo.jpg"
            imageHoverName="fonts/goopdemo-black.jpg"
            bgColor="bg-black"
            textColor="text-white"
            font="font-goupe text-[5em] lg:text-[8em] text-lime-400"
            isTitleVerticallyCentered={false}
          >
            <div className="pt-2"><><button className="pt-[2px] pr-4 pl-4 mr-4 outline outline-white text-white bg-black hover:text-white hover:bg-black rounded-full transition duration-300 font-distancia text-2xl line-through opacity-50">Download</button></></div>
          </FeatureFont>
          
          <FeatureDouble
            alt1={'Poster'}
            alt2={'Model'}
            imageName1={'fonts/PutOnASmile.png'}
            imageHover1Name={'fonts/PutOnASmile-Crumple-ColorCorrected.png'}
            imageName2={'fonts/supersonic6-edit.png'}
            imageHover2Name={'fonts/supersonic6-edit-intense.png'}
            bgColor={'bg-black'}
            textColor={''}
          />
        </Breaker>
        
        <Footer textColor={'text-black'} bgColor={'bg-white'}/>
      </Container>
    </div>
  );
}
