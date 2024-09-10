import type { PageLayout } from './_app';
import List from '../components/lists/list';
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
      <div className='p-12 m-10'>
        <List />
      </div>
    </>
  );
};

export default Library;
