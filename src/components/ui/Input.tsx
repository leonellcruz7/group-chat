import React from "react";

interface IProp
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  textarea?: boolean;
}

const Input = ({ textarea, ...props }: IProp) => {
  return textarea ? (
    <textarea
      {...props}
      className="pt-2.5 border outline-none h-12 rounded-lg px-4 w-full resize-none"
    />
  ) : (
    <input
      type="text"
      {...props}
      className="border outline-none h-12 rounded-lg px-4 w-full"
    />
  );
};

export default Input;
