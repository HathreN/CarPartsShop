import '../styles/global.css';
// @ts-ignore
import createAuth0Client from '@auth0/auth0-spa-js';
import type { AppProps } from 'next/app';
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <UserProvider>
    <Component {...pageProps} />
  </UserProvider>

);

export default MyApp;
