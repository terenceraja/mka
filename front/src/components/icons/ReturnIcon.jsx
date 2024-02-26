import React from "react";

const ReturnIcon = ({ fill, onClick }) => {
  const handleOnClick = () => {
    onClick();
  };

  return (
    <svg
      onClick={() => handleOnClick()}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="-0.5 -0.5 15 15"
      height="25"
      width="25"
      id="Return-1--Streamline-Sharp.svg"
    >
      <desc>Return 1 Streamline Icon: https://streamlinehq.com</desc>
      <g id="Return-1--Streamline-Sharp.svg">
        <path
          id="Vector 1864"
          stroke={fill}
          strokeWidth="1.5"
          d="m4.083333333333334 12.25 -2.916666666666667 -2.916666666666667 2.916666666666667 -2.916666666666667"
        ></path>
        <path
          id="Vector 2191"
          stroke={fill}
          strokeWidth="1.5"
          d="M1.1666666666666667 9.333333333333334h11.666666666666668V2.3333333333333335H4.375"
        ></path>
      </g>
    </svg>
  );
};

export default ReturnIcon;
