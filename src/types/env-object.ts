export interface EnvObject extends Record<string, string> {
    REACT_APP_WS_API_ENDPOINT: string,
    REACT_APP_HTTPS_API_ENDPOINT: string,
    REACT_APP_GOOGLE_LOGIN_ENDPOINT: string,
    REACT_APP_GOOGLE_LOGOUT_ENDPOINT: string,
    REACT_APP_WEBPUSH_ENDPOINT: string,
    REACT_APP_REDIRECT_URL: string
}