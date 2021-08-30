import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AllotrLogo from "../../assets/AllotrLogo";
import DiscardButton from "../generic/DiscardButton";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function ViewResource() {
    const { t } = useTranslation();
    const history = useHistory();

    const { id } = useParams<{ id: string }>();
    console.log("ID!!\t", id);

    useEffect(() => {
        // Add your init code
    }, [])


    return (

        <div className="bg-blue-dark min-h-screen min-w-screen flex-cols items-center">
            {/* Top bar with title */}
            <div className="flex fixed bg-purple w-screen h-12 justify-between">
                <p className="text-yellow text-2xl m-auto">{t("ViewResource")}</p>
                <div className="absolute top-1 right-0 h-16 w-16">
                    <AllotrLogo width="40" height="40" className="flex"></AllotrLogo>
                </div>
            </div>
            {/* Action buttons */}
            <div className="buttonBar  flex justify-around pb-6 absolute bottom-10 right-10">
                <div className=" flex items-center justify-center  bottom-10 left-5 md:bottom-16 md:left-16 ">
                    <DiscardButton action={() => history.push("/")} label="Cancel" />
                </div>
                <div className=" flex items-center justify-center  bottom-10 right-5 md:bottom-16 md:right-16 ">
                </div>
            </div>
        </div>
    );
}

export default ViewResource;