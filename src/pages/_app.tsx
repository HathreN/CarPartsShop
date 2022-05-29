import '../styles/global.css';
// @ts-ignore
import createAuth0Client from '@auth0/auth0-spa-js';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import { login } from '@/pages/data';
import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

import * as Realm from "realm-web";

export const APP_ID = "partsshop-iqmiv";
const app = new Realm.App(APP_ID);

async function getValidAccessToken() {
  if (!app.currentUser) {
    await app.logIn(Realm.Credentials.anonymous());
  } else {
    await app.currentUser.refreshCustomData();
  }

  return app.currentUser.accessToken;
}
const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://eu-central-1.aws.realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`,
    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache()
});

login()

const MyApp = ({ Component, pageProps }: AppProps) => (
  <UserProvider>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  </UserProvider>

);

export default MyApp;
