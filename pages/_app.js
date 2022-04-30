import Head from 'next/head';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
