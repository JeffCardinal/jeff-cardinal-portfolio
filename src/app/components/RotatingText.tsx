import { useEffect, useState } from "react";

function RotatingText() {
    const phrases = ["software engineer", "multimedia designer", "music producer"];
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
        style={{
          position: "absolute",
          top: "70%",
          transform: "translate(0%, -100%)",
          fontSize: "clamp(36px, 4vw, 64px)",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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