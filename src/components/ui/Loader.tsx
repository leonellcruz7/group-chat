import React from "react";
import { bouncy } from "ldrs";

bouncy.register();

const Loader = () => {
  return (
    <div>
      <l-bouncy
        size="80"
        speed="0.9"
        color="#999"
      ></l-bouncy>
    </div>
  );
};

export default Loader;
