import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

function ActionButton({ action,onKeyDown, type, label, logo: SVGLogo, fill, disabled = false }: {
    action: () => void,
    onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void,
    type?: "button" | "reset" | "submit" | undefined,
    label: string,
    fill?: string,
    logo?: React.FC<{ height: string, width: string, fill: string }>,
    disabled?: boolean
}) {
    const { t } = useTranslation();
    useEffect(() => {
        // Add your init code
    }, [])

    return (
        <button
            type={type}
            className="w-28 h-9 bg-purple hover:border-blue-light border-2 border-transparent flex justify-between"
            onClick={action}
            disabled={disabled}
            onKeyDown={onKeyDown}
        >
            <p className="text-blue-light text-xl text-center m-auto inline-block  align-middle     ">{t(label)}</p>

            {SVGLogo != null && fill != null ?
                <div className="m-auto inline-block  align-middle">
                    <SVGLogo height="20px" width="20px" fill={fill}></SVGLogo>
                </div>
                : null}

        </button>
    );
}

export default ActionButton;