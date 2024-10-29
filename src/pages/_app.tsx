import '../styles/globals.css';
import { CssBaseline } from '@mui/material';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

dayjs.extend(customParseFormat);

type EnhancedAppProps = AppProps & {
  Component: NextPage;
};

export default function App(props: EnhancedAppProps) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Head>
        <title>EMUN Commission Portal</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <CssBaseline />
      {getLayout(<Component {...pageProps} />)}
    </LocalizationProvider>
  );
}
