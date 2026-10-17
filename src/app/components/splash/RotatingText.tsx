import { useEffect, useState } from "react";

function RotatingText() {
    const phrases = ["programmer", "designer", "musician"];
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [opacity, setOpacity] = useState(1);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setOpacity(0);
        setTimeout(() => {
          setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
          setOpacity(1);
        }, 500);
      }, 2500);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div
        className="z-10"
        style={{
          position: "absolute",
          top: "calc(60vh + 4vw)",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(40px, 4vw, 64px)",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        <span style={{ color: "#FFFFFF", whiteSpace: "pre" }}>I'm a </span>
        <span
          style={{
            color: "magenta",
            opacity: opacity,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          {phrases[currentPhraseIndex]}.
        </span>
      </div>
    );
  }
  
  export default RotatingText;