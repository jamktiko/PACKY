import type { PageLayout } from './_app';
import Grid from '../components/grid/grid';
import GridModal from '@/components/modals/GridModal';
import OutputModal from '@/components/modals/OutputModal';
import { useState } from 'react';
import Head from 'next/head';
import { toggleOutputModal } from '@/redux/reducers/outputReducer';
import { useDispatch } from 'react-redux';

// StackBuilder page is constructed here, it renders Grid component and conditionally renders GridModal
const StackBuilder: PageLayout = () => {
  // useState hook manages a boolean state that controls wheter or not the modal is open and a function to update it
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedButtonData, setSelectedButtonData] = useState({ id: '' });

  const [isOutputModalOpen, setIsOutputModalOpen] = useState(false);

  // Grid component and GridModal are rendered here
  // setIsModalOpen is passed as a prop to Grid and GridModal, to allow them to update the state
  //of isModalOpen

  const dispatch = useDispatch();

  const handlesetOutputModal = () => {
    dispatch(toggleOutputModal(true));
  };

  console.log('isOutputModalOpen', isOutputModalOpen);
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

      <button onClick={handlesetOutputModal}>test</button>
      <OutputModal />
    </>
  );
};

export default StackBuilder;
