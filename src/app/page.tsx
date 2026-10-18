'use client'

import { useState } from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import Link from "next/link";

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import gsap from "gsap";

import { Works } from "./data/Works";
import ArrowNav from "./components/ArrowNav";
import Button from "./components/Button";
import CodeFeature from "./components/features/CodeFeature";
import Container from "./components/Container";
import Drawer from "./components/Drawer";
import Feature from "./components/features/Feature";
import ImagePairGallery from "./components/features/ImagePairGallery";
import ImageGrid from "./components/ImageGrid";
import Footer from "./components/Footer";
import LogoMorph from "./components/i2k";
import Scroller from "./components/Scroller";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Splash from "./components/splash/Splash";
import SplashSVG from "./components/svg/SplashSVG";
import Three from "./components/Three";
import UnderConstruction from "./components/UnderConstruction";
import VideoFeature from "./components/video/VideoFeature";

import SparkleSvg from "./svg/SparkleSvg";

export default function Page() {

  gsap.registerPlugin(MorphSVGPlugin);

  const [openId, setOpenId] = useState<string | null>(null);

  const openDrawer = (openId: string) => {
    if (!openId) return;
    setOpenId(openId);
  };

  const scrollTo = (scrollTo: string) => {
    setTimeout(() => {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="bg-white">
      <Splash bgColor={"bg-sky-400"}>
        <Three />
      </Splash>

      <Container>
        <Marquee
          pauseOnHover={false}
          speed={100}
          className="border-t-[5px] border-b-[5px] border-black bg-yellow-300 select-none"
        >
          <Scroller pad={true}> FEATURES </Scroller>
          <Scroller pad={false}>
            {" "}<SparkleSvg color={"black"} dim={"36px"} />{" "}
          </Scroller>
          <Scroller pad={true}> FEATURES </Scroller>
          <Scroller pad={false}>
            {" "}<SparkleSvg color={"black"} dim={"36px"} />{" "}
          </Scroller>
          <Scroller pad={true}> CLICK SOMETHIN' WILL YA? </Scroller>
          <Scroller pad={false}>
            {" "}<SparkleSvg color={"black"} dim={"36px"} />{" "}
          </Scroller>
          <Scroller pad={true}> FEATURES </Scroller>
          <Scroller pad={false}>
            {" "}<SparkleSvg color={"black"} dim={"36px"} />{" "}
          </Scroller>
          <Scroller pad={true}> FEATURES </Scroller>
          <Scroller pad={false}>
            {" "}<SparkleSvg color={"black"} dim={"36px"} />{" "}
          </Scroller>
          <Scroller pad={true}> CLICK SOMETHIN' WILL YA? </Scroller>
          <Scroller pad={false}>
            {" "}<SparkleSvg color={"black"} dim={"36px"} />{" "}
          </Scroller>
          <Scroller pad={true}> FEATURES </Scroller>
          <Scroller pad={false}>
            {" "}<SparkleSvg color={"black"} dim={"36px"} />{" "}
          </Scroller>
          <Scroller pad={true}> FEATURES </Scroller>
          <Scroller pad={false}>
            {" "}<SparkleSvg color={"black"} dim={"36px"} />{" "}
          </Scroller>
          <Scroller pad={true}> CLICK SOMETHIN' WILL YA? </Scroller>
          <Scroller pad={false}>
            {" "}<SparkleSvg color={"black"} dim={"36px"} />{" "}
          </Scroller>
        </Marquee>

        <Drawer
          title="[GFX]"
          bgColor="bg-orange-400"
        >
          <Feature work={Works.enterTheHive} />
          <Feature work={Works.bugland} />
          <Feature work={Works.bangBangBang}>
            <Image src="/images/bang-guide.jpg" alt="Bang Bang Bang Guidelines" width={1000} height={1000} />
          </Feature>
          <Feature work={Works.folderIcon} />
          <Feature work={Works.windowsAngel} openDrawer={openDrawer} scrollTo={scrollTo}>
            <div className="flex flex-col w-max">
              <Button
                text="3D Demo"
                link="/windows-angel"
                openInNewTab={true}
                textColor="text-[#ea43a3]"
                hoverTextColor="hover:text-white"
                bgColor="bg-white"
                hoverBgColor="hover:bg-[#ea43a3]"
                borderColor="border-[#ea43a3]"
                hoverBorderColor="hover:border-white"
                optional="ml-0 mt-2"
                hoverGlyph={<ArrowNav color="white" />}
                hoverable={true}
                styling="backdrop-blur-xl ${bgColor} bg-opacity-100"
                shadow="shadow-[0px_4px_8px_rgba(0,0,0,0.1)] rounded-full"
              />
              <Button
                text="Stream"
                link="https://open.spotify.com/album/3DkLvKm9g4q7ABoGbbbKWy?si=xh6_LkneRPOElrs1LSEP3w"
                openInNewTab={true}
                textColor="text-[#ea43a3]"
                hoverTextColor="hover:text-white"
                bgColor="bg-white"
                hoverBgColor="hover:bg-[#ea43a3]"
                borderColor="border-[#ea43a3]"
                hoverBorderColor="hover:border-white"
                optional="ml-0 mt-6"
                hoverGlyph={<ArrowNav color="white" />}
                hoverable={true}
                styling="backdrop-filter backdrop-blur-xl ${bgColor} bg-opacity-100"
                shadow="shadow-[0px_4px_8px_rgba(0,0,0,0.1)] rounded-full"
              />
            </div>
          </Feature>
          <Feature work={Works.mesh} />
          <Feature work={Works.bliss}>
            <div className="flex flex-col w-max">
              <Button
                text={"3D DEMO"}
                link={"/bliss"}
                textColor={"text-[#ea43a3]"}
                hoverTextColor={"hover:text-white"}
                bgColor={"bg-white"}
                hoverBgColor={"hover:bg-[#ea43a3]"}
                borderColor={"border-[#ea43a3]"}
                hoverBorderColor={"hover:border-white"}
                optional={"ml-0 mt-2"}
                hoverGlyph={<ArrowNav color={"white"} />}
                hoverable={true}
                styling="backdrop-blur-xl ${bgColor} bg-opacity-100"
                shadow="shadow-[0px_4px_8px_rgba(0,0,0,0.1)] rounded-full"
              />
              <Button
                text={"Stream"}
                link={
                  "https://open.spotify.com/track/60LsGDYCP5q5fpKCLHeQSz?si=1dfbbb4ff9e849fe, _blank"
                }
                textColor={"text-[#ea43a3]"}
                hoverTextColor={"hover:text-white"}
                bgColor={"bg-white"}
                hoverBgColor={"hover:bg-[#ea43a3]"}
                borderColor={"border-[#ea43a3]"}
                hoverBorderColor={"hover:border-white"}
                optional={"ml-0 mt-6"}
                hoverGlyph={<ArrowNav color={"white"} />}
                hoverable={true}
                styling="backdrop-filter backdrop-blur-xl ${bgColor} bg-opacity-100"
                shadow="shadow-[0px_4px_8px_rgba(0,0,0,0.1)] rounded-full"
              />
            </div>
          </Feature>
          <Feature work={Works.floatingInTheBreeze}>
            <Button
              text={"Stream"}
              link={
                "https://open.spotify.com/track/1apyw8zRVvzi8nSe3Ipsdk?si=affc3e2daa0346eb"
              }
              textColor={"text-white"}
              hoverTextColor={"hover:text-black"}
              bgColor={""}
              hoverBgColor={"hover:bg-white"}
              borderColor={"border-white"}
              hoverBorderColor={"hover:border-black"}
              optional={"ml-0 mt-2"}
              hoverGlyph={<ArrowNav color={"#000000"} />}
              hoverable={true}
            />
          </Feature>

          <Feature work={Works.drGabbaFlyers} openDrawer={openDrawer} scrollTo={scrollTo} />
          <ImagePairGallery 
            alt1={"DR. GABBA Montréal flyer"}
            alt2={"Dragon Warrior-themed DR. GABBA with Kyruh and VAPERROR flyer"}
            imageName1={"drgabba-montreal-4x5.jpg"}
            imageName2={"gabba-dragon-warrior-poster-vaperror.jpg"}
            bgColor={"bg-black"} 
          />

          <Feature work={Works.manaPoolAlbumCover}>
            <Button
              text={"Stream"}
              link={
                "https://open.spotify.com/album/3bldb8xoLHFaGtN9oyMcz2?si=AoA1b2_mSiSHUidcMWsC_Q, _blank"
              }
              textColor={"text-white"}
              hoverTextColor={"hover:text-[#424ffb]"}
              bgColor={"bg-[#23caff]"}
              hoverBgColor={"hover:bg-white"}
              borderColor={"border-white"}
              hoverBorderColor={"hover:border-[#424ffb]"}
              optional={"ml-0 mt-2"}
              hoverGlyph={<SplashSVG color={"#424ffb"} />}
              hoverable={true}
            />
          </Feature>
        </Drawer>

        <Drawer
          title={"[VFX]"}
          bgColor={"bg-rose-400"}
        >
          <VideoFeature />
        </Drawer>

        <Drawer
          title={"[MUSIC]"}
          bgColor={"bg-purple-400"}
        >
          <ImageGrid />
        </Drawer>

        <Drawer
          title={"[CODE]"}
          bgColor={"bg-indigo-400"}
        >
          <CodeFeature
            title="GOJIRA - SYNTH OSC"
            bgColor="bg-black"
            textColor="text-lime-400"
          />
        </Drawer>

        <Drawer
          title={"[UI/UX]"}
          bgColor={"bg-sky-400"}
        >
          <Feature work={Works.cdJacket}>
            <Button
              text={"Play"}
              link={"/windows-angel"}
              openInNewTab={true}
              textColor={"text-indigo-300"}
              hoverTextColor={"hover:text-white"}
              hoverBgColor={"hover:bg-indigo-500"}
              borderColor={"border-indigo-300"}
              hoverBorderColor={"hover:border-white"}
              optional={"ml-0 mt-2"}
              hoverGlyph={<ArrowNav color={"white"} />}
              hoverable={true}
              styling="backdrop-blur-xl ${bgColor} bg-opacity-100"
              shadow=""
            />
          </Feature>
          <Feature work={Works.gpuBooking}>
            <Button
              text={"Demo"}
              link={"https://nvdia-gpu-booking-example.vercel.app/"}
              openInNewTab={true}
              textColor={"text-indigo-500"}
              hoverTextColor={"hover:text-white"}
              bgColor={"bg-black"}
              hoverBgColor={"hover:bg-indigo-500"}
              borderColor={"border-indigo-500"}
              hoverBorderColor={"hover:border-white"}
              optional={"ml-0 mt-2"}
              hoverGlyph={<ArrowNav color={"white"} />}
              hoverable={true}
              styling="backdrop-blur-xl ${bgColor} bg-opacity-100"
              shadow="shadow-[0px_4px_8px_rgba(0,0,0,0.1)] rounded-full"
            />
          </Feature>
          <Feature work={Works.socialPortal}>
            <div className="flex flex-col w-max">
              <Button
                text={"Demo"}
                link={"https://jeff-cardinal-website.vercel.app/"}
                textColor={"text-white"}
                hoverTextColor={"hover:text-black"}
                bgColor={"bg-blue-400"}
                hoverBgColor={"hover:bg-white"}
                borderColor={"border-white"}
                hoverBorderColor={"hover:border-black"}
                optional={"ml-0 mt-2"}
                hoverGlyph={<ArrowNav color={"black"} />}
                hoverable={true}
                styling="backdrop-blur-xl ${bgColor} bg-opacity-100"
                shadow=""
              />
              <Link
                href="https://github.com/JeffCardinal/JeffCardinalWebsite/"
                target="_blank"
              >
                <button className="border-[6px] border-white mr-4 hover:bg-white hover:text-black hover:border-black rounded-full transition duration-300 font-distancia text-2xl flex flex-row mt-6">
                  <div className="h-6 w-6 ml-2 mt-1">
                    <FontAwesomeIcon icon={faGithub} />
                  </div>
                  <div className="pt-[2px] pl-2 pr-4">Github</div>
                </button>
              </Link>
            </div>
          </Feature>
          <Feature work={Works.retroh} />
        </Drawer>

        <Drawer
          title={"[BRAND]"}
          bgColor={"bg-teal-400"}
        >
          <Feature work={Works.flowgear}>
            <ImagePairGallery
              alt1={"Sky 909 Flyer"}
              alt2={"c678924 performing in LA"}
              imageName1={"flowgear/Sky909Flyer.jpg"}
              imageHover1Name={"flowgear/Sky909Flyer.jpg"}
              imageName2={"flowgear/c678924-LA.jpg"}
              imageHover2Name={"flowgear/c678924-LA.jpg"}
              bgColor={"bg-black"}
            />
          </Feature>
          <Feature work={Works.i2kBranding}>
            <LogoMorph/>
          </Feature>
          <ImagePairGallery
            alt1={"Poster"}
            alt2={"Model"}
            imageName1={"i2k/i2k-ExampleFlyer.jpg"}
            imageHover1Name={"i2k/i2k-ExampleFlyer-Clean.jpg"}
            imageName2={"i2k/i2k-shirt-pink-blue.jpg"}
            imageHover2Name={"i2k/i2k-shirt-green.jpg"}
            bgColor={"bg-white"}
          />
          <Feature work={Works.plus100Logo}>
            <Button
              text={"Visit Site"}
              link={"https://plus100.bandcamp.com/"}
              textColor={"text-[#ff84be]"}
              hoverTextColor={"hover:text-white"}
              bgColor={"bg-white"}
              hoverBgColor={"hover:bg-[#ff84be]"}
              borderColor={"border-[#ff84be]"}
              hoverBorderColor={"hover:border-[#ff84be]"}
              optional={"ml-0 mt-2"}
              hoverGlyph={<ArrowNav color={"#FFFFFF"} />}
              hoverable={true}
            />
          </Feature>
        </Drawer>

        <Drawer
          title={"[PROD]"}
          bgColor={"bg-[#5ce37c]"}
        > 
          <UnderConstruction bgColor={"bg-black"} textColor={""}/>
        </Drawer>

        <Drawer
          title={"[TOYBOX]"}
          bgColor={"bg-lime-400"}
        >
          <Feature work={Works.metaballAvatarGenerator}>
            <Button
              text={"Play"}
              link={"/metaball-avatar-generator"}
              openInNewTab={true}
              textColor={"text-[#1694ff]"}
              hoverTextColor={"hover:text-white"}
              bgColor={"bg-black"}
              hoverBgColor={"hover:bg-[#1694ff]"}
              borderColor={"border-[#1694ff]"}
              hoverBorderColor={"hover:border-white"}
              optional={"ml-0 mt-2"}
              hoverGlyph={<ArrowNav color={"white"} />}
              hoverable={true}
              styling="backdrop-blur-xl ${bgColor} bg-opacity-100"
              shadow=""
            />
          </Feature>
        </Drawer>

        <Drawer
          title={"[FONTS]"}
          bgColor={"bg-yellow-300"}
          id={"fonts"}
          open={openId === "fonts"}
          setOpen={(v) => setOpenId(v ? "fonts" : null)}
        >
          <Feature work={Works.goupe}>
            <Link href="https://github.com/JeffCardinal/Goupe" target="_blank">
              <button className="border-[6px] border-lime-400 mr-4 hover:bg-lime-700 hover:text-lime-200 hover:border-lime-200 rounded-full transition duration-300 font-distancia text-2xl flex flex-row relative overflow-hidden group">
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-lime-300/60 to-lime-500/40 blur-lg group-hover:blur-md rounded-full pointer-events-none transform -translate-y-1/2" />
                <div className="h-6 w-6 ml-2 mt-1 z-10">
                  <FontAwesomeIcon icon={faGithub} />
                </div>
                <div className="pt-[2px] pl-2 pr-4 z-10">Download</div>
              </button>
            </Link>
          </Feature>

          <ImagePairGallery
            alt1={"Poster"}
            alt2={"Model"}
            imageName1={"fonts/PutOnASmileSm.png"}
            imageHover1Name={"fonts/PutOnASmile-Crumple-ColorCorrectedSm.png"}
            imageName2={"fonts/meltdown.png"}
            imageHover2Name={"fonts/meltdown-intense.png"}
            bgColor={"bg-black"}
          />
        </Drawer>

        <Footer color={"black"} bgColor={"bg-white"} />
        <ScrollToTopButton />
      </Container>
    </div>
  );
}
