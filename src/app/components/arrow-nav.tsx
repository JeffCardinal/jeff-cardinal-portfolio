import React from "react";

const ArrowNav = ({ color }: { color: string }) => (
  <div className="-rotate-180 justify-right -mt-[1px]">
    <svg
      className="animate-buttonGlyphEaseIn"
      id="a"
      data-name="Nav Arrow"
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 100 100"
    >
      <polygon points="80 0 50 0 0 50 50 100 80 100 30 50 80 0" fill={color} />
    </svg>
  </div>
);

export default ArrowNav;
