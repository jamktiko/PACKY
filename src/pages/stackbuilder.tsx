import type { PageLayout } from './_app';
import Grid from '../components/grid/grid';
import GridModal from '@/components/modals/GridModal';
import OutputModal from '@/components/modals/OutputModal';
import { useState } from 'react';
import Head from 'next/head';
import { toggleOutputModal } from '@/redux/reducers/outputReducer';
import { useDispatch } from 'react-redux';
import List from '@/components/lists/librarylist';
import Library from './library';
import { resetGridState } from '@/redux/reducers/gridStateReducer';

// StackBuilder page is constructed here, it renders Grid component and conditionally renders GridModal
const StackBuilder: PageLayout = () => {
  // useState hook manages a boolean state that controls wheter or not the modal is open and a function to update it
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(true);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isOutputModalOpen, setIsOutputModalOpen] = useState(false);
  // Grid component and GridModal are rendered here
  // setIsModalOpen is passed as a prop to Grid and GridModal, to allow them to update the state
  //of isModalOpen
  console.log('output modal is', isOutputModalOpen);
  const dispatch = useDispatch();

  const handlesetOutputModal = () => {
    setIsOutputModalOpen(!isOutputModalOpen);
    console.log('output modal is', isOutputModalOpen);
    // dispatch(toggleOutputModal(true));
  };

  const handlesetLibraryOpen = () => {
    setIsLibraryOpen(!isLibraryOpen);
    setIsGridOpen(!isGridOpen);
  };

  return (
    <>
      {/* _____________________________ */}
      {/* PAGE TITLE */}
      <Head>
        <title>Stack Builder | PACKY</title>
      </Head>
      {/* _____________________________ */}
      {isLibraryOpen && (
        <>
          <Library />{' '}
          <div className='w-full flex justify-center h-16 fixed bottom-0'>
            <button className='toggle-output' onClick={handlesetLibraryOpen}>
              Next
            </button>
          </div>
        </>
      )}
      {isGridOpen && (
        <>
          <button className='toggle-output' onClick={handlesetLibraryOpen}>
            Return to Library
          </button>
          <Grid setIsModalOpen={setIsModalOpen} />
          <div className='w-full flex justify-center h-16 fixed bottom-0'>
            <button className='toggle-output' onClick={handlesetOutputModal}>
              Finish
            </button>
          </div>
          <div className='h-16 fixed bottom-0'>
            <button
              className='toggle-output right-0'
              onClick={() => dispatch(resetGridState())}
            >
              Reset
            </button>
          </div>
        </>
      )}

      {isModalOpen && <GridModal />}

      {isOutputModalOpen && (
        <>
          <OutputModal />
          <div className='w-full flex justify-start h-16 fixed bottom-0 z-[100]'>
            <button className='toggle-output' onClick={handlesetOutputModal}>
              Return to Grid
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default StackBuilder;
