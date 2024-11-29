import type { PageLayout } from './_app';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { InfiniteScroller } from '@/components/ui/infinitehorizontalscroller';
import { motion } from 'framer-motion';
import TutorialModal from '@/components/modals/TutorialModal';

const Page: PageLayout = () => {
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);

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
      return 'Good late afternoon!';
    } else {
      return 'Good evening!';
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="content"
    >
      {/* _____________________________ */}
      {/* PAGE TITLE */}
      <Head>
        <title>Home | PACKY</title>
      </Head>
      {/* _____________________________ */}
      <InfiniteScroller />
      <h1>{greeter()}</h1>
      <Image
        src={'/HUD1.webp'}
        className=" absolute -top-96 -z-50 opacity-10 left-0 right-0 self-center w-full"
        width={1000}
        height={1000}
        alt={'background element'}
        priority
      />
      <p className="text-2xl italic mt-6 mb-0 lg:w-1/2 w-full bg-gradient-to-r from-cyan-200 via-cyan-100 to-white text-transparent bg-clip-text">
        <b>The next generation </b>of technology,
      </p>
      <p className="text-2xl italic lg:w-1/2 w-full mb-16 bg-gradient-to-r from-cyan-100  to-cyan-200 text-transparent bg-clip-text">
        yours to grasp.
      </p>
      <article className="flex xl:flex-row flex-col-reverse justify-evenly border-b border-gray-500 mb-10 ">
        <div>
          <p className="pb-4">
            <b>PACKY is a tech consultation app</b> designed for newer
            developers. Our stack builder tool and tech information library is
            implemented by a team of experienced researchers striving to improve
            the lives of our fellow coders -{' '}
            <i>from developers to developers.</i>
          </p>
          <p className="pb-16 mb-36">
            <b>Our app guides you</b> by first letting you choose familiar or
            desirable technologies from our tech library, and then choose
            desired app features. PACKY then compiles your selections and
            provides you with a technology recommendations based on these
            choices.
          </p>
        </div>
        <Image
          className="xl:-mt-40 -mt-24 h-fit"
          src={'/packyiconsmall.webp'}
          width={500}
          height={500}
          alt={'logo'}
          priority
        />
      </article>

      <h2 className=" select-none lg:text-9xl md:text-7xl text-6xl absolute -mt-40 bg-gradient-to-b from-gray-600  to-90% inline-block text-transparent bg-clip-text ">
        Explore
      </h2>
      <div className="w-full flex  mb-16">
        <div className=" flex xl:flex-row flex-col gap-4 text-center mb-16">
          <Link href={'/stackbuilder'} className="indexcard indexcard-glow2">
            <Image
              src={'/indexcard-stackbuilder.webp'}
              className="indexcard-image"
              width={1000}
              height={1000}
              alt={'To stackbuilder'}
            />
            <span>PACKY StackBuilder</span>
          </Link>
          <Link href={'/about'} className="indexcard indexcard-glow1">
            <Image
              src={'/indexcard-about.webp'}
              className="indexcard-image"
              width={1000}
              height={1000}
              alt={'To about page'}
            />
            <span>Learn more</span>
          </Link>
          <button
            className="indexcard indexcard-glow3"
            onClick={() => setIsTutorialModalOpen(true)}
          >
            <Image
              src={'/tutoriaalinappula.webp'}
              className="indexcard-image"
              width={1000}
              height={1000}
              alt={'Tutorial'}
            />
            <span>Tutorial</span>
          </button>
        </div>
      </div>
      {/* Render the TutorialModal if isModalOpen is true */}
      {isTutorialModalOpen && (
        <TutorialModal onClose={() => setIsTutorialModalOpen(false)} />
      )}
    </motion.div>
  );
};

export default Page;
