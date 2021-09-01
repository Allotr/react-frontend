import React, { useEffect } from "react";
import { SubscriptionCaller } from "../../utils/subscription-caller";
import NotificationDialog from "./NotificaitonDialog";
import { NewResourceReady, NewResourceReadySubscription } from "allotr-graphql-schema-types"

function NotificationDialogParent(props: any) {
    const [value, setValue] = React.useState(props.value);
    useEffect(() => {
        // Init call
        SubscriptionCaller.getInstance().doSubscribe<{ data: NewResourceReadySubscription }>(NewResourceReady, newValue => {
            setValue(""); // To force change values
            console.log("New value", newValue);
            setValue(newValue?.data?.newResourceReady?.id ?? "")
        });
    }, [])

    return (
        <NotificationDialog value={value}></NotificationDialog>
    );
}

export default NotificationDialogParent;