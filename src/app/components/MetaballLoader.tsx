const MetaballLoader = () => {
    return (
      <>
      <svg viewBox="-120 -100 300 300" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="metaball">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 20 -10"
              result="metaball"
            />
            <feComposite in="SourceGraphic" in2="metaball" operator="atop" />
          </filter>
        </defs>
  
        <g filter="url(#metaball)">
          {/* Ball 1 (Largest) */}
          <circle cx="50" cy="0" r="40" fill="white">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="5s" 
              repeatCount="indefinite"
              keyTimes="0; 1"
              keySplines="0.42 0 0.58 1"
            />
            <animate
              attributeName="cx"
              values="50; 40; 50; 60; 50"
              dur="5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="0; 10; 0; -10; 0"
              dur="5s"
              repeatCount="indefinite"
            />
          </circle>
  
          {/* Ball 2 (Medium) */}
          <circle cx="60" cy="10" r="30" fill="white">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 50 50"
              to="0 50 50"
              dur="4s"  
              repeatCount="indefinite"
              keyTimes="0; 1"
              keySplines="0.42 0 0.58 1"
            />
            <animate
              attributeName="cx"
              values="40; 35; 40; 45; 40"
              dur="4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="20; 25; 20; 15; 20"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
  
          {/* Ball 3 (Smallest) */}
          <circle cx="40" cy="20" r="20" fill="white">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 0 20"
              to="360 0 20"
              dur="3s"  
              repeatCount="indefinite"
              keyTimes="0; 1"
              keySplines="0.42 0 0.58 1"
            />
            <animate
              attributeName="cx"
              values="40; 35; 40; 45; 40"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="20; 25; 20; 15; 20"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
      </>
    );
  };
      

export default MetaballLoader;