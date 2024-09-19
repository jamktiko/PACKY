import React, { useEffect, useState } from 'react';
import { toggleOutputModal } from '@/redux/reducers/outputReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, type RootState } from '@/redux/store/store';
import { fetchCollections } from '@/redux/reducers/dataReducer';
import { CollectionData } from '@/utils/collectionData';
import { getDocumentsByTags } from '@/utils/firebase/firebaseService';

const OutputModal = () => {
  // Selecting the outputModal state from the redux store
  const outputModal = useSelector(
    (state: RootState) => state.outputReducer.value
  );
  // Selecting the outPutItem from the redux store
  // outPutItem contains items, name and tags
  const outPutItem = useSelector(
    (state: RootState) => state.gridButtonReducer.outPutItem
  );
  // With this discpatch function we can trigger actions in the redux store
  const dispatch = useDispatch<AppDispatch>();

  // React state to store the fetched documents
  // Initially, it's an empty array of type CollectionData[]
  const [documents, setDocuments] = useState<CollectionData[]>([]);

  // Mapping tags from outPutItem and flattening the array
  const tags = outPutItem.map((item) => item.tags).flat();

  useEffect(() => {
    const fetchData = async () => {
      // Only fetch documents if there are tags available
      if (tags.length > 0) {
        const documents = await getDocumentsByTags(tags);
        setDocuments(documents as CollectionData[]);
      }
    };
    fetchData();
  }, [tags]);

  return (
    <>
      {outputModal && (
        <div
          className='z-50 absolute top-0 left-0 w-screen h-screen bg-black backdrop-blur-sm bg-opacity-50'
          onClick={() => dispatch(toggleOutputModal(false))}
        >
          <h1 className='bg-blue-500'>tähä jotai</h1>
          <div>
            <h1>test</h1>
          </div>
          {documents.map((item, id) => (
            <div key={id}>
              <h1>{item.name}</h1>
            </div>
          ))}
          <button
            className='modal-toggle'
            onClick={() => dispatch(toggleOutputModal(false))}
            type='button'
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};
export default OutputModal;
