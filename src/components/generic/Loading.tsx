import React, { useEffect } from "react";
import ReactLoading from 'react-loading';

function Loading() {
    const type = "spin"
    const color = "#ffffff"
  useEffect(() => {
    // Add your init code
  }, [])

  return (
    <ReactLoading type={type} color={color} height={'50px'} width={'50px'} />
  );
}

export default Loading;