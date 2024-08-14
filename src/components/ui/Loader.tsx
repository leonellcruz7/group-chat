import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  return (
    <div>
      <HashLoader
        color="#000000"
        size={50}
      />
    </div>
  );
};

export default Loader;
