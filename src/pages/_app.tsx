import '../styles/global.css';
// @ts-ignore
import createAuth0Client from '@auth0/auth0-spa-js';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import React from "react";
import {Meta} from '@/layouts/Meta'
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

import * as Realm from "realm-web";

export let user;
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

  const credentials = Realm.Credentials.anonymous();
  try {
    user = await app.logIn(credentials);
    localStorage.setItem('UID', user.id)
    console.log('user zapisany')
  } catch (err) {
    console.error('Failed to log in', err);
  }
const MyApp = ({ Component, pageProps }: AppProps) => (
  <UserProvider>
    <ApolloProvider client={client}>
      <Meta title='CarPartsShop' description='Internetowy sklep dla twojego projektu motorsportowego'/>
      <Component {...pageProps}/>
    </ApolloProvider>
  </UserProvider>

);

export default MyApp;
