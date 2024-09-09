import GridButton from '@/components/buttons/GridButton';
import type { PageLayout } from './_app';
import Link from 'next/link';
import Image from 'next/image';

const Page: PageLayout = () => {
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
      <h1>{greeter()}</h1>
      <Image
        src={'/HUD1.png'}
        className=' absolute -top-96 -z-50 opacity-10 left-0 right-0 self-center w-full'
        width={1000}
        height={1000}
        alt={''}
      />
      <p className='text-2xl italic mt-3 mb-0 lg:w-1/2 w-full bg-gradient-to-r from-teal-300 via-teal-100 to-cyan-300 inline-block text-transparent bg-clip-text'>
        <b>The next generation </b>of technology,
      </p>
      <p className='text-2xl italic lg:w-1/2 w-full mb-16'>
        at your fingertips.
      </p>
      <p className='border-b border-gray-500 pb-16 mb-36'>
        PACKY is a tech consultation app designed for newer developers. Our
        stack builder tool and tech information library is implemented by a team
        of experienced coders striving to improve the lives of our fellow
        developers.
      </p>
      <h2 className=' select-none lg:text-9xl md:text-7xl text-6xl absolute -mt-28 bg-gradient-to-b from-gray-600  to-90% inline-block text-transparent bg-clip-text '>
        Explore
      </h2>
      <div className='lg:grid flex flex-col grid-cols-3 gap-4 text-center mt-6'>
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
