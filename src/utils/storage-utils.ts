function getSessionValue<T extends object>(key: string): T {
    return JSON.parse(window.atob(window.sessionStorage.getItem(key) ?? "") || "{}");
}

function setSessionValue<T extends object>(key: string, value: T): void {
    window.sessionStorage.setItem(key, window.btoa(JSON.stringify(value)));
}

function deleteSessionValue(key: string): void {
    window.sessionStorage.removeItem(key);
}



export { getSessionValue, setSessionValue, deleteSessionValue }
