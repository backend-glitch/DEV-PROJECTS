import React from "react";
import { Link } from "react-router-dom";
import lottieReact from "lottie-react";
import notFoundAnimation from "../../assets/notfound.json";
import toast from "react-hot-toast";
import githubIcon from "../../components/icons/GithubIcon";
import GithubIcon from "../../components/icons/GithubIcon";

const Lottie = lottieReact.default;

const NotFound = () => {

       toast.error("Page not Found");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-wheat">

      <div className="w-full max-w-md">
        <Lottie
          animationData={notFoundAnimation}
          loop
        />
      </div>

      <h1 className="text-4xl font-bold text-slate-800 mt-4">
        404
      </h1>

      <p className="text-slate-500 mt-2 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>

   

      <Link
        to="/dashboard"
        className="mt-6 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-medium transition-all"
      >
        Back to Dashboard
      </Link>

     <GithubIcon />
    </div>
  );
};

export default NotFound;