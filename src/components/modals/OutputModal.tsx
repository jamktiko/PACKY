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
import Loader from '../loader';

interface Technology {
  technology: string;
  totalWeight: number;
  technologyCategory: string[];
}
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
  const { technologyGroups, isLoading } = useOutputFetch(features, outputModal);

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

  if (isLoading) {
    return (
      <div className='slider-container fixed text-center object-center content-center w-screen h-[90vh] flex justify-center top-16 z-50'>
        <div className='carousel'>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <>
      {outputModal && (
        <div className='slider-container fixed text-center object-center content-center w-screen h-[90vh] flex justify-center top-16 z-50'>
          <Slider {...settings} className='carousel'>
            {technologyGroups.map((group, index) => (
              <div className='carousel-item' key={index}>
                <h3>{index + 1}</h3>
                {Object.entries(group).map(([category, techs]) => (
                  <div key={category}>
                    <p className='font-bold'>{category}:</p>
                    <ul>
                      {techs.map((tech, i) => (
                        <li key={i}>
                          Technology: {tech.technology} | Total Weight:
                          {tech.totalWeight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};
export default OutputModal;
