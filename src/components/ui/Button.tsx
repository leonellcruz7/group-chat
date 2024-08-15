import classNames from "classnames";
import React from "react";

interface IProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, ...props }: IProp) => {
  return (
    <button
      {...props}
      className={classNames(
        "bg-blue-800 disabled:bg-gray-600 disabled:scale-[1] text-white h-12 rounded-xl font-semibold uppercase flex justify-center items-center hover:scale-[1.02] hover:bg-blue-950 transition-all",
        props.className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
