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
      <p className='border-b border-gray-500 pb-16 mb-36'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar
        risus sed felis iaculis commodo. Cras vel turpis non lorem fermentum
        ullamcorper et sed mi. Vestibulum commodo sed augue et dictum. Integer
        justo arcu, euismod sed dui sed, fringilla facilisis risus. Aliquam
        sodales nisl ut ligula malesuada lacinia. Cras dapibus ac nisl et
        semper. Nunc vel aliquam dui. Pellentesque cursus rutrum lacus, sit amet
        ornare nisi interdum non. Sed nibh massa, malesuada non aliquam vel,
        iaculis in urna. Donec dui neque, dictum vel congue nec, tempus a elit.
        Morbi ut lacinia nunc.
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
