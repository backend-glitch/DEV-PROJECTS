import React from "react";
import Loader2 from "./Loader2";
import Navbar from "../Navbar/Navbar";
import Loader from "./Loader";

const FullScreenLoader = () => {
  return (

       <div className="fixed inset-0 bg-white/10 bg-opacity-100 backdrop-blur-md flex justify-center items-center z-50">
         <Loader2 />
       </div>
   
  );
};

export default FullScreenLoader;