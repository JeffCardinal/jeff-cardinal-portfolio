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
          <h1>Initializing start up sequence...</h1>
          <div>{Math.floor(progress)}%</div>
        </div>
      </Html>
    );
}