import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

function DiscardButton({ action, label, disabled = false }: { action: () => void, label: string, disabled?: boolean }) {
    const { t } = useTranslation();
    useEffect(() => {
        // Add your init code
    }, [])

    return (
        <button
            disabled={disabled}
            type="button" className="w-28 h-9 bg-transparent border-opacity-50  border-blue-light border-2 flex hover:border-opacity-100 justify-items-center" onClick={action}>
            <p className="text-blue-light text-xl text-center m-auto inline-block  align-middle   ">{t(label)}</p>
        </button>
    );
}

export default DiscardButton;