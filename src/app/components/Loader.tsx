import { Html } from "@react-three/drei";
import MetaballLoader from "./MetaballLoader";
import Marquee from "react-fast-marquee";
import { createPortal } from "react-dom";

export default function Loader() {
    return (
      <Html style={{ zIndex: 999999, position: 'relative' }} fullscreen>
        {createPortal(
          <div id="loader"
            style={{
              minHeight: "100vh",
              minWidth: "100vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0, 0, 0)",
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 999999,
            }}
          > 
            <div className="invisible md:visible lg:visible absolute bottom-1/2 w-full whitespace-nowrap">
              <Marquee
                direction="right"
                pauseOnHover={false}
                speed={200}
              >
                <span className="text-[400px] font-distancia text-rose-900 opacity-50 pt-[50px] inline-block">
                  LOADING...
                </span>
              </Marquee>
            </div>

            <div className="invisible md:visible lg:visible absolute w-full whitespace-nowrap">
              <Marquee
                pauseOnHover={false}
                speed={300}
              >
                <span className="text-[400px] font-distancia text-rose-900 pt-[50px] opacity-75 inline-block">
                  LOADING...
                </span>
              </Marquee>
            </div>

            <div className="invisible md:visible lg:visible absolute top-1/2 w-full whitespace-nowrap">
              <Marquee
                direction="right"
                pauseOnHover={false}
                speed={200}
              >
                <span className="text-[400px] font-distancia text-rose-900 opacity-50 pt-[50px] inline-block">
                  LOADING...
                </span>
              </Marquee>
            </div>

            <div className="z-10">
              <div className="relative w-[450px] h-[450px] flex items-center justify-center">
              <div className="absolute top-0 left-0 w-full h-full flex items-center pointer-events-none">
                <svg width="400" height="400" viewBox="0 0 400 400">
                  <defs>
                    <path
                      id="circlePath"
                      d="
                        M 200, 50
                        a 150,150 0 1,1 0,300
                        a 150,150 0 1,1 0,-300
                      "
                    />
                  </defs>
                  <g>
                    <text fill="white" fontSize="23.5" fontWeight="bold">
                      <textPath href="#circlePath">
                        LOADING... LOADING... LOADING... LOADING... LOADING... LOADING... LOADING...
                      </textPath>
                    </text>
                    <animateTransform
                      attributeType="XML"
                      attributeName="transform"
                      type="rotate"
                      from="360 200 200"
                      to="0 200 200"
                      dur="20s"
                      repeatCount="indefinite"
                    />
                  </g>
                </svg>
              </div>
              <MetaballLoader />
              </div>
            </div>
          </div>,
          document.body
        )}
      </Html>
    );
}