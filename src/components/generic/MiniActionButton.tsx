import React, { useEffect } from "react";
function MiniActionButton({
  action,
  type,
  logo: SVGLogo,
  fill,
  stroke,
}: {
  action: () => void;
  type?: "button" | "reset" | "submit" | undefined;
  fill?: string;
  logo?: React.FC<{
    height: string;
    width: string;
    fill?: string;
    stroke?: string;
  }>;
  stroke?: string;
}) {
  useEffect(() => {
    // Add your init code
  }, []);

  return (
    <button
      type={type}
      className="h-10 w-10 bg-purple border-2 border-transparent hover:border-blue-light flex justify-between"
      onClick={action}
    >
      {SVGLogo != null && (fill != null || stroke != null) ? (
        <div className="m-auto inline-block  align-middle">
          <SVGLogo
            height="20px"
            width="20px"
            fill={fill}
            stroke={stroke}
          ></SVGLogo>
        </div>
      ) : null}
    </button>
  );
}

export default MiniActionButton;
