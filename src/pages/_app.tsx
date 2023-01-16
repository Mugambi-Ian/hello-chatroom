import type { AppType } from 'next/app';

import { AppHead } from '@/modules/meta/AppHead';
import { trpc } from '@/utils/trpc';
import '@/styles/global.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <AppHead />
      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(MyApp);
