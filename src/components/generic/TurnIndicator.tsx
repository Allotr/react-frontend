import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Clock from "../../assets/Clock";
import { COLORS } from "../../consts/colors";

function TurnIndicator({ queuePosition }: { queuePosition: number }) {
    const { t } = useTranslation();
    useEffect(() => {
        // Add your init code
    }, [])

    return (
        <div className="w-28 h-9 bg-transparent  flex-cols mb-7">
            <p className="text-yellow text-l text-left ml-2">{t("YourTurnIndicator")}</p>
            <div className="mt-1 mr-1 flex flex-between items-center">
                <Clock height="20px" width="20px" fill={COLORS.yellow.DEFAULT} className="ml-2 mt-0.5"></Clock>
                <div className="ml-2 w-14 h-7 bg-blue-dark border border-yellow flex content-center">
                    <p className="content-center m-auto  text-yellow text-center font-bold break-words">{queuePosition}</p>
                </div>
            </div>
        </div>
    );
}

export default TurnIndicator;