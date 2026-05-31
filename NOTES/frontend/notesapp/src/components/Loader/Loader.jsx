import React from "react";
import lottieReact from "lottie-react";
import loadingAnimation from "../../assets/loading.json";

const Loader = () => {

    const Lottie = lottieReact.default;

  return (
    <div className="flex justify-center items-center p-4">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
};

export default Loader;