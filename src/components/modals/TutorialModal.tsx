/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { RootState } from '@/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTutorial } from '@/redux/reducers/tutorialReducer';
import { useRouter } from 'next/router';

const TutorialModal = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const tutorialState = useSelector(
    (state: RootState) => state.tutorialReducer
  );

  const router = useRouter();

  const customStyles = {
    content: {
      className: 'center',
      centerMode: true,
      infinite: false,
      centerPadding: '500px',
      slidesToShow: 1,
      speed: 500,
      useTransform: true,
      useCSS: true,
    },
  };
  const [isOpen, setIsOpen] = useState(tutorialState.isOpen);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    dispatch(toggleTutorial(!isOpen));
    onClose();
  };

  //useEffect to close the modal when the route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
      dispatch(toggleTutorial(false));
    };
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [dispatch, router.events]);

  const imageSize: number = 300;
  return (
    <>
      {isOpen && (
        <div className="fixed z-50 left-0 top-16 w-screen h-screen bg-black backdrop-blur bg-opacity-80">
          <button
            onClick={handleToggle}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
            }}
          >
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className="rounded border border-teal-500 p-3 m-2 bg-teal-800"
            >
              Close tutorial
            </motion.div>
          </button>
          <motion.div
            className="text-sm sm:text-base mt-20 sm:mt-3 flex flex-col text-left overflow-y-scroll"
            style={{
              height: 'calc(100vh - 100px)', // adjust the height to your needs
              overflowY: 'auto',
            }}
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Rivi 1 */}
            <div className="flex lg:flex-row flex-col justify-evenly">
              <div className="bg-black border border-teal-500 rounded m-1 p-2 min-w-96 min-h-96 w-full">
                <b>Overview</b>
                <p>
                  PACKY StackBuilder has 3: Tech library, Feature grid and
                  Output slideshow.
                </p>
                <p>
                  You can first choose preferred technologies, which will weigh
                  in on the calculations PACKY does.
                </p>
                <p>
                  The Library also showcases all technologies currently
                  supported by PACKY. It sources 4 or 5 globally famous
                  technologies.
                </p>
              </div>
              <div className="border border-teal-500 rounded m-1 p-2 min-w-96 min-h-96 w-full flex flex-row justify-evenly">
                <div>
                  {' '}
                  <b>Tech Library</b>
                  <p>Click on technologies to read more about them.</p>
                  <p>
                    In order to add a technology to your preferences, click on
                    the checkbox on them.
                  </p>
                  <p>
                    You can choose multiple similar technologies - the app may
                    still suggest other technologies after the preferred ones.
                  </p>
                </div>
                <Image
                  className=" -z-10 sm:max-w-full max-w-52 bg-black opacity-50"
                  src={'/images/tutorial/library.png'}
                  alt="library"
                  width={imageSize}
                  height={imageSize}
                />
              </div>
            </div>
            {/* Rivi 2 */}
            <div className=" flex lg:flex-row flex-col justify-evenly">
              <div className=" border border-teal-500 rounded m-1 p-2 min-w-96 min-h-96 w-full flex flex-row justify-evenly">
                <div>
                  <b>Feature Grid</b>
                  <p>
                    Click on a grid cell to choose a desired feature. The grid
                    expands as you choose - there are a maximum of 81 cells, so
                    do not worry about running out of space.
                  </p>
                </div>

                <Image
                  className=" -z-10 sm:max-w-full max-w-52 bg-black opacity-50"
                  src={'/images/tutorial/grid.png'}
                  alt="grid"
                  width={imageSize}
                  height={imageSize}
                />
              </div>
              <div className="border border-teal-500 rounded m-1 p-2 min-w-96 min-h-96 w-full flex flex-row justify-evenly">
                <div>
                  <b>Output</b>
                  <p>
                    After you've chosen your preferred technologies and
                    features, the app compiles all data and forms to a list of
                    suggested tech stacks.
                  </p>
                  <p>
                    The amount of suggestions is based on the amount of
                    technologies chosen.
                  </p>
                </div>
                <Image
                  className="-z-10 sm:max-w-full max-w-52 bg-black opacity-50"
                  src={'/images/tutorial/output.png'}
                  alt="output"
                  width={imageSize}
                  height={imageSize}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default TutorialModal;
