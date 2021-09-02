import React, { useEffect, useState } from "react";
import { SubscriptionCaller } from "../../utils/subscription-caller";
import NotificationDialog from "./NotificaitonDialog";
import { MyNotificationData, MyNotificationDataQuery, MyNotificationDataSub, MyNotificationDataSubSubscription, ResourceNotification } from "allotr-graphql-schema-types"
import { useQuery } from "@apollo/client";

function NotificationDialogParent() {
    const [myNotifications, setMyNotifications] = useState<ResourceNotification[]>([]);
    const { data, error, loading } = useQuery<MyNotificationDataQuery>(MyNotificationData);
    SubscriptionCaller.getInstance().doSubscribe<{ data: MyNotificationDataSubSubscription }>(MyNotificationDataSub, newValue => {
        setMyNotifications([]);
        setMyNotifications(newValue?.data?.myNotificationDataSub);
    });

    useEffect(() => {
        if (loading || error) return;
        setMyNotifications(data?.myNotificationData ?? []);
    }, [data, loading, error])

    return (
        <NotificationDialog data={myNotifications}></NotificationDialog>
    );
}

export default NotificationDialogParent;