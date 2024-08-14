import React from "react";
import { ring } from "ldrs";

ring.register();

const Spinner = () => {
  return (
    <l-ring
      size="40"
      stroke="5"
      bg-opacity="0"
      speed="2"
      color="#777"
    ></l-ring>
  );
};

export default Spinner;
