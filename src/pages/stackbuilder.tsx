import type { PageLayout } from './_app';
import Grid from '../components/grid/grid';
import GridModal from '@/components/modals/GridModal';
import OutputModal from '@/components/modals/OutputModal';
import { act, useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { toggleOutputModal } from '@/redux/reducers/outputReducer';
import { useDispatch, useSelector } from 'react-redux';
import List from '@/components/lists/librarylist';
import Library from './library';
import { resetGridState } from '@/redux/reducers/gridStateReducer';
import { IoArrowUndoOutline } from 'react-icons/io5';
import { IoIosArrowDropright } from 'react-icons/io';
import { GrPowerReset } from 'react-icons/gr';
import { FaCheck } from 'react-icons/fa';
import { RootState } from '@/redux/store/store';
// StackBuilder page is constructed here, it renders Grid component and conditionally renders GridModal
const StackBuilder: PageLayout = () => {
  // Get the activeCells from the Redux state
  const { activeCells } = useSelector(
    (state: RootState) => state.gridStateReducer
  );

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
    dispatch(toggleOutputModal(true));
  };

  const handlesetLibraryOpen = () => {
    setIsLibraryOpen(!isLibraryOpen);
    setIsGridOpen(!isGridOpen);
  };

  //Function to handle button disablement
  const buttonDisabled = useCallback(() => {
    if (activeCells.length > 1) {
      return false;
    } else {
      return true;
    }
  }, [activeCells]);

  //UseEffect hook to handle button disablement
  useEffect(() => {
    buttonDisabled();
  }, [buttonDisabled, activeCells]);

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
          <div className='w-full flex justify-center h-16 fixed bottom-0'></div>
          <div className='h-16 fixed w-full bottom-0 flex justify-evenly'>
            <button className='toggle-output pointer-events-none hover:bg-slate-500 hover:opacity-80 hover:text-slate-400 cursor-default text-slate-400 bg-slate-500'>
              <IoArrowUndoOutline className='w-8 h-8' />
              Go back
            </button>
            <button
              className='toggle-output bg-gradient-to-r from-teal-500 to-cyan-500'
              onClick={handlesetLibraryOpen}
            >
              <IoIosArrowDropright className='w-8 h-8' />
              Next
            </button>

            {!buttonDisabled() && (
              <button
                className='toggle-output bg-cyan-500'
                onClick={() => dispatch(resetGridState())}
              >
                <GrPowerReset className='w-8 h-8' />
                Reset
              </button>
            )}
            {buttonDisabled() && (
              <button
                className='toggle-output pointer-events-none hover:bg-slate-500 hover:opacity-80 hover:text-slate-400 cursor-default text-slate-400 bg-slate-500'
                onClick={() => dispatch(resetGridState())}
              >
                <GrPowerReset className='w-8 h-8' />
                Reset
              </button>
            )}
          </div>
        </>
      )}
      {isGridOpen && (
        <>
          <Grid setIsModalOpen={setIsModalOpen} />
          <div className='h-16 fixed w-full bottom-0 flex justify-evenly'>
            <button
              className='toggle-output bg-teal-500'
              onClick={handlesetLibraryOpen}
            >
              <IoArrowUndoOutline className='w-8 h-8' />
              Go back
            </button>
            {!buttonDisabled() && (
              <>
                {' '}
                <button
                  className='toggle-output bg-gradient-to-r from-teal-500 to-cyan-500'
                  onClick={handlesetOutputModal}
                  disabled={buttonDisabled()}
                >
                  <FaCheck className='w-8 h-8' />
                  Finish
                </button>
                <button
                  className='toggle-output bg-cyan-500'
                  onClick={() => dispatch(resetGridState())}
                >
                  <GrPowerReset className='w-8 h-8' />
                  Reset
                </button>
              </>
            )}
            {buttonDisabled() && (
              <>
                <button
                  className='toggle-output pointer-events-none hover:bg-slate-500 hover:opacity-80 hover:text-slate-400 cursor-default text-slate-400 bg-slate-500'
                  onClick={handlesetOutputModal}
                  disabled={buttonDisabled()}
                >
                  <FaCheck className='w-8 h-8' />
                  Finish
                </button>
                <button
                  className='toggle-output pointer-events-none hover:bg-slate-500 hover:opacity-80 hover:text-slate-400 cursor-default text-slate-400 bg-slate-500'
                  onClick={() => dispatch(resetGridState())}
                >
                  <GrPowerReset className='w-8 h-8' />
                  Reset
                </button>
              </>
            )}
          </div>
        </>
      )}

      {isModalOpen && <GridModal />}

      {isOutputModalOpen && (
        <>
          <OutputModal />
          <div className='h-16 z-50 fixed w-full bottom-0 flex justify-evenly'>
            <button
              className='toggle-output min-w-96 bg-gradient-to-r from-teal-500 to-cyan-500'
              onClick={handlesetOutputModal}
            >
              <IoArrowUndoOutline className='w-8 h-8' />
              Go back
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default StackBuilder;
