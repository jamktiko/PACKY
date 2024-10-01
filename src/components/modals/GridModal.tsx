/*




MUISTA KATSOA ETTÄ OLET OIKEALLA BRANCHILLA ENNEN KUIN ALAT TEKEMÄÄN ASIOITA SAATANA!!! 







*/

import React, { useState } from 'react';
import { toggleModal } from '@/redux/reducers/gridModalReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, type RootState } from '@/redux/store/store';
import { addItem } from '@/redux/reducers/gridButtonReducer';
import { CollectionData } from '@/utils/collectionData';
import { setActiveCells } from '@/redux/reducers/gridStateReducer';
import { updateChoosableCells } from '@/utils/grid/updateGridState';
interface Cell {
  row: number;
  col: number;
}

const GridModal = () => {
  // Use the useSelector hook to retrieve the activeCells and selectedCell from the Redux store
  const activeCells = useSelector(
    (state: RootState) => state.gridStateReducer.activeCells //Get active cells from store
  );
  const selectedCell = useSelector(
    (state: RootState) => state.gridStateReducer.selectedCell //Get selected cells from store
  );

  // Get modal state from the Redux store
  const gridmodal = useSelector(
    (state: RootState) => state.gridModalReducer.value
  );

  // Get the dispatch function from the Redux store
  const dispatch = useDispatch<AppDispatch>();
  // Retrieve the user data from the Redux store
  const data = useSelector((state: RootState) => state.dataReducer.value);

  // Filter the data to only include items with a name
  //modified so that the data is put into an array and into a function to be able to use persist
  const gridmodalData = Array.isArray(data)
    ? data.filter((item) => item.name)
    : [];

  // Define the handleClick function to handle button clicks
  // which updates gridbuttonreducer and closes the modal with togglemodal function
  const [pressedButtons, setPressedButtons] = useState<Set<string>>(new Set());
  const handleClick = (item: CollectionData, description: string) => {
    //check if the specific feature has been already chosen
    if (pressedButtons.has(item.name)) {
      // Button has already been pressed, notify user
      console.log(`Ominaisuus ${item.name} on jo valittu.`);
    } else {
      // If the button has not been pressed, add the item to the Redux store and update the pressed buttons state
      dispatch(addItem({ name: item.name, description: description }));
      setPressedButtons(
        (prevPressedButtons) =>
          new Set([...Array.from(prevPressedButtons), item.name]) // Update the pressed buttons state
      );
      // update button active state
      //filter out the selected cell from the active cells to update its state
      dispatch(
        setActiveCells([
          ...activeCells.filter(
            (cell) =>
              cell.row !== selectedCell.row || cell.col !== selectedCell.col
          ),
          selectedCell as Cell,
        ])
      );
      updateChoosableCells(9);
      // close modal
      dispatch(toggleModal(false));
    }
  };
  //render modal
  return (
    <>
      {gridmodal && (
        <div className="grid-modal">
          {gridmodalData.map((item, id) => (
            <button
              key={id}
              className="grid-modal-item"
              onClick={() => handleClick(item, item.desc)} // Call the handleClick function when the button is clicked
            >
              <h1 className="font-bold">{item.name}</h1>
              <p>{item.desc}</p>
            </button>
          ))}
          <div className="absolute top-0 left-0 z-50 w-screen text-3xl text-center py-2">
            <h1>Choose feature</h1>
            <button
              className="modal-toggle"
              onClick={() => dispatch(toggleModal(false))} //close modal
              type="button"
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
