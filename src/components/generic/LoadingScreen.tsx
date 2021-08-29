import React, { useEffect } from "react";
import Loading from "./Loading";

function LoadingScreen() {
  useEffect(() => {
    // Add your init code
  }, [])

  return (

    <div className="login bg-blue-dark min-h-screen min-w-screen flex content-center">
      <div className="block m-auto">
      <Loading></Loading>
      </div>
    </div>
  );
}

export default LoadingScreen;