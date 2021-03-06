import React, { useEffect, ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import ClosedLock from "../../assets/ClosedLock";
import OpenLock from "../../assets/OpenLock";
import ActionButton from "../generic/ActionButton";
import TurnIndicator from "../generic/TurnIndicator";
import { ResourceCard as ResourceCardType, TicketStatusCode, ReleaseResource, ReleaseResourceMutation, RequestResource, RequestResourceMutation, RequestResourceMutationVariables, ReleaseResourceMutationVariables, RequestSource } from "allotr-graphql-schema-types"
import ActiveUserStatus from "../generic/ActiveUserStatus";
import { Link } from "react-router-dom"
import { useMutation } from "@apollo/client";
import { COLORS } from "../../consts/colors";

function ResourceCard({
    resourceId,
    statusCode,
    name,
    description,
    lastModificationDate,
    activeUserCount,
    createdBy,
    queuePosition,
    maxActiveTickets,
    creationDate,
    lastStatusTimestamp,
    role,
    ticketId,
    loading
}: ResourceCardType & { loading: boolean }) {

    const [callRequestResource] = useMutation<RequestResourceMutation, RequestResourceMutationVariables>(RequestResource)
    const [callReleaseResource] = useMutation<ReleaseResourceMutation, ReleaseResourceMutationVariables>(ReleaseResource)
    const [disabled, setDisabled] = useState(false);
    const [currentCard, setCurrentCard] = useState<ResourceCardType>({
        resourceId,
        statusCode,
        name,
        description,
        lastModificationDate,
        activeUserCount,
        createdBy,
        queuePosition,
        maxActiveTickets,
        creationDate,
        lastStatusTimestamp,
        role,
        ticketId
    });

    useEffect(() => {
        setDisabled(loading);
    }, [loading])

    const { t } = useTranslation();
    useEffect(() => {
        setCurrentCard({
            resourceId,
            statusCode,
            name,
            description,
            lastModificationDate,
            activeUserCount,
            createdBy,
            queuePosition,
            maxActiveTickets,
            creationDate,
            lastStatusTimestamp,
            role,
            ticketId
        })
    }, [resourceId,
        statusCode,
        name,
        description,
        lastModificationDate,
        activeUserCount,
        createdBy,
        queuePosition,
        maxActiveTickets,
        creationDate,
        lastStatusTimestamp,
        role,
        ticketId])

    const releaseResource = async () => {
        setDisabled(true);
        const { data, errors } = await callReleaseResource({ variables: { resourceId, requestFrom: RequestSource.Home } });
        setDisabled(false);
        if (errors) {
            return;
        }
        const resourceCard = data?.releaseResource.updatedResourceCard as ResourceCardType;
        setCurrentCard(resourceCard);
    }

    const requestResource = async () => {
        setDisabled(true);
        const { data, errors } = await callRequestResource({ variables: { resourceId, requestFrom: RequestSource.Home } });
        setDisabled(false);
        if (errors) {
            return;
        }
        const resourceCard = data?.requestResource.updatedResourceCard as ResourceCardType;
        setCurrentCard(resourceCard);
    }


    const componentMap: Record<TicketStatusCode, ReactElement | null> = {
        ACTIVE: <ActionButton action={releaseResource} label="ReleaseResource" logo={OpenLock} fill={COLORS.blue.light} disabled={disabled} ></ActionButton>,
        AWAITING_CONFIRMATION: <div className="w-28 h-9" />,
        INACTIVE: <ActionButton action={requestResource} label="RequestResource" logo={ClosedLock} fill={COLORS.blue.light} disabled={disabled}></ActionButton>,
        INITIALIZED: <ActionButton action={requestResource} label="RequestResource" logo={ClosedLock} fill={COLORS.blue.light} disabled={disabled}></ActionButton>,
        QUEUED: <TurnIndicator queuePosition={currentCard.queuePosition ?? 0} ></TurnIndicator>,
        REQUESTING: <div className="w-28 h-9" />,
        REVOKED: <div className="w-28 h-9" />
    }

    return (
        <div className="resourceCard bg-purple-dark min-h-32 w-11/12 m-auto mt-10 flex justify-between break-all md:break-normal pb-7">
            <div className="self-start mt-4 ml-2">
                <ActiveUserStatus currentUsers={currentCard.activeUserCount} maxUsers={currentCard.maxActiveTickets} key={1} />
            </div>
            <div className="flex-col flex-grow ml-3">
                <div className="mt-3"></div>
                <Link to={`/viewResource/${currentCard.resourceId}`} className="text-yellow text-base text-left  hover:underline"> {name}</Link>
                <p className="text-blue text-xs text-left">{`${t("CreatedBy")}${currentCard.createdBy?.username ?? ""}`}</p>
                <p className="text-blue-light text-sm text-left mt-3">{currentCard.description}</p>
                {/* TODO: Change forced locale once used internationally */}
                <p className="text-blue-light text-xs text-left mt-3 break-words">{`${t("LastUpdate")}\r\n${new Date(currentCard.lastModificationDate).toLocaleDateString("es-ES")}\t${new Date(currentCard.lastModificationDate).toLocaleTimeString("es-ES")}`}</p>
            </div>

            <div className="mt-4 ml-2 mr-3  self-start">{componentMap[currentCard.statusCode]}</div>
        </div>
    );
}

export default ResourceCard;