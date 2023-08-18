import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import initializeBundles from './i18n';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { createHttpLink } from '@apollo/client';
import { getLoadedEnvVariables } from './utils/env-loader';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import NotificationDialogParent from './components/notifications/NotificationDialogParent';

initializeBundles();


const link = createHttpLink({
  uri: getLoadedEnvVariables().VITE_HTTPS_API_ENDPOINT,
  credentials: "include"
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <NotificationDialogParent />
      <App />
    </React.StrictMode>
  </ApolloProvider>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
