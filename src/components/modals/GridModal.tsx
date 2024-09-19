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
  const gridmodalData = data.filter((item) => item.name);

  //funktio handleclick kutsuu addItem funktiota, joka päivittää gridbuttonReduceriin
  //tilan ja sulkeen modalin toggleModal funktiolla
  const handleClick = (item: CollectionData, tags: string[]) => {
    dispatch(addItem({ name: item.name, tags: tags }));
    dispatch(toggleModal(false));
  };

  return (
    <>
      {gridmodal && (
        <div className=''>
          <h1 className='bg-blue-500'>Tähän data</h1>
          {gridmodalData.map((item, id) => (
            <button
              key={id}
              className='bg-green-500 w-full hover:bg-red-800'
              onClick={() => handleClick(item, item.tags)}
            >
              <h1>{item.name}</h1>
              <p>{item.description}</p>
            </button>
          ))}
          <button
            className='modal-toggle'
            onClick={() => dispatch(toggleModal(false))}
            type='button'
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default GridModal;
