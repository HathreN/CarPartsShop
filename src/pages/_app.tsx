import '../styles/global.css';
// @ts-ignore
import createAuth0Client from '@auth0/auth0-spa-js';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import React from 'react';
import { Meta } from '@/layouts/Meta';
import { ApolloClient, ApolloProvider, DocumentNode, HttpLink, InMemoryCache } from '@apollo/client';

import * as Realm from 'realm-web';

export const APP_ID = 'partsshop-iqmiv';
const app: any = new Realm.App(APP_ID);

export async function fetchGQLData(query: any) {
  function getGqlString(doc: DocumentNode) {
    return doc.loc && doc.loc.source.body;
  }

  const options: any = {
    body: JSON.stringify({
      query: getGqlString(query)
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  options.method = 'POST';

  const accessToken = await getValidAccessToken();
  options.headers.Authorization = `Bearer ${accessToken}`;

  return (await fetch(`https://eu-central-1.aws.realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`, options)).json();
}

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
      // @ts-ignore
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    }
  }),
  cache: new InMemoryCache()
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <Meta title='CarPartsShop' description='Internetowy sklep dla twojego projektu motorsportowego' />
        <Component {...pageProps} />
        <footer className="relative bottom-0 w-full">
          <div className='px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between'>
            <span className='text-sm text-gray-500 dark:text-gray-300 sm:text-center'>© 2023 <a
              href='https://flowbite.com/'>CarPartsShop™</a>.
            </span>
            <div className='flex mt-4 space-x-6 sm:justify-center md:mt-0'>
              <a href='/about' className='text-gray-400 hover:text-gray-900 dark:hover:text-white'>
                O nas
                <span className='sr-only'>Facebook page</span>
              </a>
              <a href='/contact' className='text-gray-400 hover:text-gray-900 dark:hover:text-white'>
                Kontakt
                <span className='sr-only'>Facebook page</span>
              </a>
            </div>
          </div>
        </footer>
      </ApolloProvider>
    </UserProvider>
  );
};

export default MyApp;
