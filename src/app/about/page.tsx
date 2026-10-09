import React from "react";
import Splash from "../components/Splash";
import PortraitTilt from "./PortraitTilt";

export default function Page() {
  return (
    <div className="min-h-screen">
      <div
        className="flex min-h-screen min-w-screen text-center items-center justify-center"
        style={{
          backgroundColor: "#0e0b23",
          backgroundImage:
            "radial-gradient(ellipse at top left, #b068cb 0%, transparent 55%), radial-gradient(ellipse at top right, #291444 0%, transparent 55%), radial-gradient(ellipse at bottom right, #0e0b23 0%, transparent 55%), radial-gradient(ellipse at bottom left, #3e189c 0%, transparent 55%)",
        }}
      >
        <div className="justify-center flex sm:flex-row flex-wrap">
          <PortraitTilt />
          <div className="justify-start text-start sm:px-2 px-8 lg:w-[500px] md:w-[300px] sm:w-[300px] text-white">
            <div className="font-distancia text-2xl pt-8">Yeah, about me.</div>
            <div className="p-6">
              I spent my time in college studying Computer Science at the
              University of Georgia and running my record label,{" "}
              <a className="text-[#ea43a3] hover:text-white underline transition duration-300" href="https://plus100.bandcamp.com/">PLUS100 Records.</a>
              <div className="pt-4">
                I'm a Senior Software Engineer for Ford Motor Company.
                Previously, I've worked as a Software Engineer I and II for The Home Depot and Greenlight Financial Technologies respectively.
              </div>
              <div className="pt-4">
                As a musician, I've played shows and festivals in destinations
                all over the world—like Japan, Australia, and my homeland of the United States.
                On occaision, my work expands into fashion world, including works featured by labels like 10DEEP, COS, and Lacoste.
              </div>
              <div className="pt-4">
                As a graphics designer, I've had works published in AIGA Eye on Design. 
              </div>
              <div className="pt-4">
                I spend my life in my creative pursuits and technical endeavors,
                bettering myself and those around me as best as I can.
              </div>
              <div className="pt-4">
                Wanna work together?<br/> Check out my{" "}
                <a className="text-[#ea43a3] hover:text-white underline transition duration-300" href="/resume">resume</a>
                {" "}and contact me.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
