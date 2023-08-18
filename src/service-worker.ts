/// <reference lib="webworker" />


// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';
import { getLoadedEnvVariables } from './utils/env-loader';
import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    DefaultOptions
} from "@apollo/client";
import { MyNotificationData, MyNotificationDataQuery } from 'allotr-graphql-schema-types';

import i18n from './i18nGeneric';

declare const self: ServiceWorkerGlobalScope;

const { VITE_WEBPUSH_ENDPOINT, VITE_REDIRECT_URL } = getLoadedEnvVariables();


// Add Apollo Client

const link = createHttpLink({
    uri: getLoadedEnvVariables().VITE_HTTPS_API_ENDPOINT,
    credentials: "include"
})

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}

// This is the client we will use for all queries inside the webworker
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
    defaultOptions
});



clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
// precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
    () => true,
    new NetworkOnly()
);


// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

function getEndpoint() {
    return self.registration.pushManager.getSubscription()
        .then(function (subscription) {
            if (subscription) {
                return subscription.endpoint;
            }

            throw new Error('User not subscribed');
        });
}

async function getMyNotifications() {
    await getEndpoint();

    const result = await client.query<MyNotificationDataQuery>({ query: MyNotificationData })
    const notifications = result?.data?.myNotificationData;

    for (const notification of notifications) {
        const { descriptionRef, resource, titleRef } = notification;
        // Here we separate between resource availability notifications and usage analisis notifications
        const [title, options] = titleRef === "ResourceAvailableNotification" ?
            // ResourceAvailableNotification
            [
                `"${resource?.name}" ${i18n.t("From")} ${resource?.createdBy?.username} ${i18n.t("AlreadyAvailable")}`,
                {
                    body: `${i18n.t(descriptionRef ?? "")}`,
                    actions: [{ action: "NAVIGATE", title: i18n.t("GoToPage") }],
                    tag: notification.id ?? "",
                    renotify: true,
                    requireInteraction: true,
                    icon: "https://feranern.sirv.com/Images/nodos.png"
                }
            ] :
            // UsageAnaliticsNotification
            [
                `${i18n.t("UsageAnaliticsNotificationStart")} "${resource?.name}"${i18n.t("UsageAnaliticsNotificationEnd")}`,
                {
                    body: `${i18n.t("UsageAnaliticsDescriptionNotificationStart")} "${resource?.name}" ${i18n.t("UsageAnaliticsDescriptionNotificationEnd")}`,
                    actions: [{ action: "NAVIGATE", title: i18n.t("GoToPage") }],
                    tag: notification.id ?? "",
                    renotify: true,
                    requireInteraction: true,
                    icon: "https://feranern.sirv.com/Images/nodos.png"
                }
            ]
        await self.registration.showNotification(title, options)
    }
}


// Listen to `push` notification event. Define the text to be displayed
// and show the notification.
self.addEventListener('push', function (event) {
    event.waitUntil(getMyNotifications());
});

self.addEventListener('notificationclick', function (event) {
    if (!event.action) {
        // Was a normal notification click
        console.log('Notification Click.');
        return;
    }

    event.notification.close();
    event.waitUntil(
        self.clients.openWindow(VITE_REDIRECT_URL)
    );
});

// Listen to  `pushsubscriptionchange` event which is fired when
// subscription expires. Subscribe again and register the new subscription
// in the server by sending a POST request with endpoint. Real world
// application would probably use also user identification.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
self.addEventListener('pushsubscriptionchange', function (event: any) {
    console.log('Subscription expired');
    event.waitUntil(
        self.registration.pushManager.subscribe({ userVisibleOnly: true })
            .then(function (subscription) {
                console.log('Subscribed after expiration', subscription.endpoint);
                return fetch(`${VITE_WEBPUSH_ENDPOINT}/webpush/register`, {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        endpoint: subscription.endpoint
                    })
                });
            })
    );
});


// Any other custom service worker logic can go here.
