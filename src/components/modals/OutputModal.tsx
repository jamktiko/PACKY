import React, { useCallback, useEffect, useState } from 'react';
import { toggleOutputModal } from '@/redux/reducers/outputReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, type RootState } from '@/redux/store/store';
import { fetchCollections } from '@/redux/reducers/dataReducer';
import { CollectionData } from '@/utils/collectionData';
import { getTechs } from '@/utils/neo4j/neo4j';
import { useOutputFetch } from '@/hooks/outputFetch';
import OutputList from '../lists/outputList';
const OutputModal = () => {
  const outputModal = useSelector(
    (state: RootState) => state.outputReducer.value
  );
  const features = useSelector(
    (state: RootState) => state.gridButtonReducer.item
  );
  const dispatch = useDispatch<AppDispatch>();
  const { labelTypes } = useOutputFetch(features, outputModal);

  return (
    <>
      {outputModal && (
        <>
          <div
            className="grid-modal"
            onClick={() => dispatch(toggleOutputModal(false))}
          >
            <div>
              <p>
                Features you selected: {features.map((f) => f.name).join(' | ')}
              </p>
              <OutputList labelTypes={labelTypes} />
            </div>
          </div>
          <div className="absolute top-0 left-0 z-50 w-screen text-3xl text-center py-2">
            <h1>Output</h1>
            <button
              className="modal-toggle"
              onClick={() => dispatch(toggleOutputModal(false))}
              type="button"
            >
              ⏎
            </button>
          </div>
        </>
      )}
    </>
  );
};
export default OutputModal;
