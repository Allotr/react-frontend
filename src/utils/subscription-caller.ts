import { createClient } from "graphql-ws";
import { getGqlString } from "./data-utils";
import { EnvLoader } from "./env-loader";
import { DocumentNode } from "@apollo/react-hooks";
import { UserDbObject } from "allotr-graphql-schema-types";
import { CURRENT_USER_DATA } from "../consts/global_session_keys";
import { getSessionValue } from "./storage-utils";
export class SubscriptionCaller {

    private wsEndpoint: string;
    private static instance: SubscriptionCaller;
    private constructor() {
        const { REACT_APP_WS_API_ENDPOINT } = EnvLoader.getInstance().loadedVariables;
        this.wsEndpoint = REACT_APP_WS_API_ENDPOINT ?? "";
    }

    public static getInstance(): SubscriptionCaller {
        if (SubscriptionCaller.instance == null) {
            SubscriptionCaller.instance = new SubscriptionCaller();
        }
        return SubscriptionCaller.instance;
    }


    public doSubscribe<T>(gqlQuery: DocumentNode, onNext: (newValue: T) => void): void {
        const { _id } = getSessionValue<UserDbObject>(CURRENT_USER_DATA);
        const client = createClient({ url: `${this.wsEndpoint}/subscriptions` });
        const query = getGqlString(gqlQuery) ?? "";
        const intervalId = setInterval(() => {
            if(!_id) return;
            new Promise<void>((resolve, reject) => {
                client.subscribe({ query }, { next: onNext, error: reject, complete: resolve });
            });
            clearInterval(intervalId)
        }, 1000);

    }


}