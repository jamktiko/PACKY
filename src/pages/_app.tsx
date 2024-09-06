import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import Header from '../components/ui/header';

import '../assets/CSS/globals.css';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';

const montserrat = Montserrat({ subsets: ['latin'] });

export type PageLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: PageLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  // Layout is defined here
  return getLayout(
    <main className={montserrat.className}>
      <Header />
      <Image
        src={'/bg.png'}
        className=' blur-2xl fixed h-screen -z-50 overflow-hidden'
        alt={'Background'}
        width={1920}
        height={1080}
      />
      <Component {...pageProps} />
    </main>
  );
}
