/*




MUISTA KATSOA ETTÄ OLET OIKEALLA BRANCHILLA ENNEN KUIN ALAT TEKEMÄÄN ASIOITA SAATANA!!! 







*/

import React, { useState } from 'react';
import { toggleModal } from '@/redux/reducers/gridModalReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, type RootState } from '@/redux/store/store';
import { addItem } from '@/redux/reducers/gridButtonReducer';
import { CollectionData } from '@/utils/collectionData';
import { setActiveCells, setId } from '@/redux/reducers/gridStateReducer';
import { updateChoosableCells } from '@/utils/grid/updateGridState';
interface Cell {
  row: number;
  col: number;
  item: { name: string; desc: string }[];
}

const GridModal = () => {
  const activeCells = useSelector(
    (state: RootState) => state.gridStateReducer.activeCells
  );
  const selectedCell = useSelector(
    (state: RootState) => state.gridStateReducer.selectedCell
  );

  // Haetaan modalin tila Redux-storesta
  const gridmodal = useSelector(
    (state: RootState) => state.gridModalReducer.value
  );

  // Määritellään dispatch-funktio, jota käytetään Redux-toimintojen kutsuun
  const dispatch = useDispatch<AppDispatch>();
  // Haetaan käyttäjän data Redux-storesta
  const data = useSelector((state: RootState) => state.dataReducer.value);

  // Suodatetaan data, jossa on nimi
  //modified so that the data is put into an array and into a function to be able to use persist
  const gridmodalData = Array.isArray(data)
    ? data.filter((item) => item.name)
    : [];
  //funktio handleclick kutsuu addItem funktiota, joka päivittää gridbuttonReduceriin
  //tilan ja sulkeen modalin toggleModal funktiolla

  const [pressedButtons, setPressedButtons] = useState<Set<string>>(new Set());

  const handleClick = (item: CollectionData, description: string) => {
    if (pressedButtons.has(item.name)) {
      // Button has already been pressed, ilmoita käyttäjälle
      console.log(`Ominaisuus ${item.name} on jo valittu.`);
    } else {
      // Lisätään item Redux-storeen vain, jos sitä ei ole vielä valittu
      dispatch(addItem({ name: item.name, description: description }));
      // Päivitetään pressedButtons-tila
      setPressedButtons(
        (prevPressedButtons) =>
          new Set([...Array.from(prevPressedButtons), item.name])
      );
      // päivitä button active-stateen
      //filter out the selected cell from the active cells to update its state
      dispatch(
        setActiveCells([
          ...activeCells.filter(
            (cell) =>
              cell.row !== selectedCell.row || cell.col !== selectedCell.col
          ),
          {
            ...selectedCell,
            row: selectedCell.row,
            col: selectedCell.col,
            item: [{ name: item.name, desc: description }],
            id: item.name,
          } as Cell,
        ])
      );

      updateChoosableCells(9);
      // Suljetaan modaali
      dispatch(toggleModal(false));
    }
  };

  return (
    <>
      {gridmodal && (
        <div className='grid-modal'>
          {gridmodalData.map((item, id) => (
            <button
              key={id}
              className='grid-modal-item'
              onClick={() => handleClick(item, item.desc)}
            >
              <h1 className='font-bold'>{item.name}</h1>
              <p>{item.desc}</p>
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
