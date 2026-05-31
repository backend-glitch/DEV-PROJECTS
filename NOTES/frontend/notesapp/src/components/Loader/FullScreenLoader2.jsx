import React from "react";
import Loader from "./Loader";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 bg-wheat-300 flex justify-center items-center z-50">
      <Loader />
    </div>
  );
};

export default FullScreenLoader;