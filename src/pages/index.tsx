import type { PageLayout } from './_app';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { InfiniteScroller } from '@/components/ui/infinitehorizontalscroller';

const Page: PageLayout = () => {
  // The greeter works as page title and
  // greets the user based on time of day
  function greeter() {
    const hour = new Date().getHours();
    if (hour < 6) {
      return 'Good late night!';
    } else if (hour < 10) {
      return 'Good early morning!';
    } else if (hour < 12) {
      return 'Good morning!';
    } else if (hour < 16) {
      return 'Good afternoon!';
    } else if (hour < 18) {
      return 'good late afternoon!';
    } else {
      return 'Good evening!';
    }
  }
  return (
    <div className='content'>
      {/* _____________________________ */}
      {/* PAGE TITLE */}
      <Head>
        <title>Home | PACKY</title>
      </Head>
      {/* _____________________________ */}
      <InfiniteScroller />
      <h1>{greeter()}</h1>
      <Image
        src={'/HUD1.png'}
        className=' absolute -top-96 -z-50 opacity-10 left-0 right-0 self-center w-full'
        width={1000}
        height={1000}
        alt={''}
      />
      <p className='text-2xl italic mt-6 mb-0 lg:w-1/2 w-full bg-gradient-to-r from-cyan-200 via-cyan-100 to-white text-transparent bg-clip-text'>
        <b>The next generation </b>of technology,
      </p>
      <p className='text-2xl italic lg:w-1/2 w-full mb-16 bg-gradient-to-r from-cyan-100  to-cyan-200 text-transparent bg-clip-text'>
        yours to grasp.
      </p>
      <article className='flex xl:flex-row flex-col-reverse justify-evenly border-b border-gray-500 mb-10 '>
        <div>
          <p className='pb-4'>
            <b>PACKY is a tech consultation app</b> designed for newer
            developers. Our stack builder tool and tech information library is
            implemented by a team of experienced researchers striving to improve
            the lives of our fellow coders -{' '}
            <i>from developers to developers.</i>
          </p>
          <p className='pb-16 mb-36'>
            <b>We offer a variety of tools</b> for organizations to use. Using
            authorization keys, organizations can access our Stack Builder, take
            a look at our technology library and gain personal insight for their
            projects, work and learning alike.
          </p>
        </div>
        <Image
          className='xl:-mt-40 -mt-24 h-fit'
          src={'/packyiconlarge.png'}
          width={500}
          height={500}
          alt={''}
        />
      </article>

      <h2 className=' select-none lg:text-9xl md:text-7xl text-6xl absolute -mt-40 bg-gradient-to-b from-gray-600  to-90% inline-block text-transparent bg-clip-text '>
        Explore
      </h2>
      <div className='lg:grid flex flex-col grid-cols-3 gap-4 text-center mb-16'>
        <Link href={'/library'} className='indexcard indexcard-glow2'>
          <Image
            src={'/indexcard-library.jpg'}
            className='indexcard-image'
            width={1000}
            height={1000}
            alt={''}
          />
          <span>Technology Library</span>
        </Link>
        <Link href={'/stackbuilder'} className='indexcard indexcard-glow1'>
          <Image
            src={'/indexcard-stackbuilder.jpg'}
            className='indexcard-image'
            width={1000}
            height={1000}
            alt={''}
          />
          <span>PACKY StackBuilder</span>
        </Link>

        <Link href={'/about'} className='indexcard indexcard-glow3'>
          <Image
            src={'/indexcard-about.jpg'}
            className='indexcard-image'
            width={1000}
            height={1000}
            alt={''}
          />
          <span>Pricing & Information</span>
        </Link>
      </div>
    </div>
  );
};

export default Page;
