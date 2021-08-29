import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AllotrLogo from "../../assets/AllotrLogo";
import DiscardButton from "../generic/DiscardButton";
import { useParams } from "react-router-dom";


function ViewResource() {
    const { t } = useTranslation();

    const { id } = useParams<{ id: string }>();
    console.log("ID!!\t", id);

    useEffect(() => {
        // Add your init code
    }, [])

    const action = () => { }

    return (

        <div className="login bg-blue-dark min-h-screen min-w-screen flex-cols items-center">
            <div className="flex fixed bg-purple w-screen h-12 justify-between" >
                <p className="text-yellow text-2xl m-auto">{t('ViewResource')}</p>
                <div className="absolute top-1 right-0 h-16 w-16"><AllotrLogo width="40" height="40" className="flex"></AllotrLogo>
                </div>
            </div>
            <div className="form">
                <p className="text-blue-light text-3xl text-left ml-3">{t("NameForm")}</p>
            </div>
            <div className="buttonBar bg-purple-dark min-h-32 w-11/12 m-auto mt-10 flex justify-between break-all md:break-normal pb-7">

                <DiscardButton action={action} label="ReleaseResource" ></DiscardButton>
            </div>
        </div>
    );
}

export default ViewResource;