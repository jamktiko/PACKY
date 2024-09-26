import React, { useCallback, useEffect, useState } from 'react';
import { toggleOutputModal } from '@/redux/reducers/outputReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, type RootState } from '@/redux/store/store';
import { fetchCollections } from '@/redux/reducers/dataReducer';
import { CollectionData } from '@/utils/collectionData';
import { getTechs } from '@/utils/neo4j/neo4j';

const OutputModal = () => {
  // Selecting the outputModal state from the redux store
  const outputModal = useSelector(
    (state: RootState) => state.outputReducer.value
  );
  const features = useSelector(
    (state: RootState) => state.gridButtonReducer.item
  );
  // With this discpatch function we can trigger actions in the redux store
  const dispatch = useDispatch<AppDispatch>();
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [labelTypes, setLabelTypes] = useState<{ [key: string]: string[] }>({});
  const fetchTechnologies = useCallback(async () => {
    if (outputModal) {
      const techs = await getTechs(features.map((feature) => feature.name));
      const technologies = techs.map((tech) => tech.name);
      const t = techs.map((t) => t.type).flat();

      const types = techs.reduce((categories, tech) => {
        tech.type.forEach((type: any) => {
          if (!categories[type]) {
            categories[type] = [];
          }
          categories[type].push(tech.name);
        });

        return categories;
      }, {});
      console.log(techs);

      console.log('mapattu ' + technologies.join(','));
      setTechnologies(technologies);
      setLabelTypes(types);
    }
  }, [features, outputModal]);

  useEffect(() => {
    if (outputModal) {
      console.log('fetching technologies');
      fetchTechnologies();
    }
  }, [fetchTechnologies, outputModal]);
  // Selecting the outPutItem from the redux store
  // outPutItem contains items, name and tags
  // const outPutItem = useSelector(
  //   (state: RootState) => state.gridButtonReducer.outPutItem
  // );

  // React state to store the fetched documents
  // Initially, it's an empty array of type CollectionData[]
  // const [documents, setDocuments] = useState<CollectionData[]>([]);
  // // Mapping tags from outPutItem and flattening the array
  // const tags = outPutItem.map((item) => item.tags).flat();

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
                Features you selected: {features.map((f) => f.name).join(',')}
              </p>
              <div>
                Technologies what we recommend to use with the features you have
                selected:
                {Object.entries(labelTypes).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-red-600">{key.toUpperCase()}</p>
                    <ul>
                      {value.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
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
