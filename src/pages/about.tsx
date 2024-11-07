import Head from 'next/head';
import type { PageLayout } from './_app';

const About: PageLayout = () => {
  return (
    <div>
      {/* PAGE TITLE */}
      <Head>
        <title>About | PACKY</title>
      </Head>
      <div className="content">
        <h1>About the app</h1>
        <p>
          As the original idea of PACKY evolved and grew, it became apparent
          that many of the features required for the suggestion process needed
          not only implementation, but required to be merged into a single
          process. Through feedback, our StackBuilder was born. We have divided
          it into 3 parts: library, grid and output.
        </p>
        <h1>About our team</h1>
        <ul>
          <li>
            <b className="text-xl text-teal-300">Severi Boesen</b> - Product
            Owner, UI/UX Design
          </li>
          <li>
            <b className="text-xl text-teal-300">Petri Paasila</b> - Lead
            developer, State Management
          </li>
          <li>
            <b className="text-xl text-teal-300">Arttu Henriksson</b> - Scrum
            Master, Database Management
          </li>
          <li>
            <b className="text-xl text-teal-300">Matias Juvonen</b> - Testing,
            Optimization
          </li>
          <li>
            <b className="text-xl text-teal-300">Aatu Mäenpää</b> - Business,
            Component Prototyping
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
