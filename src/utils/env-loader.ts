import { EnvObject } from "../types/env-object";

function getLoadedEnvVariables(): EnvObject {
    const variablesToLoad: Partial<EnvObject> = {
        VITE_WS_API_ENDPOINT: undefined,
        VITE_HTTPS_API_ENDPOINT: undefined,
        VITE_GOOGLE_LOGIN_ENDPOINT: undefined,
        VITE_GOOGLE_LOGOUT_ENDPOINT: undefined,
        VITE_WEBPUSH_ENDPOINT: undefined,
        VITE_REDIRECT_URL: undefined
    }
    const loadedVariables = Object.fromEntries(Object.entries(variablesToLoad).map(([key]) => ([key, import.meta.env[key]]))) as EnvObject;
    areVariablesValid(loadedVariables);
    return loadedVariables;
}

function areVariablesValid(loadedVariables: Record<string, string | undefined>): loadedVariables is EnvObject {
    const invalidVariables = Object.entries(loadedVariables).filter(([, value]) => value == null);
    if (invalidVariables.length > 0) {
        throw new Error(`This app cannot be executed, make sure you set a valid value for ${invalidVariables.map(([key])=> key).join(", ")} inside the .env file`);
    }
    return invalidVariables.length === 0;
}

export { getLoadedEnvVariables }