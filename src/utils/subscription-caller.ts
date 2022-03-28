import { createClient } from "graphql-ws";
import { getGqlString } from "./data-utils";
import { DocumentNode } from "@apollo/react-hooks";
import { getLoadedEnvVariables } from "./env-loader";

let doSubscribe = async <T>(gqlQuery: DocumentNode, onNext: (newValue: T) => void): Promise<void> => {
    var instance: Promise<void> = Promise.resolve();

    doSubscribe = async <T>(gqlQuery: DocumentNode, onNext: (newValue: T) => void): Promise<void> => {
        if (await instance == null) {
            await createConnection();
        }
        return instance;
    }

    async function createConnection() {
        const { REACT_APP_WS_API_ENDPOINT } = getLoadedEnvVariables();
        const client = createClient({ url: `${REACT_APP_WS_API_ENDPOINT}/subscriptions` });
        const query = getGqlString(gqlQuery) ?? "";
        instance = new Promise<void>((resolve, reject) => {
            client.subscribe({ query }, { next: onNext, error: reject, complete: resolve });
        });
        return instance;
    }

    return await createConnection();
}



export { doSubscribe }