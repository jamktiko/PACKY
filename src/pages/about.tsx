import Head from 'next/head';
import type { PageLayout } from './_app';

const About: PageLayout = () => {
  return (
    <div>
      {/* _____________________________ */}
      {/* PAGE TITLE */}
      <Head>
        <title>About | PACKY</title>
      </Head>
      {/* _____________________________ */}
    </div>
  );
};

export default About;
