import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./ActionButton.css"

function ActionButton({
    action,
    onKeyDown,
    type,
    label,
    logo: SVGLogo,
    fill,
    disabled = false,
    textColorClass = 'text-blue-light',
    hoverColorClass = 'hover:border-blue-light',
    loadingAnimationClass = '',
    isLoading = false
}: {
    action: () => void,
    onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void,
    type?: "button" | "reset" | "submit" | undefined,
    label: string,
    fill?: string,
    textColorClass?: string,
    hoverColorClass?: string,
    loadingAnimationClass?: string,
    isLoading?: boolean,
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
            className={"w-28 h-9 bg-purple flex justify-between " + hoverColorClass + " "+ (isLoading ? loadingAnimationClass : 'border-2 border-transparent')}
            onClick={action}
            disabled={disabled}
            onKeyDown={onKeyDown}
        >
            <p className={"text-xl text-center m-auto inline-block align-middle " + textColorClass}>{t(label)}</p>

            {SVGLogo != null && fill != null ?
                <div className="m-auto inline-block  align-middle">
                    <SVGLogo height="20px" width="20px" fill={fill}></SVGLogo>
                </div>
                : null}

        </button>
    );
}

export default ActionButton;