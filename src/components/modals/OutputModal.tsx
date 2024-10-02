import React from 'react';
import { toggleOutputModal } from '@/redux/reducers/outputReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, type RootState } from '@/redux/store/store';
import { useOutputFetch } from '@/hooks/outputFetch';
import { AccordionItem } from '../lists/accordionItem';

const OutputModal = () => {
  const outputModal = useSelector(
    (state: RootState) => state.outputReducer.value
  );
  const features = useSelector(
    (state: RootState) => state.gridButtonReducer.item
  );
  const dispatch = useDispatch<AppDispatch>();
  const { labelTypes } = useOutputFetch(features, outputModal);

  const keyMapping: { [key: string]: string } = {
    frontendFramework: 'frontendFramework',
    backendFramework: 'backendFramework',
    api: 'api',
    database: 'database',
    Language: 'Language',
    library: 'library',
    service: 'service',
  };

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
            {features.map((f) => {
              // Muotoillaan kuvaus OutputModal-komponentissa
              const descriptionText = Object.entries(labelTypes)
                .map(([key, value]) => {
                  const techType = keyMapping[key];
                  if (techType) {
                    const techs = value.join(' | ');
                    let sentence = '';
                    if (techType === 'frontendFramework') {
                      sentence = `For the frontend, we recommend these frameworks:  ${techs}.`;
                    } else if (techType === 'backendFramework') {
                      sentence = `We suggest using this framework for the backend: ${techs}.`;
                    } else if (techType === 'api') {
                      sentence = `For this feature, consider these API's: ${techs}.`;
                    } else if (techType === 'library') {
                      sentence = `You might find these libraries useful: ${techs}.`;
                    } else if (techType === 'service') {
                      sentence = `We suggest using these services: ${techs}.`;
                    } else if (techType === 'database') {
                      sentence = `We suggest using these databases: ${techs}.`;
                    } else if (techType === 'Language') {
                      sentence = `For this feature, consider these languages: ${techs}.`;
                    }
                    return sentence;
                  }
                })
                .filter(Boolean)
                .join(' '); // Poistetaan tyhjät arvot ja yhdistetään lauseet
              console.log('testi: ' + descriptionText);
              return (
                <AccordionItem
                  key={f.name}
                  title={f.name}
                  description={descriptionText}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default OutputModal;
