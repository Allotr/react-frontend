import React, { useEffect, useState } from "react";
import { doSubscribe } from "../../utils/subscription-caller";
import NotificationDialog from "./NotificaitonDialog";
import { MyNotificationData, MyNotificationDataQuery, MyNotificationDataSub, MyNotificationDataSubSubscription, ResourceNotification } from "allotr-graphql-schema-types"
import { useQuery } from "@apollo/client";

function NotificationDialogParent() {
    const resourceAvailableNotification = "ResourceAvailableNotification";
    const [myNotifications, setMyNotifications] = useState<ResourceNotification[]>([]);
    const { data, error, loading } = useQuery<MyNotificationDataQuery>(MyNotificationData);
    doSubscribe<{ data: MyNotificationDataSubSubscription }>(MyNotificationDataSub, newValue => {
        const filteredNotifications = newValue?.data?.myNotificationDataSub.filter(({ titleRef }) => titleRef === resourceAvailableNotification)
        if (filteredNotifications.length === 0)
            return
        setMyNotifications([]);
        setMyNotifications(filteredNotifications);
    });

    useEffect(() => {
        if (loading || error) return;

        const filteredNotifications = data?.myNotificationData?.filter(({ titleRef }) => titleRef === resourceAvailableNotification) ?? []
        if (filteredNotifications.length === 0)
            return

        setMyNotifications(filteredNotifications ?? []);
    }, [data, loading, error])

    return (
        <NotificationDialog data={myNotifications}></NotificationDialog>
    );
}

export default NotificationDialogParent;