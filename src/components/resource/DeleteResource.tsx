import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import AllotrLogo from "../../assets/AllotrLogo";
import ActionButton from "../generic/ActionButton";
import DiscardButton from "../generic/DiscardButton";
import { useMutation, useQuery } from "@apollo/client";
import { DeleteResourceMutation, DeleteResourceMutationVariables, ViewResource as ViewResourceGQL, DeleteResource as DeleteResourceGQL, ViewResourceQuery } from "allotr-graphql-schema-types";

function DeleteResource() {
    const { t } = useTranslation();
    // const _id = getSessionValue<any>(CURRENT_USER_DATA)?._id as string;
    const { id } = useParams<{ id: string }>();
    const { data, loading } = useQuery<ViewResourceQuery>(ViewResourceGQL, { variables: { resourceId: id } })
    const history = useHistory();
    const [disabled, setDisabled] = useState(false);
    const [callDeleteResource] = useMutation<DeleteResourceMutation, DeleteResourceMutationVariables>(DeleteResourceGQL)


    const deleteResource = async () => {
        setDisabled(true);
        const { errors } = await callDeleteResource({ variables: { resourceId: id ?? "" } });
        setDisabled(false);
        if (errors) {
            return;
        }
        history.push("/")

    }


    // Scroll to top when first loading the screen
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <div className="bg-blue-dark min-h-screen min-w-screen flex-cols items-center">
            {/* Top bar with title */}
            <div className="flex fixed bg-purple w-screen h-12 justify-between z-10">
                <p className="text-yellow text-2xl m-auto">{t("DeleteResource")}</p>
                <div className="absolute top-1 right-0 h-16 w-16">
                    <AllotrLogo width="40" height="40" className="flex"></AllotrLogo>
                </div>
            </div>

            <div className="form md:pt-20 ml-5 md:ml-10 pt-16 break-words">
                <p className="text-yellow text-xl m-auto">{t("AreYouSureDeleteResourceStart") + (!loading ? data?.viewResource?.name : "") + t("AreYouSureDeleteResourceEnd")}</p>
                <div className="mb-4"></div>
                <p className="text-blue-light text-l m-auto">{t("DeleteResourceWarining")}</p>
                <div className="mb-10"></div>

                {/* Bottom spacing */}
                <div className="mb-20"></div>
            </div>
            {/* Action Buttons */}
            <div className="buttonBar  flex justify-around pb-6  ml-5 md:ml-10 ">
                <div className="flex items-center justify-center  bottom-10 left-5 md:bottom-16 md:left-16 ">
                    <DiscardButton action={() => history.push(`/viewResource/${id}`)} label="Cancel" />
                </div>
                <div className=" flex items-center justify-center  bottom-10 right-5 md:bottom-16 md:right-16 ">
                    <ActionButton
                        type="button"
                        disabled={disabled}
                        action={deleteResource}
                        label="Confirm"
                    />
                </div>
            </div>

        </div>
    );
}

export default DeleteResource;