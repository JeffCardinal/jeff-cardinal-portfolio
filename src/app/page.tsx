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
import UnderConstruction from './components/UnderConstruction'
import _3JS from './components/_3JS'
import Footer from './components/Footer';
import FeatureDouble from './components/FeatureDouble';
import FeatureFont from './components/FeatureFont';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Button from './components/Button';
import ArrowNav from './components/arrow-nav';
import ImageGrid from './components/ImageGrid';

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
          className="border-t-[5px] border-b-[5px] border-black"
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
            title="Floating in the Breeze"
            description="Remix single cover for Heaven Sample - Floating in the Breeze [VAPERROR Remix]. Hover for the original cover."
            inspiration="Y2K chrometype (remix) and 70s psychedelia (original)."
            tools="Blender, Illustrator, Photoshop, Procreate"
            imageName="FloatingInTheBreeze-Remix-1080.jpg"
            imageHoverName="FloatingInTheBreeze-Original-1080.jpg"
            bgColor="bg-sky-400"
            textColor="text-white"
            >
            <Button 
              text={'Stream'} 
              link={'https://open.spotify.com/track/1apyw8zRVvzi8nSe3Ipsdk?si=affc3e2daa0346eb'} 
              textColor={'text-white'} 
              hoverTextColor={'hover:text-black'} 
              bgColor={''} 
              hoverBgColor={'hover:bg-white'} 
              outlineColor={'outline-white'} 
              hoverOutlineColor={'hover:outline-black'} 
              optional={'ml-0 mt-2'} 
              hoverGlyph={<ArrowNav color={'#000000'}/>}
              hoverable={true}
            />
            </Feature>
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
            {/* <div className="pt-2">
              <Link href="https://plus100.bandcamp.com/">
                <button className="pt-[2px] pr-4 pl-4 mr-4 outline outline-[5px] 
                outline-rose-500 text-rose-500 bg-white hover:text-white hover:bg-rose-500 
                rounded-full transition duration-300 font-distancia text-2xl">
                  Visit
                </button>
              </Link>
            </div> */}

            <Button 
              text={'Visit Site'} 
              link={'https://plus100.bandcamp.com/'} 
              textColor={'text-rose-500'} 
              hoverTextColor={'hover:text-white'} 
              bgColor={'bg-white'} 
              hoverBgColor={'hover:bg-rose-500'} 
              outlineColor={'outline-rose-500'} 
              hoverOutlineColor={'hover:outline-rose-500'} 
              optional={'ml-0 mt-2'} 
              hoverGlyph={<ArrowNav color={"#FFFFFF"}/>}
              hoverable={true}
            />

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
          <ImageGrid/>
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
          />
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
            <div className="pt-2 invisible lg:visible">
              <Link href="https://sf-compute-takehome.vercel.app/" target="_blank">
                <button className="pt-[2px] px-4 mr-4 outline outline-[5px] outline-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white hover:outline-indigo-500 rounded-full transition duration-300 font-distancia text-2xl">
                  Demo
                </button>
              </Link>
            </div>
          </FeatureFont>
          <FeatureFont
            title="Social Portal (2019)"
            description={`Here's a "hero" screen for a social portal I designed in 2019. In 2025, I ported the site to use Vite. It animates, so be sure to check the demo.`}
            inspiration=""
            tools="React, Vite, CSS3 Animations"
            imageName="ui-projects/jeffcardinal-2019.jpg"
            imageHoverName="ui-projects/jeffcardinal-2019.jpg"
            bgColor="bg-sky-500"
            textColor="text-white"
            font={'w-full block text-3xl lg:text-4xl font-distancia'}
            isTitleVerticallyCentered={false}>
            <div className="pt-2 flex flex-row align-middle">
              <Link href="https://jeff-cardinal-website.vercel.app/" target="_blank" className="hidden lg:flex">
                <button className="pt-[2px] px-4 mr-4 outline outline-[5px] outline-white text-white hover:bg-white hover:text-black hover:outline-black rounded-full transition duration-300 font-distancia text-2xl">
                  Demo
                </button>
              </Link>
              <Link href="https://github.com/JeffCardinal/JeffCardinalWebsite/" target="_blank">
                <button className="outline outline-[5px] outline-white mr-4 hover:bg-white hover:text-black hover:outline-black rounded-full transition duration-300 font-distancia text-2xl flex flex-row">
                  <div className="h-6 w-6 ml-2 mt-[5px]"><FontAwesomeIcon icon={faGithub} /></div>
                  <div className="pt-[2px] pl-2 pr-4">Github</div>
                </button>
              </Link>              
            </div>
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
            <div className="pt-2"><><button className="pt-[2px] pr-4 pl-4 mr-4 outline outline-[5px] outline-white text-white bg-black hover:text-white hover:bg-black rounded-full transition duration-300 font-distancia text-2xl line-through opacity-50">Download</button></></div>
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
