import type { PageLayout } from './_app';
import Grid from '../components/grid/grid';
import GridModal from '@/components/modals/GridModal';
import { useState } from 'react';

// StackBuilder page is constructed here, it renders Grid component and conditionally renders GridModal
const StackBuilder: PageLayout = () => {
  // useState hook manages a boolean state that controls wheter or not the modal is open and a function to update it
  const [isModalOpen, setIsModalOpen] = useState(false);
  /*const [selectedButtonData, setSelectedButtonData] = useState({ id: '' });*/

  // Grid component and GridModal are rendered here
  // setIsModalOpen is passed as a prop to Grid and GridModal, to allow them to update the state
  //of isModalOpen
  return (
    <>
      <Grid setIsModalOpen={setIsModalOpen} />
      {isModalOpen && <GridModal />}
    </>
  );
};

export default StackBuilder;
