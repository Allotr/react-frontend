import React, { useEffect } from "react";
import Plus from "../../assets/Plus";
import { COLORS } from "../../consts/colors";

function ActionButton({ action, disabled = false }: { action: () => void, disabled?: boolean }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const onMouseEnter = () => {
    setIsHovered(true);
  };
  const onMouseLeave = () => {
    setIsHovered(false);
  };
  useEffect(() => {
    // Add your init code
  }, []);

  return (
    <button
      className="rounded-full h-16 w-16 md:h-24 md:w-24 flex items-center justify-center fixed bottom-16 right-5 md:bottom-16 md:right-16 bg-purple-light hover:border-blue-light border-4 border-purple-dark"
      onClick={action}
      aria-label="add"
      disabled={disabled}
      {...{ onMouseEnter, onMouseLeave }}
    >
      <Plus
        fill={isHovered ? COLORS.blue.light : COLORS.purple.dark}
        height="30px"
        width="30px"
      ></Plus>
    </button>
  );
}

export default ActionButton;
