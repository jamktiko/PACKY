import type { PageLayout } from './_app';
import Grid from '../components/grid/grid';
import GridModal from '@/components/modals/GridModal';
import OutputModal from '@/components/modals/OutputModal';
import { useEffect, useState } from 'react';
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
import SearchBar from '@/components/search';
import Link from 'next/link';
import TutorialModal from '@/components/modals/TutorialModal';
import { toggleTutorial } from '@/redux/reducers/tutorialReducer';
const StackBuilder: PageLayout = () => {
  const { activeCells } = useSelector(
    (state: RootState) => state.gridStateReducer
  );
  const libraryData = useSelector(
    (state: RootState) => state.libraryDataReducer
  );

  const gridModalState = useSelector(
    (state: RootState) => state.gridModalReducer.value
  );

  const outputModalState = useSelector(
    (state: RootState) => state.outputReducer.value
  );

  const tutorialModalState = useSelector(
    (state: RootState) => state.tutorialReducer.isOpen
  );

  const dispatch = useDispatch<AppDispatch>();

  // set ismodalopen to use gridmodalstate to get the value from the gridmodalstate
  const [isModalOpen, setIsModalOpen] = useState(gridModalState);
  const [isLibraryOpen, setIsLibraryOpen] = useState(true);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isOutputModalOpen, setIsOutputModalOpen] = useState(outputModalState);
  const [isTutorialModalOpen, setIsTutorialModalOpen] =
    useState(tutorialModalState);

  const libraryButtonDisabled = libraryData.value.every(
    (item) => !item.checked
  );
  const gridButtonDisabled = activeCells.length <= 1;

  const handlesetOutputModal = () => {
    if (outputModalState === false) {
      setIsOutputModalOpen(!isOutputModalOpen);
      dispatch(toggleOutputModal(true));
    } else {
      setIsOutputModalOpen(!isOutputModalOpen);
      dispatch(toggleOutputModal(false));
    }
  };

  const handlesetLibraryOpen = () => {
    setIsGridOpen(false);
    setIsLibraryOpen(!isLibraryOpen);
  };

  const handlesetGridOpen = () => {
    setIsLibraryOpen(false);
    setIsGridOpen(!isGridOpen);
  };

  const handlesetTutorialOpen = () => {
    dispatch(toggleTutorial(!isTutorialModalOpen));
    setIsTutorialModalOpen(!isTutorialModalOpen);
  };

  //created useeffect to set ismodalopen to the value of gridmodalstate
  // and made it listen when the user leaves the stackbuilder route
  //to close the outputmodal
  useEffect(() => {
    setIsModalOpen(gridModalState);

    return () => {
      dispatch(toggleOutputModal(false));
    };
  }, [gridModalState, dispatch]);

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
              tabIndex={isTutorialModalOpen ? -1 : 0}
            >
              <IoArrowUndoOutline className="w-8 h-8" />
              Back to home
            </Link>
            <button
              className="toggle-output  toggle-output-active  bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-white hover:to-white"
              onClick={handlesetGridOpen}
              disabled={isTutorialModalOpen}
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
              disabled={libraryButtonDisabled || isTutorialModalOpen}
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
              disabled={isModalOpen || isOutputModalOpen || isTutorialModalOpen}
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
              disabled={
                isModalOpen ||
                gridButtonDisabled ||
                isOutputModalOpen ||
                isTutorialModalOpen
              }
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
              disabled={
                isModalOpen ||
                gridButtonDisabled ||
                isOutputModalOpen ||
                isTutorialModalOpen
              }
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
      <button
        className="bg-black border-teal-500 border z-40 fixed top-0 -left-16 h-32 w-32 -rotate-45"
        onClick={handlesetTutorialOpen}
        disabled={isModalOpen || isOutputModalOpen || isTutorialModalOpen}
      >
        <span className="absolute -bottom-0 text-lg right-10">Guide</span>
      </button>
      {/* Render the TutorialModal if isModalOpen is true */}
      {isTutorialModalOpen && (
        <TutorialModal onClose={() => setIsTutorialModalOpen(false)} />
      )}
    </>
  );
};

export default StackBuilder;
