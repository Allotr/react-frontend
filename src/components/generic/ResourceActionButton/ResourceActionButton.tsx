import { ResourceCard, OperationResult, ReleaseResource, ReleaseResourceMutation, ReleaseResourceMutationVariables, RequestResource, RequestResourceMutation, RequestResourceMutationVariables, RequestSource, TicketStatusCode, ResourceView } from "allotr-graphql-schema-types";
import { ReactElement, useEffect, useState } from "react";
import ClosedLock from "../../../assets/ClosedLock";
import OpenLock from "../../../assets/OpenLock";
import { COLORS } from "../../../consts/colors";
import ActionButton from "../ActionButton/ActionButton";
import TurnIndicator from "../TurnIndicator";
import { useMutation } from "@apollo/client";

function ResourceActionButton({
    resourceId,
    ticketStatusCode,
    queuePosition = 0,
    requestFrom,
    isLoading = false,
    onActionSuccess = () => { }
}: {
    resourceId?: string,
    ticketStatusCode: TicketStatusCode,
    queuePosition: number | null | undefined,
    requestFrom: RequestSource,
    isLoading?: boolean
    onActionSuccess?: (resourceCard?: ResourceCard, resourceView?: ResourceView) => unknown

}) {

    const [callRequestResource] = useMutation<RequestResourceMutation, RequestResourceMutationVariables>(RequestResource)
    const [callReleaseResource] = useMutation<ReleaseResourceMutation, ReleaseResourceMutationVariables>(ReleaseResource)
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Add your init code
        setDisabled(true);
        setLoading(false);
    }, [])

    useEffect(() => {
        // Override isLoading with polling from main page
        setLoading(isLoading);
    }, [isLoading])

    useEffect(() => {
        // Enable when resourceId is ready
        setDisabled(resourceId == null);
    }, [resourceId])

    const releaseResource = async () => {
        if (resourceId == null) {
            return;
        }
        try {
            setDisabled(true);
            const call = callReleaseResource({ variables: { resourceId, requestFrom } });

            setLoading(true);
            const { data, errors } = await call;
            if (errors || data?.releaseResource?.status === OperationResult.Error) {
                throw errors;
            }

            switch (requestFrom) {
                case RequestSource.Home: {
                    const resourceCard = data?.releaseResource?.updatedResourceCard ?? undefined;
                    onActionSuccess(resourceCard, undefined);
                    break;
                }
                case RequestSource.Resource: {
                    const resourceView = data?.releaseResource?.updatedResourceView ?? undefined;
                    onActionSuccess(undefined, resourceView);
                    break;
                }
                default:
                    break;
            }
        } catch (error) {
            // Do nothing
        } finally {
            setLoading(false);
            setDisabled(false);
        }
    }

    const requestResource = async () => {
        if (resourceId == null) {
            return;
        }
        try {
            setDisabled(true);
            const call = callRequestResource({ variables: { resourceId, requestFrom } });

            setLoading(true);
            const { data, errors } = await call;

            if (errors || data?.requestResource?.status === OperationResult.Error) {
                throw errors;
            }
            switch (requestFrom) {
                case RequestSource.Home: {
                    const resourceCard = data?.requestResource?.updatedResourceCard ?? undefined;
                    onActionSuccess(resourceCard, undefined);
                    break;
                }
                case RequestSource.Resource: {
                    const resourceView = data?.requestResource?.updatedResourceView ?? undefined;
                    onActionSuccess(undefined, resourceView);
                    break;
                }
                default:
                    break;
            }
        } catch (error) {
            // Do nothing
        } finally {
            setLoading(false);
            setDisabled(false);
        }
    }

    const NONE =
        <div
            className="w-28 h-9" />;

    const RELEASE_BUTTON =
        <ActionButton
            action={releaseResource}
            label="ReleaseResource"
            logo={OpenLock}
            fill={COLORS.yellow.DEFAULT}
            disabled={disabled}
            textColorClass="text-yellow"
            hoverColorClass="hover:border-yellow"
            loadingAnimationClass="release-animation"
            isLoading={loading} />

    const REQUEST_BUTTON =
        <ActionButton
            action={requestResource}
            label="RequestResource"
            logo={ClosedLock}
            fill={COLORS.blue.light}
            disabled={disabled}
            loadingAnimationClass="request-animation"
            isLoading={loading} />

    const TURN_INDICATOR =
        <TurnIndicator
            queuePosition={queuePosition ?? 0} />

    const componentMap: Record<TicketStatusCode, ReactElement | null> = {
        ACTIVE: RELEASE_BUTTON,
        AWAITING_CONFIRMATION: NONE,
        INACTIVE: REQUEST_BUTTON,
        INITIALIZED: REQUEST_BUTTON,
        QUEUED: TURN_INDICATOR,
        REQUESTING: NONE,
        REVOKED: NONE
    }

    return (
        componentMap[ticketStatusCode]
    );
}

export default ResourceActionButton;