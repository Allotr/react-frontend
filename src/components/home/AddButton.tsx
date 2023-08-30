import { useEffect } from "react";
import Plus from "../../assets/Plus";
import { COLORS } from "../../consts/colors";

function ActionButton({ action, disabled = false }: { action: () => void, disabled?: boolean }) {
  useEffect(() => {
    // Add your init code
  }, []);

  return (
    <button
      className="rounded-full h-16 w-16 md:h-24 md:w-24 flex items-center justify-center fixed bottom-16 right-5 md:bottom-16 md:right-16 bg-purple-light hover:border-blue-light border-4 border-purple-dark"
      onClick={action}
      aria-label="add"
      disabled={disabled}
    >
      <Plus
        fill={COLORS.blue.light}
        className="h-5 w-5 md:h-7 md:w-7"
      ></Plus>
    </button>
  );
}

export default ActionButton;
