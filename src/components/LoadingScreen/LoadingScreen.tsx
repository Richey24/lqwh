import React from "react";
import { Spinner } from "reactstrap";
import Lottie from "react-lottie";
import warehouseAnimation from "../../assets/lotties/warehouse2.json";

const LoadingScreen = () => {
     const lottieOptions = {
          loop: true,
          autoplay: true,
          animationData: warehouseAnimation,
          rendererSettings: {
               preserveAspectRatio: "xMidYMid slice",
          },
     };

     return (
          <div
               className="loading-screen"
               style={{
                    position: "absolute",
                    right: 0,
                    left: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: "white",
                    zIndex: 100000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
               }}
          >
               <Lottie options={lottieOptions} height={150} width={150} />
          </div>
     );
};

export default LoadingScreen;
