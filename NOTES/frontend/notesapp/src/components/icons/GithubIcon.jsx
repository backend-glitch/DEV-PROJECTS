import React from "react";
import { FaGithub } from "react-icons/fa6";

const GithubIcon = () => {

    return(
        
       <a
       href="https://github.com/backend-glitch"
       target="_blank"
       rel="noopener noreferrer"
       className="fixed bottom-5 left-5 text-5xl text-orange-600 hover:text-black transition-all"
     >
       <FaGithub />
     </a>

    )
}

export default GithubIcon;