import React from "react";
import lottieReact from "lottie-react";
import loadingAnimation from "../../assets/loading.json";

const Loader = () => {

    const Lottie = lottieReact.default;

  return (
       <div className="flex justify-center flex-col items-center p-4">
    
             <h1 style={{ fontSize: "clamp(2.8rem,7vw,10rem)", fontFamily: "'Brush Script MT', cursive", fontWeight: 600, lineHeight: 1.08, marginBottom: "2rem", letterSpacing: "-0.02em", color: "orange" }}>
                NOTELOVER<br />
               
                     </h1>
    
    
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            style={{ width: 150, height: 150 }}
          />

          </div>
  );
};

export default Loader;