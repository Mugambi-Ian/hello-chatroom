import type { AppType } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { trpc } from '../utils/trpc';
import '../styles/global.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.ico`}
          key="favicon"
        />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href={`${router.basePath}/logo192.png`} />
        <link rel="manifest" href={`${router.basePath}/site.webmanifest`} />
        <title>Hello Chatroom</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(MyApp);
