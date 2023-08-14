import { ExecutionResult, createClient } from "graphql-ws";
import { getGqlString } from "./data-utils";
import { getLoadedEnvVariables } from "./env-loader";
import { DocumentNode } from "@apollo/client";

let doSubscribe = async <T extends ExecutionResult<Record<string, unknown>, unknown>>(gqlQuery: DocumentNode, onNext: (newValue: T) => void): Promise<void> => {
    let instance: Promise<void> = Promise.resolve();

    doSubscribe = async (): Promise<void> => {
        if (await instance == null) {
            await createConnection();
        }
        return instance;
    }

    async function createConnection() {
        const { VITE_WS_API_ENDPOINT } = getLoadedEnvVariables();
        const client = createClient({ url: `${VITE_WS_API_ENDPOINT}/subscriptions` });
        const query = getGqlString(gqlQuery) ?? "";
        instance = new Promise<void>((resolve, reject) => {
            client.subscribe({ query }, { next: onNext, error: reject, complete: resolve });
        });
        return instance;
    }

    return await createConnection();
}



export { doSubscribe }