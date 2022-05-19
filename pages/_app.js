import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { SocketProvider } from '../store/socketContext';
import '../styles/globals.scss';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Social App</title>
        <meta
          name='description'
          content='Social media app cloning facebook build with NextJS NodeJs Express and MongoDB'
        />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <SessionProvider session={session}>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
