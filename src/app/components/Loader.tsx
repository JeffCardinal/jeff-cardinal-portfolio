import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
    const { progress } = useProgress();
    return (
      <Html center>
        <div
          style={{
            minHeight: "100vh",
            minWidth: "100vw",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0)",
            color: "#FFFFFF",
          }}
        >
          <div className="w-12 h-12 border-8 m-4 border-white border-t-black rounded-full animate-spin items-center justify-center"/>
          <h1>Initializing start up sequence...</h1>
          {/* <div>{Math.floor(progress)}%</div> */}
        </div>
      </Html>
    );
}