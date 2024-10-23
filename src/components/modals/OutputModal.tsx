import React, { useCallback, useEffect, useState, Component } from 'react';
import { toggleOutputModal } from '@/redux/reducers/outputReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, type RootState } from '@/redux/store/store';
import { fetchCollections } from '@/redux/reducers/dataReducer';
import { CollectionData } from '@/utils/collectionData';
import { useOutputFetch } from '@/hooks/outputFetch';
import OutputList from '../lists/outputList';
import { AccordionItem } from '../lists/accordionItem';
import Link from 'next/link';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useTransform } from 'framer-motion';
const OutputModal = () => {
  // Use the useSelector hook to select the outputModal value from the state
  const outputModal = useSelector(
    (state: RootState) => state.outputReducer.value
  );

  // Use the useSelector hook to select the features value from the state
  const features = useSelector(
    (state: RootState) => state.gridStateReducer.activeCells
  );

  // Use the useDispatch hook to get the dispatch function
  const dispatch = useDispatch<AppDispatch>();

  // Use the useOutputFetch hook to get the labelTypes value
  const { labelTypes } = useOutputFetch(features, outputModal);

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: false,
    centerPadding: '500px',
    slidesToShow: 1,
    speed: 500,
    useTransform: true,
    useCSS: true,
  };

  return (
    console.log('Löytyny data', features),
    (
      <>
        {outputModal && (
          // <>
          //   <div
          //     className='grid-modal'
          //     onClick={() => dispatch(toggleOutputModal(false))}
          //   ></div>
          //   <div className='absolute top-28 left-0 z-40 w-screen text-3xl text-center py-2'>
          //     <h1 className='absolute -top-8'>Technology suggestions</h1>
          //     <button
          //       className='modal-toggle mt-16'
          //       onClick={() => dispatch(toggleOutputModal(false))}
          //       type='button'
          //     >
          //       ⏎
          //     </button>
          //     {/* Map over the features array and create an AccordionItem component for each feature */}
          //     <div className=' grid grid-cols-3 gap-2 place-items-center '>
          //       {features.slice(1).map((feature, index) => (
          //         <AccordionItem
          //           key={feature.item[0].name}
          //           title={feature.item[0].name}
          //           description={labelTypes[index + 1]}
          //         />
          //       ))}
          //     </div>

          //     <div className=' mt-16 border-y bg-opacity-30 pt-16 bg-black pb-16 flex justify-evenly'>
          //       <Link
          //         className='bg-white bg-opacity-20 hover:bg-opacity-40 transition-all rounded-2xl border border-teal-500 p-4'
          //         href='/library'
          //       >
          //         Explore library
          //       </Link>
          //       <Link
          //         className='bg-white bg-opacity-20 hover:bg-opacity-40 transition-all rounded-2xl border border-teal-500 p-4'
          //         href='/compare'
          //       >
          //         Compare technologies
          //       </Link>
          //     </div>
          //   </div>
          // </>
          <div className='slider-container text-center object-center content-center w-screen h-[90vh] flex justify-center absolute top-16 z-50 '>
            <Slider {...settings} className='carousel'>
              <div className='carousel-item'>
                <h3>1</h3>
                <p>Lorem ipsum</p>
                <p>Oikeisiin töihin</p>
              </div>
              <div className='carousel-item'>
                <h3>2</h3>
                <p>piss</p>
                <p>äijä tietää</p>
              </div>
              <div className='carousel-item'>
                <h3>3</h3>
                <p>react</p>
                <p>on paras muut on huonoja</p>
              </div>
            </Slider>
          </div>
        )}
      </>
    )
  );
};
export default OutputModal;
