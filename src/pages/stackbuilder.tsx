import type { PageLayout } from './_app';
import Grid from '../components/grid/grid';
import GridModal from '@/components/modals/GridModal';
import OutputModal from '@/components/modals/Outputmodal';
import { useState } from 'react';
import Head from 'next/head';

// StackBuilder page is constructed here, it renders Grid component and conditionally renders GridModal
const StackBuilder: PageLayout = () => {
  // useState hook manages a boolean state that controls wheter or not the modal is open and a function to update it
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedButtonData, setSelectedButtonData] = useState({ id: '' });

  const [isOutputModalOpen, setIsOutputModalOpen] = useState(false);

  // Grid component and GridModal are rendered here
  // setIsModalOpen is passed as a prop to Grid and GridModal, to allow them to update the state
  //of isModalOpen
  return (
    <>
      {/* _____________________________ */}
      {/* PAGE TITLE */}
      <Head>
        <title>Stack Builder | PACKY</title>
      </Head>
      {/* _____________________________ */}
      <Grid setIsModalOpen={setIsModalOpen} />
      {isModalOpen && <GridModal />}

      <button onClick={() => setIsOutputModalOpen(true)}>test</button>
      {isOutputModalOpen && <OutputModal />}
    </>
  );
};

export default StackBuilder;
