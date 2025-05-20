import { Html } from "@react-three/drei";
import MetaballLoader from "./MetaballLoader";
import Marquee from "react-fast-marquee";

export default function Loader() {
    return (
      <Html center>
        <div
          style={{
            userSelect: "none",
            minHeight: "100vh",
            minWidth: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0)",
            color: "#FFFFFF",
            overflowY: "hidden",
          }}
        > 

          <div className="invisible md:visible lg:visible absolute bottom-1/2 w-full whitespace-nowrap z-0">
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

          <div className="invisible md:visible lg:visible absolute w-full whitespace-nowrap z-0">
            <Marquee
              pauseOnHover={false}
              speed={300}
            >
              <span className="text-[400px] font-distancia text-rose-900 pt-[50px] opacity-75 inline-block">
                LOADING...
              </span>
            </Marquee>
          </div>

          <div className="invisible md:visible lg:visible absolute top-1/2 w-full whitespace-nowrap z-0">
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
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
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
        </div>
      </Html>
    );
}