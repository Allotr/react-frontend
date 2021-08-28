import { createClient } from "graphql-ws";
import { EnvLoader } from "./env-loader";
export class ApiCaller {

    private wsEndpoint: string;
    private httpsEndpoint: string;
    private static instance: ApiCaller;
    private constructor() {
        const { REACT_APP_WS_API_ENDPOINT, REACT_APP_HTTPS_API_ENDPOINT } = EnvLoader.getInstance().loadedVariables;
        this.wsEndpoint = REACT_APP_WS_API_ENDPOINT ?? "";
        this.httpsEndpoint = REACT_APP_HTTPS_API_ENDPOINT ?? "";
    }

    public static getInstance(): ApiCaller {
        if (ApiCaller.instance == null) {
            ApiCaller.instance = new ApiCaller();
        }
        return ApiCaller.instance;
    }


    public doSubscribe<T>(onNext: (newValue: T) => void): void {

        // To implement API inside
        const client = createClient({
            url: `${this.wsEndpoint}/subscriptions`
        });

        new Promise<void>((resolve, reject) => {
            client.subscribe({ query: 'subscription { newUpdate {result} }' }, { next: onNext, error: reject, complete: resolve });
        });
    }


}