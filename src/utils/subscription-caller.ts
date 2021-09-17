import { createClient } from "graphql-ws";
import { getGqlString } from "./data-utils";
import { DocumentNode } from "@apollo/react-hooks";
import { UserDbObject } from "allotr-graphql-schema-types";
import { CURRENT_USER_DATA } from "../consts/global_session_keys";
import { getSessionValue } from "./storage-utils";
import { getLoadedEnvVariables } from "./env-loader";

const doSubscribe = <T>(gqlQuery: DocumentNode, onNext: (newValue: T) => void): void => {
    const { REACT_APP_WS_API_ENDPOINT } = getLoadedEnvVariables();
    const { _id } = getSessionValue<UserDbObject>(CURRENT_USER_DATA);
    const client = createClient({ url: `${REACT_APP_WS_API_ENDPOINT}/subscriptions` });
    const query = getGqlString(gqlQuery) ?? "";
    const intervalId = setInterval(() => {
        if (!_id) return;
        new Promise<void>((resolve, reject) => {
            client.subscribe({ query }, { next: onNext, error: reject, complete: resolve });
        });
        clearInterval(intervalId)
    }, 1000);
    return;
}



export { doSubscribe }