// This optional code is used to register a service worker.
// register() is not called by default.
import { getLoadedEnvVariables } from './utils/env-loader';

type Config = {
    onSuccess?: (registration: ServiceWorkerRegistration) => void;
    onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
    if ('serviceWorker' in navigator) {
        // The URL constructor is available in all browsers that support SW.
        const publicUrl = new URL('./', window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            // Our service worker won't work if PUBLIC_URL is on a different origin
            // from what our page is served on. This might happen if a CDN is used to
            // serve assets; see https://github.com/facebook/create-react-app/issues/2374
            return;
        }

        window.addEventListener('load', () => {
            const swUrl = `./service-worker.js`;
            registerValidSW(swUrl, config);
        });
    }
}

function registerValidSW(swUrl: string, config?: Config) {
    navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (installingWorker == null) {
                    return;
                }
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            // At this point, the updated precached content has been fetched,
                            // but the previous service worker will still serve the older
                            // content until all client tabs are closed.
                            console.log(
                                'New content is available and will be used when all ' +
                                'tabs for this page are closed. See https://cra.link/PWA.'
                            );

                            // Execute callback
                            if (config && config.onUpdate) {
                                config.onUpdate(registration);
                            }
                        } else {
                            // At this point, everything has been precached.
                            // It's the perfect time to display a
                            // "Content is cached for offline use." message.
                            console.log('Content is cached for offline use.');

                            // Execute callback
                            if (config && config.onSuccess) {
                                config.onSuccess(registration);
                            }
                        }
                    }
                };
            };
        })
        .catch((error) => {
            console.error('Error during service worker registration:', error);
        });
}


// Get the `registration` from service worker and create a new
// subscription using `registration.pushManager.subscribe`. Then
// register received new subscription by sending a POST request with
// the subscription to the server.
// export function register() {

const { VITE_WEBPUSH_ENDPOINT } = getLoadedEnvVariables();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
        .then(async function (registration) {

            // Get the server's public key
            const response = await fetch(`${VITE_WEBPUSH_ENDPOINT}/webpush/vapidPublicKey`, { credentials: "include" });
            const vapidPublicKey = await response.text();
            // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
            // urlBase64ToUint8Array() is defined in /tools.js
            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
            // Subscribe the user
            return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey
            });
        }).then(function (subscription) {
            return fetch(`${VITE_WEBPUSH_ENDPOINT}/webpush/register`, {
                credentials: "include",
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    subscription: subscription
                })
            });
        });
}
//   }

// // Get existing subscription from service worker, unsubscribe
// // (`subscription.unsubscribe()`) and unregister it in the server with
// // a POST request to stop sending push messages to
// // unexisting endpoint.
export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then(function (registration) {
                return registration.pushManager.getSubscription();
            }).then(function (subscription) {
                return subscription?.unsubscribe()
                    .then(function () {
                        return fetch(`${VITE_WEBPUSH_ENDPOINT}/webpush/unregister`, {
                            credentials: "include",
                            method: 'post',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                subscription: subscription
                            })
                        });
                    });
            });
    }
}


// This function is needed because Chrome doesn't accept a base64 encoded string
// as value for applicationServerKey in pushManager.subscribe yet
// https://bugs.chromium.org/p/chromium/issues/detail?id=802280
function urlBase64ToUint8Array(base64String: string) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

