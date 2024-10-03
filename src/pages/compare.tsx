import Head from 'next/head';
import type { PageLayout } from './_app';
import CompareList from '@/components/lists/CompareList';

const Compare: PageLayout = () => {
  return (
    <div>
      {/* _____________________________ */}
      {/* Valitaan gateroria  */}
      {/* Valitaan technologiat */}
      <Head>
        <title>Compare | PACKY</title>
      </Head>
      <div className="p-12 m-10">
        <CompareList />
      </div>
      {/* _____________________________ */}
    </div>
  );
};

export default Compare;
