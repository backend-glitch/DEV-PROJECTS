import React from "react";
import Loader2 from "./Loader2";
import Navbar from "../Navbar/Navbar";

const FullScreenLoader = () => {
  return (
    <>
    {/* <div className="z-50">
      <Navbar />
    </div> */}

    <div className="fixed inset-0 bg-orange-300 flex justify-center items-center z-50 ">
   
      <Loader2 />
    </div>
    </>
  );
};

export default FullScreenLoader;