import React, { useEffect, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import ClosedLock from "../../assets/ClosedLock";
import OpenLock from "../../assets/OpenLock";
import ActionButton from "../generic/ActionButton";
import TurnIndicator from "../generic/TurnIndicator";
import { TicketStatusCode } from "allotr-graphql-schema-types"
import ActiveUserStatus from "../generic/ActiveUserStatus";

function ResourceCard({ status, name, description, lastUpdateDate, currentUsers, maxUsers }: { status: TicketStatusCode, name: string, description: string, lastUpdateDate: Date, currentUsers: number, maxUsers: number }) {
    const { t } = useTranslation();
    useEffect(() => {
        // Add your init code
    }, [])
    const action = () => { };
    const queuePosition = 69;
    const componentMap: Record<TicketStatusCode, ReactElement | null> = {
        ACTIVE: <ActionButton action={action} label="ReleaseResource" logo={ClosedLock} fill="#5ABAFF"></ActionButton>,
        AWAITING_CONFIRMATION: <div className="w-28 h-9" />,
        INACTIVE: <ActionButton action={action} label="RequestResource" logo={OpenLock} fill="#5ABAFF"></ActionButton>,
        INITIALIZED: <ActionButton action={action} label="RequestResource" logo={OpenLock} fill="#5ABAFF"></ActionButton>,
        QUEUED: <TurnIndicator queuePosition={queuePosition} ></TurnIndicator>,
        REQUESTING: <div className="w-28 h-9" />,
        REVOKED: <div className="w-28 h-9" />
    }

    return (
        <div className="resourceCard bg-purple-dark min-h-32 w-11/12 m-auto mt-10 flex justify-between break-all md:break-normal pb-7">
            <div className="self-start mt-4 ml-2">
                <ActiveUserStatus currentUsers={currentUsers} maxUsers={maxUsers} key={1} />
            </div>
            <div className="flex-col flex-grow ml-3">
                <p className="text-yellow text-base text-left mt-3">{name}</p>
                <p className="text-blue-light text-sm text-left mt-3">{description}</p>
                <p className="text-blue-light text-xs text-left mt-3 break-words">{`${t("LastUpdate")}:\r\n${lastUpdateDate.toISOString().substring(0, 10)}`}</p>
            </div>

            <div className="mt-4 ml-2 mr-3  self-start">{componentMap[status]}</div>
        </div>
    );
}

export default ResourceCard;