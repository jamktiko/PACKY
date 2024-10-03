import React, { useCallback, useEffect, useState } from 'react';
import { toggleOutputModal } from '@/redux/reducers/outputReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, type RootState } from '@/redux/store/store';
import { fetchCollections } from '@/redux/reducers/dataReducer';
import { CollectionData } from '@/utils/collectionData';
import { getTechs } from '@/utils/neo4j/neo4j';
import { useOutputFetch } from '@/hooks/outputFetch';
import OutputList from '../lists/outputList';
import { AccordionItem } from '../lists/accordionItem';
const OutputModal = () => {
  // Use the useSelector hook to select the outputModal value from the state
  const outputModal = useSelector(
    (state: RootState) => state.outputReducer.value
  );

  // Use the useSelector hook to select the features value from the state
  const features = useSelector(
    (state: RootState) => state.gridButtonReducer.item
  );

  // Use the useDispatch hook to get the dispatch function
  const dispatch = useDispatch<AppDispatch>();

  // Use the useOutputFetch hook to get the labelTypes value
  const { labelTypes } = useOutputFetch(features, outputModal);

  return (
    <>
      {outputModal && (
        <>
          <div
            className="grid-modal"
            onClick={() => dispatch(toggleOutputModal(false))}
          ></div>
          <div className="absolute top-0 left-0 z-50 w-screen text-3xl text-center py-2">
            <h1>Output</h1>
            <button
              className="modal-toggle"
              onClick={() => dispatch(toggleOutputModal(false))}
              type="button"
            >
              ⏎
            </button>
            {/* Map over the features array and create an AccordionItem component for each feature */}
            {features.map((feature, index) => (
              <AccordionItem
                key={feature.name}
                title={feature.name}
                description={labelTypes[index]}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default OutputModal;
