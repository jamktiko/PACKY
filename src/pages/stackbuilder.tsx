import type { PageLayout } from './_app';
import Grid from '../components/grid/grid';
import GridModal from '@/components/modals/GridModal';
import OutputModal from '@/components/modals/OutputModal';
import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { toggleOutputModal } from '@/redux/reducers/outputReducer';
import { useDispatch, useSelector } from 'react-redux';
import { resetGridState } from '@/redux/reducers/gridStateReducer';
import { IoArrowUndoOutline } from 'react-icons/io5';
import { IoIosArrowDropright } from 'react-icons/io';
import { GrPowerReset } from 'react-icons/gr';
import { FaCheck } from 'react-icons/fa';
import { AppDispatch, RootState } from '@/redux/store/store';
import { motion } from 'framer-motion';
import { resetWeights } from '@/redux/reducers/libraryDataReducer';
import SearchBar from '@/utils/search/search';
import Link from 'next/link';
const StackBuilder: PageLayout = () => {
  const { activeCells } = useSelector(
    (state: RootState) => state.gridStateReducer
  );
  const libraryData = useSelector(
    (state: RootState) => state.libraryDataReducer
  );
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(true);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isOutputModalOpen, setIsOutputModalOpen] = useState(false);

  const libraryButtonDisabled = libraryData.value.every(
    (item) => !item.checked
  );
  const gridButtonDisabled = activeCells.length <= 1;

  const handlesetOutputModal = () => {
    setIsOutputModalOpen(!isOutputModalOpen);
    dispatch(toggleOutputModal(true));
  };

  const handlesetLibraryOpen = () => {
    setIsGridOpen(false);
    setIsLibraryOpen(!isLibraryOpen);
  };

  const handlesetGridOpen = () => {
    setIsLibraryOpen(false);
    setIsGridOpen(!isGridOpen);
  };

  return (
    <>
      <Head>
        <title>Stack Builder | PACKY</title>
      </Head>
      {isLibraryOpen && (
        <>
          <div className="mt-20 ml-2 mr-2 pb-16">
            <SearchBar />
          </div>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="h-16 fixed w-full bottom-0 flex justify-evenly"
          >
            <Link
              href={'/'}
              className="toggle-output bg-teal-500 toggle-output-active"
            >
              <IoArrowUndoOutline className="w-8 h-8" />
              Back to home
            </Link>
            <button
              className="toggle-output  toggle-output-active  bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-white hover:to-white"
              onClick={handlesetGridOpen}
            >
              <IoIosArrowDropright className="w-8 h-8" />
              Next
            </button>
            <button
              className={`toggle-output ${
                libraryButtonDisabled
                  ? 'pointer-events-none cursor-default text-slate-400 bg-slate-500'
                  : 'bg-cyan-500 toggle-output-active'
              }`}
              onClick={() => dispatch(resetWeights())}
              disabled={libraryButtonDisabled}
            >
              <GrPowerReset className="w-8 h-8" />
              Reset
            </button>
          </motion.div>
        </>
      )}
      {isGridOpen && (
        <>
          <Grid setIsModalOpen={setIsModalOpen} />
          <div className="h-16 fixed w-full bottom-0 flex justify-evenly">
            <button
              className="toggle-output toggle-output-active bg-teal-500"
              onClick={handlesetLibraryOpen}
            >
              <IoArrowUndoOutline className="w-8 h-8" />
              Go back
            </button>
            <button
              className={`toggle-output ${
                gridButtonDisabled
                  ? 'pointer-events-none cursor-default text-slate-400 bg-slate-500'
                  : 'toggle-output-active bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-white hover:to-white'
              }`}
              onClick={handlesetOutputModal}
              disabled={gridButtonDisabled}
            >
              <FaCheck className="w-8 h-8" />
              Finish
            </button>
            <button
              className={`toggle-output ${
                gridButtonDisabled
                  ? 'pointer-events-none cursor-default text-slate-400 bg-slate-500'
                  : 'bg-cyan-500 toggle-output-active '
              }`}
              onClick={() => dispatch(resetGridState())}
              disabled={gridButtonDisabled}
            >
              <GrPowerReset className="w-8 h-8" />
              Reset
            </button>
          </div>
        </>
      )}
      {isModalOpen && <GridModal />}
      {isOutputModalOpen && (
        <>
          <OutputModal />
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="h-16 z-50 fixed w-full bottom-0 flex justify-evenly"
          >
            <button
              tabIndex={0}
              className="toggle-output min-w-96 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-white hover:to-white"
              onClick={handlesetOutputModal}
            >
              <IoArrowUndoOutline className="w-8 h-8" />
              Go back
            </button>
          </motion.div>
        </>
      )}
    </>
  );
};

export default StackBuilder;
