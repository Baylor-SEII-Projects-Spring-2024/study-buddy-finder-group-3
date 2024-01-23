import React from 'react';
import Head from 'next/head';
import { Provider as ReduxProvider } from 'react-redux';

import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { CssBaseline } from '@mui/material';

import { StudyBuddyThemeProvider } from '@/utils/theme';
import { buildStore } from '@/utils/redux';

import '@/styles/globals.css'

// Initialize Redux
let initialState = {};
let reduxStore = buildStore(initialState);

export default function App({ Component, pageProps }) {
  return (
    <ReduxProvider store={reduxStore}>
      <AppCacheProvider>
        <Head>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <StudyBuddyThemeProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          <Component {...pageProps} />
        </StudyBuddyThemeProvider>
      </AppCacheProvider>
    </ReduxProvider>
  );
}
