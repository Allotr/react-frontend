import React, { useEffect } from "react";
function MiniActionButton({
  action,
  type,
  logo: SVGLogo,
  fill,
  stroke,
  disabled = false
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
  disabled?: boolean;
}) {
  useEffect(() => {
    // Add your init code
  }, []);

  return (
    <button
      type={type}
      className={`h-14 w-14  flex justify-between ${(!disabled ? "hover:border-blue-light bg-purple border-2 border-transparent" : "cursor-default")}`}
      onClick={action}
      disabled={disabled}
    >
      {!disabled && SVGLogo != null && (fill != null || stroke != null) ? (
        <div className="m-auto inline-block  align-middle">
          <SVGLogo
            height="25px"
            width="25px"
            fill={fill}
            stroke={stroke}
          ></SVGLogo>
        </div>
      ) : null}
    </button>
  );
}

export default MiniActionButton;
