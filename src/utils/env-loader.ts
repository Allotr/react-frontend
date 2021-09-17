import { EnvObject } from "../types/env-object";

function getLoadedEnvVariables(): EnvObject {
    const variablesToLoad: Partial<EnvObject> = {
        REACT_APP_WS_API_ENDPOINT: undefined,
        REACT_APP_HTTPS_API_ENDPOINT: undefined,
        REACT_APP_GOOGLE_LOGIN_ENDPOINT: undefined,
        REACT_APP_GOOGLE_LOGOUT_ENDPOINT: undefined,
        REACT_APP_WEBPUSH_ENDPOINT: undefined,
        REACT_APP_REDIRECT_URL: undefined
    }
    const loadedVariables = Object.fromEntries(Object.entries(variablesToLoad).map(([key]) => ([key, process.env[key]]))) as EnvObject;
    areVariablesValid(loadedVariables);
    return loadedVariables;
}

function areVariablesValid(loadedVariables: Record<string, string | undefined>): loadedVariables is EnvObject {
    const invalidVariables = Object.entries(loadedVariables).filter(([, value]) => value == null);
    for (const [key] of invalidVariables) {
        throw new Error(`This app cannot be executed, make sure you set a valid value for ${key} inside the .env file`);
    }
    return invalidVariables.length === 0;
}

export { getLoadedEnvVariables }