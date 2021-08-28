import React from 'react';
import ReactDOM from 'react-dom';
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
import { EnvLoader } from './utils/env-loader';

initializeBundles();


const link = createHttpLink({
  uri: EnvLoader.getInstance().loadedVariables.REACT_APP_HTTPS_API_ENDPOINT,
  credentials: "include"
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
