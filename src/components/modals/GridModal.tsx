/*




MUISTA KATSOA ETTÄ OLET OIKEALLA BRANCHILLA ENNEN KUIN ALAT TEKEMÄÄN ASIOITA SAATANA!!! 







*/

import React, { useEffect } from 'react';
import { toggleModal } from '@/redux/reducers/gridModalReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, type RootState } from '@/redux/store/store';
import { fetchCollections } from '@/redux/reducers/dataReducer';
import { addItem } from '@/redux/reducers/gridButtonReducer';
import { CollectionData } from '@/utils/collectionData';

const GridModal = () => {
  // Haetaan modalin tila Redux-storesta
  const gridmodal = useSelector(
    (state: RootState) => state.gridModalReducer.value
  );

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
  //modified so that the data is put into an array and into a function to be able to use persist
  const gridmodalData = Array.isArray(data)
    ? data.filter((item) => item.name)
    : [];
  //funktio handleclick kutsuu addItem funktiota, joka päivittää gridbuttonReduceriin
  //tilan ja sulkeen modalin toggleModal funktiolla
  const handleClick = (item: CollectionData, tags: string[]) => {
    dispatch(addItem({ name: item.name, tags: tags }));
    dispatch(toggleModal(false));
  };

  return (
    <>
      {gridmodal && (
        <div className='grid-modal'>
          {gridmodalData.map((item, id) => (
            <button
              key={id}
              className='grid-modal-item '
              onClick={() => handleClick(item, item.tags)}
            >
              <h1 className='font-bold'>{item.name}</h1>
              <p>{item.description}</p>
            </button>
          ))}
          <div className='absolute top-0 left-0 z-50 w-screen text-3xl text-center py-2'>
            <h1>Choose feature</h1>
            <button
              className='modal-toggle'
              onClick={() => dispatch(toggleModal(false))}
              type='button'
            >
              ⏎
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GridModal;
