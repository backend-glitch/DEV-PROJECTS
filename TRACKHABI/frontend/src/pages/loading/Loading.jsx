import React from "react";
import Loader from "./Loader";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 bg-white/10 bg-opacity-100 backdrop-blur-md flex justify-center items-center z-50">
      <Loader />
    </div>
  );
};

export default FullScreenLoader;