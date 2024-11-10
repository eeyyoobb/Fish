"use client";

import React from "react";

interface Props {
  icon?: React.ReactNode;
  name?: string;
  background?: string;
  padding?: string;
  borderRad?: string;
  fw?: string;
  fs?: string;
  click?: () => void;
  type?: "submit" | "button" | "reset" | undefined;
  border?: string;
  color?: string;
}

function Button({
  icon,
  name,
  background,
  padding,
  borderRad,
  fw,
  fs,
  click,
  type,
  border,
  color,
}: Props) {
  return (
    <button
      type={type}
      className={`relative flex items-center z-5 cursor-pointer transition-all duration-500 ${
        padding ? padding : "py-2 px-4"
      } ${borderRad ? borderRad : "rounded-md"} ${fw ? `font-${fw}` : "font-medium"} ${
        fs ? `text-${fs}` : "text-base"
      } ${border ? border : "border-none"} ${
        background ? background : "bg-gray-800"
      } ${color ? color : "text-gray-300"} hover:text-gray-100 hover:bg-gray-700`}
      onClick={click}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {name}
    </button>
  );
}

export default Button;
