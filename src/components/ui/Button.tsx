import classNames from "classnames";
import React from "react";

interface IProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, ...props }: IProp) => {
  return (
    <button
      {...props}
      className={classNames(
        "bg-blue-950 text-white h-12 rounded-xl font-semibold uppercase flex justify-center items-center",
        props.className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
