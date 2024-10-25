import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { motion } from 'framer-motion';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import Header from '../components/ui/header';

import '../assets/CSS/globals.css';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import { useFetchCollections } from '@/hooks/useFetchCollections';
import Head from 'next/head';

const montserrat = Montserrat({ subsets: ['latin'] });

export type PageLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: PageLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  // useFetchCollections() hook is used to fetch the data when the component is mounted

  useFetchCollections();

  let persistor = persistStore(store);

  // Layout is defined here
  return (
    //entire app is wrapped with a Redux store provider
    //created entrypoint to use persistor store with PersistGate method
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {getLayout(
          <main className={montserrat.className}>
            <Head>
              <meta
                name='viewport'
                content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
              />
            </Head>
            <Header />
            <Image
              src={'/bg.png'}
              className=' blur-3xl fixed h-screen -z-50 overflow-hidden'
              alt={'Background'}
              width={1920}
              height={1080}
            />
            <div className='spin'>
              <Image
                src={'/packyiconsmall.png'}
                className='fixed -z-10 md:-left-[40rem] -left-48 md:-top-32 top-16 opacity-5'
                width={3200}
                height={3200}
                alt={'packy'}
              />
            </div>

            <Component {...pageProps} />
          </main>
        )}
      </PersistGate>
    </Provider>
  );
}
