import React, { useEffect } from 'react';
import { toggleModal } from '@/redux/reducers/modalReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, type RootState } from '@/redux/store/store';
import { fetchCollections } from '@/redux/reducers/dataReducer';

const OutputModal = () => {
  // Haetaan modalin tila Redux-storesta
  const modal = useSelector((state: RootState) => state.modalReducer.value);

  // Määritellään dispatch-funktio, jota käytetään Redux-toimintojen kutsuun
  const dispatch = useDispatch<AppDispatch>();

  // Käytetään useEffect-hookia, joka suoritetaan aina kun komponentti renderöidään
  useEffect(() => {
    // Haetaan käyttäjän kokoelmat Redux-storesta
    dispatch(fetchCollections());
  }, [dispatch]); // Tämä efektin riippuvuuslista tarkoittaa, että efektin suoritus uudelleen, kun dispatch-funktio muuttuu

  // Haetaan käyttäjän data Redux-storesta
  const data = useSelector((state: RootState) => state.dataReducer.value);

  // Suodatetaan data, jossa on nimi
  const modalData = data.filter((item) => item.name);
  return (
    <>
      {modal && (
        <div className="z-50 absolute top-0 left-0 w-screen h-screen bg-black backdrop-blur-sm bg-opacity-50">
          <h1 className="bg-blue-500">tähä jotai</h1>
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
            onClick={() => dispatch(toggleModal(false))}
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
