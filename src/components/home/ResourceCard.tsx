import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ResourceCard as ResourceCardType, TicketStatusCode, RequestSource } from "allotr-graphql-schema-types"
import ActiveUserStatus from "../generic/ActiveUserStatus";
import { Link } from "react-router-dom"
import ResourceActionButton from "../generic/ResourceActionButton/ResourceActionButton";

function ResourceCard({
    id,
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
    isLoading
}: ResourceCardType & {isLoading?: boolean}) {

    const [currentCard, setCurrentCard] = useState<ResourceCardType>({
        id,
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


    const { t } = useTranslation();
    useEffect(() => {
        setCurrentCard({
            id,
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
    }, [id,
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

    const onActionSuccess = (resourceCard?: ResourceCardType) => {
        if (resourceCard == null){
            return;
        }
        setCurrentCard(resourceCard);
    }

    const borderColorByStatus: Record<TicketStatusCode, string> = {
        ACTIVE: "border-yellow",
        AWAITING_CONFIRMATION: "border-blue-light",
        INACTIVE: "border-purple",
        INITIALIZED: "border-purple",
        QUEUED: "border-blue-light",
        REQUESTING: "border-blue-light",
        REVOKED: "border-purple"
    }

    return (
        <div className={"resourceCard bg-purple-dark min-h-32 w-11/12 m-auto mt-10 flex justify-between break-all md:break-normal pb-7 border-2 " + borderColorByStatus[currentCard.statusCode]}>
            <div className="self-start mt-4 ml-2">
                <ActiveUserStatus currentUsers={currentCard.activeUserCount} maxUsers={currentCard.maxActiveTickets} key={1} />
            </div>
            <div className="flex-col flex-grow ml-3">
                <div className="mt-3"></div>
                <Link to={`/viewResource/${currentCard.id}`} className="text-yellow text-base text-left  hover:underline font-bold"> {name}</Link>
                <div className="-mt-1.5">
                    <p className="text-blue-light text-xs text-left inline">{t("CreatedBy")}
                    </p>
                    <p className="text-blue-light text-xs text-left inline font-semibold">{`${currentCard.createdBy?.username ?? ""}`}</p>
                </div>
                <p className="text-blue-light text-sm text-left mt-3 hyphens-auto" lang="es" >{currentCard.description}</p>
                <p className="text-blue-light text-xs text-left mt-3 break-words font-thin italic">{t("LastUpdate")}</p>
                {/* TODO: Change forced locale once used internationally */}
                <p className="text-blue-light text-xs text-left mt-3 break-words inline font-thin not-italic">
                    {`\n${new Date(currentCard.lastModificationDate).toLocaleDateString("es-ES")}\t${new Date(currentCard.lastModificationDate).toLocaleTimeString("es-ES")}`}
                </p>
            </div>

            <div className="mt-4 ml-2 mr-3  self-start">
                <ResourceActionButton
                    resourceId={currentCard.id}
                    ticketStatusCode={currentCard?.statusCode}
                    queuePosition={currentCard?.queuePosition}
                    requestFrom={RequestSource.Home}
                    onActionSuccess={onActionSuccess}
                    isLoading={isLoading}
                ></ResourceActionButton>
            </div>
        </div>
    );
}

export default ResourceCard;