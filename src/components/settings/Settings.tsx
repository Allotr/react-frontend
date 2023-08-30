import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AllotrLogo from "../../assets/AllotrLogo";
import DiscardButton from "../generic/DiscardButton";
import FullSizeButton from "../generic/FullSizeButton";

function Settings() {
    const { t } = useTranslation();
    const navigate = useNavigate();


    useEffect(() => {
        // Add your init code
    }, [])


    return (
        <div className="bg-blue-dark min-h-screen min-w-screen flex-cols items-center">
            {/* Top bar with title */}
            <div className="flex fixed bg-purple w-screen h-12 justify-between z-10">
                <p className="text-yellow text-2xl m-auto">{t("Settings")}</p>
                <div className="absolute top-1 right-0 h-16 w-16">
                    <AllotrLogo width="40" height="40" className="flex"></AllotrLogo>
                </div>
            </div>

            <div className="form md:pt-20 ml-5 md:ml-20 pt-16 break-words">
                <p className="text-yellow text-xl m-auto">{t("YourAccount")}</p>
                {/* Bottom spacing */}
                <div className="mb-4"></div>
                <FullSizeButton action={() => {
                    navigate("/deleteAccount")
                }} label="DeleteAccountButton" ></FullSizeButton>
                {/* Bottom spacing */}
                <div className="mb-20"></div>
            </div>
            {/* Action Buttons */}
            <div className="buttonBar  flex justify-start pb-6  ml-5 md:ml-20 absolute bottom-4">
                <div className="flex items-center justify-center  bottom-10 left-5 md:bottom-16 md:left-16 ">
                    <DiscardButton action={() => navigate(-1)} label="Back" />
                </div>
                {/* <div className=" flex items-center justify-center  bottom-10 right-5 md:bottom-16 md:right-16 ">
                    <div className="self-start">{componentMap[myTicket?.lastStatus.statusCode ?? TicketStatusCode.Revoked]}</div>
                </div> */}
            </div>

        </div>
    );
}

export default Settings;