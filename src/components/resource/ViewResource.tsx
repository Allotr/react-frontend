import React, { ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AllotrLogo from "../../assets/AllotrLogo";
import DiscardButton from "../generic/DiscardButton";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ViewResourceQuery, ViewResource as ViewResourceGQL, ResourceView, LocalRole, TicketStatusCode, RequestSource, UserDbObject, ReleaseResource, ReleaseResourceMutation, ReleaseResourceMutationVariables, RequestResource, RequestResourceMutation, RequestResourceMutationVariables, TicketView } from "allotr-graphql-schema-types";
import Key from "../../assets/Key";
import { COLORS } from "../../consts/colors";
import MiniActionButton from "../generic/MiniActionButton";
import QuestionMark from "../../assets/QuestionMark";
import ClosedLock from "../../assets/ClosedLock";
import Clock from "../../assets/Clock";
import { CURRENT_USER_DATA } from "../../consts/global_session_keys";
import { getSessionValue } from "../../utils/storage-utils";
import TrashCan from "../../assets/TrashCan";
import EditPen from "../../assets/EditPen";
import ResourceActionButton from "../generic/ResourceActionButton/ResourceActionButton";

function ViewResource() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { _id } = getSessionValue<UserDbObject>(CURRENT_USER_DATA);

    const { id } = useParams<{ id: string }>();

    // GraphQL data queries/mutations
    const { data, loading, error } = useQuery<ViewResourceQuery>(ViewResourceGQL, { variables: { resourceId: id }, pollInterval: 300 })

    const [ticketListToShow, setTicketListToShow] = useState<TicketView[]>([]);
    const [myTicket, setMyTicket] = useState<TicketView | undefined>();
    const [viewResource, setViewResource] = useState<ResourceView>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Scroll to top when first loading the screen
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const statusIndicatorMap: Record<TicketStatusCode, ReactElement | null> = {
        ACTIVE: <ClosedLock fill={COLORS.yellow.DEFAULT} height="25px" width="25px"></ClosedLock>,
        AWAITING_CONFIRMATION: <QuestionMark fill={COLORS.yellow.DEFAULT} height="25px" width="25px"></QuestionMark>,
        QUEUED: <Clock fill={COLORS.yellow.DEFAULT} height="25px" width="25px"></Clock>,
        INACTIVE: null,
        INITIALIZED: null,
        REQUESTING: null,
        REVOKED: null
    }

    useEffect(() => {
        if (error || (!loading && data?.viewResource == null)) {
            navigate(-1);
            return;
        }
        if (loading) {
            return;
        }
        setViewResource(data?.viewResource as ResourceView);
        setIsLoading(false);
    }, [data, loading, error, navigate])

    useEffect(() => {
        const ticketList = viewResource?.tickets ?? [];
        setTicketListToShow(ticketList.filter(({ lastStatus }) => [
            TicketStatusCode.Active,
            TicketStatusCode.AwaitingConfirmation,
            TicketStatusCode.Queued
        ].includes(lastStatus.statusCode)));
        setMyTicket(ticketList.find(({ user }) => user.userId === _id))
    }, [viewResource, _id, navigate])

    useEffect(() => {
        // Add your init code
    }, [])


    return (
        <div className="bg-blue-dark min-h-screen min-w-screen flex-cols items-center">
            {/* Top bar with title */}
            <div className="flex fixed bg-purple w-screen h-12 justify-between z-10">
                <p className="text-yellow text-2xl m-auto">{t("ViewResource")}</p>
                <div className="absolute top-1 right-0 h-16 w-16">
                    <AllotrLogo width="40" height="40" className="flex"></AllotrLogo>
                </div>
            </div>
            <div className="form md:pt-20 md:pl-8 pt-16 pl-2 break-words">
                {/* Name */}
                <div className="flex justify-between mr-4">
                    <p className="text-blue-light text-3xl text-left ml-3 m-auto block" >
                        {`${t("NameViewResource")}`}
                    </p>
                    {myTicket?.user.role === LocalRole.ResourceAdmin ?
                        <div className="flex">
                            <div><MiniActionButton action={() => { navigate(`/editResource/${id}`) }} fill={COLORS.blue.light} logo={EditPen} ariaLabel="EditResource"></MiniActionButton></div>
                            <div className="w-2"></div>
                            <div><MiniActionButton action={() => { navigate(`/deleteResource/${id}`) }} fill={COLORS.blue.light} logo={TrashCan} ariaLabel="DeleteResource"></MiniActionButton></div>
                        </div>
                        : <div className="flex h-14" />}

                </div>
                <p className={`block mt-3 text-yellow ml-3 pl-3 w-4/5 ${viewResource?.name == null ? "italic" : ""}`}>
                    {viewResource?.name ?? t("LoadingText")}
                </p>
                {/* Description */}
                <p className="text-blue-light text-3xl text-left ml-3 m-auto block" >
                    {t("DescriptionViewResource")}
                </p>
                <p className={`block mt-3 pt-1 mb-5  text-yellow ml-3  pl-3 w-4/5 ${!viewResource?.description ? "italic" : ""}`}>
                    {viewResource?.description === "" ? t("NoDescription") : viewResource?.description ?? t("LoadingText")}</p>

                {/* Max Active tickets */}
                <p className="text-blue-light text-3xl text-left ml-3 m-auto block" >
                    {`${t("MaxUsersViewResource")}`}
                </p>
                <p className={`block mt-3 text-yellow ml-3 h-10 pl-3 w-1/4 ${viewResource?.maxActiveTickets == null ? "italic" : ""}`}>
                    {viewResource?.maxActiveTickets ?? t("LoadingNumber")}
                </p>
                {/* View active users and queue */}
                <p className="text-blue-light text-3xl text-left ml-3 mt-2 m-auto block">
                    {`${t("UsersViewResource")}`}
                </p>
                <div className="mt-3 ml-2 pb-5 h-48 overflow-y-scroll w-11/12">
                    {viewResource == null && <p className="text-yellow block text-left pt-4 pl-3 italic">{t("LoadingText")}</p>}
                    {ticketListToShow.length > 0 ? ticketListToShow.map(ticket => (
                        <div className="mb-2 flex h-14 justify-between" key={ticket.user.userId}>
                            {/* User data */}
                            <p className="text-yellow block text-left pt-4 pl-3">{ticket.user.name} {ticket.user.surname} - {ticket.user.username}</p>
                            {/* Admin button */}
                            <div className="flex justify-items-end">
                                <div className="">
                                    <div className="h-14 w-14  border-2 border-transparent flex justify-between">
                                        <div className="m-auto inline-block  align-middle">
                                            {ticket.user.role === LocalRole.ResourceAdmin ? <Key height="25px"
                                                width="25px"
                                                fill={COLORS.yellow.DEFAULT}
                                            ></Key> : null}

                                        </div>
                                    </div>
                                </div>
                                {/* Separation line */}
                                <div className="w-2"></div>
                                {/* Delete button */}
                                <div className="">
                                    <div className="h-14 w-14  border-2 border-transparent flex justify-between">
                                        <div className="m-auto inline-block  align-middle">
                                            {statusIndicatorMap[ticket.lastStatus.statusCode]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : viewResource != null && <p className="text-yellow block text-left pt-4 pl-3 italic">{t("NoUsersActive")}</p>}
                </div>

                {/* Bottom spacing */}
                <div className="mb-10"></div>
            </div>

            {/* Action Buttons */}
            <div className="buttonBar  flex justify-around pb-6">
                <div className=" flex items-center justify-center  bottom-10 left-5 md:bottom-16 md:left-16 ">
                    <DiscardButton action={() => navigate(-1)} label="Back" />
                </div>
                <div className=" flex items-center justify-center  bottom-10 right-5 md:bottom-16 md:right-16 ">
                    <div className="self-start">
                        <ResourceActionButton
                            resourceId={viewResource?.id}
                            ticketStatusCode={myTicket?.lastStatus.statusCode ?? TicketStatusCode.Revoked}
                            queuePosition={myTicket?.lastStatus.queuePosition}
                            requestFrom={RequestSource.Resource}
                            isLoading={isLoading}
                        ></ResourceActionButton>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ViewResource;