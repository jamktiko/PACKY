import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { useFetchCollections } from '@/hooks/useFetchCollections';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import Header from '../components/ui/header';

import '../assets/CSS/globals.css';
import { Montserrat } from 'next/font/google';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { getData } from '@/utils/neo4j/neo4j';

const montserrat = Montserrat({ subsets: ['latin'] });
let persistor = persistStore(store);

export type PageLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: PageLayout;
};

const BackgroundImage = dynamic(() => import('next/image'), { ssr: false });

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  useFetchCollections();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {getLayout(
          <main className={montserrat.className}>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
              />
            </Head>
            <Header />
            <BackgroundImage
              fetchPriority="high"
              src={'/bg.webp'}
              className="blur-3xl fixed h-screen -z-50 overflow-hidden"
              alt={'Background'}
              width={1920}
              height={1080}
              priority={true}
            />
            <div className="spin">
              <BackgroundImage
                fetchPriority="high"
                src={'/packyiconextrasmall.webp'}
                className="fixed -z-10 md:-left-[40rem] -left-48 md:-top-32 top-16 opacity-5"
                width={3200}
                height={3200}
                alt={'packy'}
                priority={false}
              />
            </div>

            <Component {...pageProps} />
          </main>
        )}
      </PersistGate>
    </Provider>
  );
}
