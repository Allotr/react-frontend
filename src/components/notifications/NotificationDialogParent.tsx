import React, { useEffect, useState } from "react";
import { doSubscribe } from "../../utils/subscription-caller";
import NotificationDialog from "./NotificaitonDialog";
import { MyNotificationData, MyNotificationDataQuery, MyNotificationDataSub, MyNotificationDataSubSubscription, ResourceNotification, UserDbObject } from "allotr-graphql-schema-types"
import { useQuery } from "@apollo/client";
import { CURRENT_USER_DATA } from "../../consts/global_session_keys";
import { getSessionValue } from "../../utils/storage-utils";

function NotificationDialogParent() {
    const resourceAvailableNotification = "ResourceAvailableNotification";
    const [myNotifications, setMyNotifications] = useState<ResourceNotification[]>([]);
    const { data, error, loading } = useQuery<MyNotificationDataQuery>(MyNotificationData);
    const { _id } = getSessionValue<UserDbObject>(CURRENT_USER_DATA);

    if (_id != null) {
        doSubscribe<{ data: MyNotificationDataSubSubscription }>(MyNotificationDataSub, newValue => {
            const filteredNotifications = newValue?.data?.myNotificationDataSub.filter(({ titleRef }) => titleRef === resourceAvailableNotification)
            if (filteredNotifications.length === 0)
                return
            setMyNotifications([]);
            setMyNotifications(filteredNotifications);
        });
    }


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