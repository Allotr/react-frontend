export interface EnvObject extends Record<string, string> {
    VITE_WS_API_ENDPOINT: string,
    VITE_HTTPS_API_ENDPOINT: string,
    VITE_GOOGLE_LOGIN_ENDPOINT: string,
    VITE_GOOGLE_LOGOUT_ENDPOINT: string,
    VITE_WEBPUSH_ENDPOINT: string,
    VITE_REDIRECT_URL: string
}