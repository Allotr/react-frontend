import React, { useEffect, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import ClosedLock from "../../assets/ClosedLock";
import OpenLock from "../../assets/OpenLock";
import ActionButton from "../generic/ActionButton";
import TurnIndicator from "../generic/TurnIndicator";
import { TicketStatusCode } from "allotr-graphql-schema-types"
import ActiveUserStatus from "../generic/ActiveUserStatus";
import { Link } from "react-router-dom"

function ResourceCard({
    resourceId,
    statusCode,
    name,
    description,
    lastModificationDate,
    activeUserCount,
    createdBy,
    maxActiveTickets }: {
        resourceId: string,
        statusCode: TicketStatusCode,
        name: string,
        description?: string | null,
        lastModificationDate: Date,
        activeUserCount: number,
        maxActiveTickets: number,
        createdBy?: { userId?: string | null, username?: string | null } | undefined | null
    }) {
    const { t } = useTranslation();
    useEffect(() => {
        // Add your init code
    }, [])
    const action = () => { };
    const queuePosition = 69;
    const componentMap: Record<TicketStatusCode, ReactElement | null> = {
        ACTIVE: <ActionButton action={action} label="ReleaseResource" logo={OpenLock} fill="#5ABAFF"></ActionButton>,
        AWAITING_CONFIRMATION: <div className="w-28 h-9" />,
        INACTIVE: <ActionButton action={action} label="RequestResource" logo={ClosedLock} fill="#5ABAFF"></ActionButton>,
        INITIALIZED: <ActionButton action={action} label="RequestResource" logo={ClosedLock} fill="#5ABAFF"></ActionButton>,
        QUEUED: <TurnIndicator queuePosition={queuePosition} ></TurnIndicator>,
        REQUESTING: <div className="w-28 h-9" />,
        REVOKED: <div className="w-28 h-9" />
    }

    return (
        <div className="resourceCard bg-purple-dark min-h-32 w-11/12 m-auto mt-10 flex justify-between break-all md:break-normal pb-7">
            <div className="self-start mt-4 ml-2">
                <ActiveUserStatus currentUsers={activeUserCount} maxUsers={maxActiveTickets} key={1} />
            </div>
            <div className="flex-col flex-grow ml-3">
                <div className="mt-3"></div>
                <Link to={`/viewResource/${resourceId}`} className="text-yellow text-base text-left  hover:underline"> {name}</Link>
                <p className="text-blue text-xs text-left">{`${t("CreatedBy")}${createdBy?.username ?? ""}`}</p>
                <p className="text-blue-light text-sm text-left mt-3">{description}</p>
                <p className="text-blue-light text-xs text-left mt-3 break-words">{`${t("LastUpdate")}:\r\n${new Date(lastModificationDate).toLocaleDateString("es-ES").substring(0, 10)}`}</p>
            </div>

            <div className="mt-4 ml-2 mr-3  self-start">{componentMap[statusCode]}</div>
        </div>
    );
}

export default ResourceCard;