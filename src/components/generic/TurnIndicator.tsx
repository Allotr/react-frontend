import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Clock from "../../assets/Clock";

function TurnIndicator({ queuePosition }: { queuePosition: number }) {
    const { t } = useTranslation();
    useEffect(() => {
        // Add your init code
    }, [])

    return (
        <div className="w-28 h-9 bg-transparent  flex-cols">
            <p className="text-blue-light text-l text-left ml-2">{t("YourTurnIndicator")}</p>
            <div className="mt-1 mr-1 flex flex-between">
                <Clock height="20px" width="20px" fill="#5ABAFF" className="ml-2 mt-0.5"></Clock>
                <p className="bg-blue-light ml-2 w-12 h-6 m-auto block text-purple-dark text-center align-top">{queuePosition}</p>
            </div>
        </div>
    );
}

export default TurnIndicator;