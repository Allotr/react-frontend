/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { EnvLoader } from './utils/env-loader';
import {
    ApolloClient,
    InMemoryCache,
    createHttpLink
} from "@apollo/client";
import { MyNotificationData, MyNotificationDataQuery } from 'allotr-graphql-schema-types';

import i18n from './i18nGeneric';

declare const self: ServiceWorkerGlobalScope;

const { REACT_APP_WEBPUSH_ENDPOINT, REACT_APP_REDIRECT_URL } = EnvLoader.getInstance().loadedVariables;


// Add Apollo Client

const link = createHttpLink({
    uri: EnvLoader.getInstance().loadedVariables.REACT_APP_HTTPS_API_ENDPOINT,
    credentials: "include"
})

// This is the client we will use for all queries inside the webworker
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
});



clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
// precacheAndRoute(self.__WB_MANIFEST);
const ignored = self.__WB_MANIFEST;


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


// Listen to `push` notification event. Define the text to be displayed
// and show the notification.
self.addEventListener('push', function (event) {
    event.waitUntil(
        getEndpoint()
            .then(function (endpoint) {
                // Call your GraphQL to retrieve data
                return client.query<MyNotificationDataQuery>({ query: MyNotificationData })
            })
            .then(function ({ data }) {
                // Process your data
                return data.myNotificationData;
            })
            .then(function (payload) {
                payload?.forEach(payload=>{
                    const { descriptionRef, resource } = payload;
                    // Use your data
                    const title = `"${resource?.name}" ${i18n.t("From")} ${resource?.createdBy?.username} ${i18n.t("AlreadyAvailable")}`;
                    const options = {
                        body: `${i18n.t(descriptionRef ?? "")}`,
                        actions: [{ action: "NAVIGATE", title: i18n.t("GoToPage") }],
                        tag: payload.id ?? "",
                        // renotify: true,
                        requireInteraction: true,
                        icon: "https://feranern.sirv.com/Images/nodos.png"
                    }
                    self.registration.showNotification(title, options)
                });


            })
    );
});

self.addEventListener('notificationclick', function (event) {
    if (!event.action) {
        // Was a normal notification click
        console.log('Notification Click.');
        return;
    }

    event.notification.close();
    event.waitUntil(
        self.clients.openWindow(REACT_APP_REDIRECT_URL)
    );
});

// Listen to  `pushsubscriptionchange` event which is fired when
// subscription expires. Subscribe again and register the new subscription
// in the server by sending a POST request with endpoint. Real world
// application would probably use also user identification.
self.addEventListener('pushsubscriptionchange', function (event: any) {
    console.log('Subscription expired');
    event.waitUntil(
        self.registration.pushManager.subscribe({ userVisibleOnly: true })
            .then(function (subscription) {
                console.log('Subscribed after expiration', subscription.endpoint);
                return fetch(`${REACT_APP_WEBPUSH_ENDPOINT}/webpush/register`, {
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
