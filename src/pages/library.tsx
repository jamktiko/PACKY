import type { PageLayout } from './_app';
import List from '@/components/lists/librarylist';
import Head from 'next/head';
const Library: PageLayout = () => {
  return (
    <>
      {' '}
      {/* _____________________________ */}
      {/* PAGE TITLE */}
      <Head>
        <title>Library | PACKY</title>
      </Head>
      {/* _____________________________ */}
      <div>
        <List />
      </div>
    </>
  );
};

export default Library;
