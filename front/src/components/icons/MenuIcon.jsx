import React from "react";

const MenuIcon = ({ fill, onClick }) => {
  const handleClick = (e) => {
    onClick(e);
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 25 25"
      height="25"
      width="25"
      id="Hamburger-Menu-1--Streamline-Sharp.svg"
      onClick={(e) => handleClick(e)}
    >
      <g id="Hamburger-Menu-1--Streamline-Sharp.svg">
        <path
          id="Rectangle 19"
          stroke={fill}
          strokeWidth="2"
          d="M23.958333333333336 22.916666666666668H1.0416666666666667"
        ></path>
        <path
          id="Rectangle 20"
          stroke={fill}
          strokeWidth="2"
          d="m1.0416666666666667 2.0833333333333335 22.916666666666668 0"
        ></path>
        <path
          id="Rectangle 21"
          stroke={fill}
          strokeWidth="2"
          d="m1.0416666666666667 12.5 22.916666666666668 0"
        ></path>
      </g>
    </svg>
  );
};

export default MenuIcon;
