import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AllotrLogo from "../../assets/AllotrLogo";
import ActionButton from "../generic/ActionButton";
import DiscardButton from "../generic/DiscardButton";
import { useMutation } from "@apollo/client";
import { DeleteUser, DeleteUserMutation, DeleteUserMutationVariables, OperationResult } from "allotr-graphql-schema-types";
import { CURRENT_USER_DATA } from "../../consts/global_session_keys";
import * as serviceWorkerRegistration from '../../serviceWorkerRegistration';
import { deleteSessionValue, getSessionValue } from "../../utils/storage-utils";

function DeleteAccount() {
    const { t } = useTranslation();
    const _id = getSessionValue<{ _id?: string }>(CURRENT_USER_DATA)?._id as string;
    const navigate = useNavigate();
    const [isFlagChecked, setIsFlagChecked] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [callDeleteUser] = useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUser)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        setIsFlagChecked(target.checked);
    }

    const handleConfirmClick = async () => {
        setDisabled(true);
        const { data, errors } = await callDeleteUser({ variables: { deleteAllFlag: isFlagChecked, userId: _id ?? "" } })
        setDisabled(false);
        if (errors || data?.deleteUser?.status === OperationResult.Error) {
            return;
        }

        deleteSessionValue(CURRENT_USER_DATA);
        serviceWorkerRegistration.unregister()
        navigate("/login")

    }


    // Scroll to top when first loading the screen
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <div className="bg-blue-dark min-h-screen min-w-screen flex-cols items-center">
            {/* Top bar with title */}
            <div className="flex fixed bg-purple w-screen h-12 justify-between z-10">
                <p className="text-yellow text-2xl m-auto">{t("DeleteAccount")}</p>
                <div className="absolute top-1 right-0 h-16 w-16">
                    <AllotrLogo width="40" height="40" className="flex"></AllotrLogo>
                </div>
            </div>

            <div className="form md:pt-20 ml-5 md:ml-10 pt-16 break-words">
                <p className="text-yellow text-xl m-auto">{t("AreYouSureDeleteAccount")}</p>
                <div className="mb-4"></div>
                <p className="text-blue-light text-l m-auto">{t("DeleteAccountInfo")}</p>
                <div className="mb-10"></div>
                <p className="text-red text-l m-auto font-bold">{t("DeleteAccountWarning")}</p>
                <div className="inline-block">
                    <input type="checkbox" onChange={handleInputChange}></input>
                    <p className="text-red text-l m-auto font-bold inline ml-2">{t("DeleteAccountWithoutChecking")}</p>
                </div>
                {/* Bottom spacing */}
                <div className="mb-20"></div>
            </div>
            {/* Action Buttons */}
            <div className="buttonBar  flex justify-around pb-6  ml-5 md:ml-10 ">
                <div className="flex items-center justify-center  bottom-10 left-5 md:bottom-16 md:left-16 ">
                    <DiscardButton action={() => navigate(-1)} label="Back" />
                </div>
                <div className=" flex items-center justify-center  bottom-10 right-5 md:bottom-16 md:right-16 ">
                    <ActionButton
                        type="button"
                        disabled={disabled}
                        action={handleConfirmClick}
                        label="Confirm"
                    />
                </div>
            </div>

        </div>
    );
}

export default DeleteAccount;