import { createClient } from "graphql-ws";
import { getGqlString } from "./data-utils";
import { EnvLoader } from "./env-loader";
import { DocumentNode } from "@apollo/react-hooks";
export class SubscriptionCaller {

    private wsEndpoint: string;
    private httpsEndpoint: string;
    private static instance: SubscriptionCaller;
    private constructor() {
        const { REACT_APP_WS_API_ENDPOINT, REACT_APP_HTTPS_API_ENDPOINT } = EnvLoader.getInstance().loadedVariables;
        this.wsEndpoint = REACT_APP_WS_API_ENDPOINT ?? "";
        this.httpsEndpoint = REACT_APP_HTTPS_API_ENDPOINT ?? "";
    }

    public static getInstance(): SubscriptionCaller {
        if (SubscriptionCaller.instance == null) {
            SubscriptionCaller.instance = new SubscriptionCaller();
        }
        return SubscriptionCaller.instance;
    }


    public doSubscribe<T>(gqlQuery: DocumentNode, onNext: (newValue: T) => void): void {

        // To implement API inside
        const client = createClient({ url: `${this.wsEndpoint}/subscriptions` });
        console.log("Entra e intenta conectar", client);
        const query = getGqlString(gqlQuery) ?? ""  
        new Promise<void>((resolve, reject) => {
            client.subscribe({ query }, { next: onNext, error: reject, complete: resolve });
        });
    }


}