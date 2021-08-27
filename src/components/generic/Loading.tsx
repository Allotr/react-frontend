import React, { useEffect } from "react";
import ReactLoading from 'react-loading';

function Loading() {
    const type = "spin"
    const color = "#000000"
  useEffect(() => {
    // Add your init code
  }, [])

  return (
    <ReactLoading type={type} color={color} height={'20px'} width={'20px'} />
  );
}

export default Loading;