import React, { useEffect, useState } from 'react';
import { toggleOutputModal } from '@/redux/reducers/outputReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, type RootState } from '@/redux/store/store';
import { fetchCollections } from '@/redux/reducers/dataReducer';
import { CollectionData } from '@/utils/collectionData';
import { getDocumentsByTags } from '@/utils/firebase/firebaseService';

const OutputModal = () => {
  // Haetaan modalin tila Redux-storesta
  let outputmodal = useSelector(
    (state: RootState) => state.outputReducer.value
  );

  // Määritellään dispatch-funktio, jota käytetään Redux-toimintojen kutsuun
  const dispatch = useDispatch<AppDispatch>();

  // // Käytetään useEffect-hookia, joka suoritetaan aina kun komponentti renderöidään
  // useEffect(() => {
  //   // Haetaan käyttäjän kokoelmat Redux-storesta
  //   dispatch(fetchCollections());
  // }, [dispatch]); // Tämä efektin riippuvuuslista tarkoittaa, että efektin suoritus uudelleen, kun dispatch-funktio muuttuu

  // // Haetaan käyttäjän data Redux-storesta
  // const data = useSelector((state: RootState) => state.dataReducer.value);

  // Suodatetaan data, jossa on nimi

  const [documents, setDocuments] = useState<CollectionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const tags = ['Frontend'];
      const documents = await getDocumentsByTags(tags);
      setDocuments(documents as CollectionData[]);
    };
    fetchData();
  }, []);

  return (
    <>
      {outputmodal && (
        <div
          className="z-50 absolute top-0 left-0 w-screen h-screen bg-black backdrop-blur-sm bg-opacity-50"
          onClick={() => dispatch(toggleOutputModal(false))}
        >
          <h1 className="bg-blue-500">tähä jotai</h1>
          <div>
            <h1>test</h1>
          </div>
          {documents.map((item, id) => (
            <div key={id}>
              <h1>{item.name}</h1>
            </div>
          ))}
          {/*
          {modalData.map((item, id) => (
            <div key={id} className='bg-green-500'>
              <h1>{item.name}</h1>
              <p>{item.description}</p>
            </div>
          ))}
          */}
          <button
            className="bg-white p-2 rounded-md"
            onClick={() => dispatch(toggleOutputModal(false))}
            type="button"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};
export default OutputModal;
