import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

function DiscardButton({ action, label, logo: SVGLogo, fill }: { action: () => void, label: string, fill?: string, logo?: React.FC<{ height: string, width: string, fill: string }> }) {
    const { t } = useTranslation();
    useEffect(() => {
        // Add your init code
    }, [])

    return (
        <button className="w-28 h-9 bg-purple hover:border-blue-light border-2 border-transparent flex justify-between" onClick={action}>
            <p className="text-blue-light text-xl text-left ml-2    ">{t(label)}</p>

            {SVGLogo != null && fill != null ?
                <div className="mt-1 mr-1">
                    <SVGLogo height="20px" width="20px" fill={fill}></SVGLogo>
                </div>
                : null}

        </button>
    );
}

export default DiscardButton;