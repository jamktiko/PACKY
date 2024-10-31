// All the imports thats needed
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../redux/reducers/gridModalReducer';
import { RootState } from '@/redux/store/store';

// Define the interface for the props that the GridButton component will receive
// What values they can take (number, boolean, string etc.)
interface GridButtonProps {
  row: number;
  col: number;
  isActive: boolean;
  isChoosable: boolean;
  opacity: number;
  onClick: (row: number, col: number) => void; // Function to handle click event with row and col as parameters
  id: string; // Added id as a prop
}
// Define the functional components for GridButton (no starting values)
const GridButton: React.FC<GridButtonProps> = ({
  // Destructure values from the props object to use them directly inside the component.
  // These values are passed when the component is used. Initial values are not defined here
  // because these are directly coming from the parent component when it calls GridButton.
  row, // Row index in the grid
  col, // Column index in the grid
  isActive, // Whether the button is active
  isChoosable, // Whether the button is choosable
  opacity, // Opacity level for the button styling
  onClick, // Function to handle the button click (passed from parent component)
  id,
}) => {
  // Render button component with appropriate styling and behaviour
  const dispatch = useDispatch();

  let selectedCell = useSelector(
    (state: RootState) => state.gridStateReducer.selectedCell
  );

  const activeCells = useSelector(
    (state: RootState) => state.gridStateReducer.activeCells
  );

  // Find the index of the current cell (button) in the activeCells array based on its row and column.
  // If the cell with matching row and col values exists in activeCells, cellIndex will hold its index
  // otherwise, cellIndex will be -1 (indicating the cell is not in activeCells).
  const cellIndex = activeCells.findIndex(
    (cell) => cell.row === row && cell.col === col
  );
  // Set the button's name based on the cell's state:
  // - If cellIndex is valid (not -1), it means this cell is in activeCells,
  //   so set buttonName to the name of the first item in this cell's item array.
  // - If cellIndex is -1 and the cell is choosable (isChoosable is true),
  //   set buttonName to "Choose" to indicate it can be selected.
  // - If cellIndex is -1 and the cell is not choosable, leave buttonName as an empty string.
  const buttonName =
    cellIndex !== -1
      ? activeCells[cellIndex].item[0].name
      : isChoosable
      ? 'Choose'
      : '';

  // Get items from the global Redux state using useSelector hook (passed from gridButtonReducer.ts)
  const items = useSelector(
    (state: RootState) => state.gridStateReducer.activeCells
  );

  // State to track the current index for button name updates
  const [currentIndex, setCurrentIndex] = useState(-1);

  // useEffect hook to update the button name when items or currentIndex changes
  useEffect(() => {
    // If there are items and the index is valid
    // set the button name to the current item's name
    // the index array changes if the selected cell changes
    if (
      selectedCell !== null &&
      selectedCell.row === row &&
      selectedCell.col === col
    ) {
      const originalIndex = activeCells.findIndex(
        (cell) => cell.row === row && cell.col === col
      );
      const selectedIndex = activeCells.findIndex(
        (cell) =>
          cell.row === selectedCell?.row && cell.col === selectedCell.col
      );
      console.log('selected index:', selectedIndex);
      console.log('buttonname is ', buttonName);
      console.log('originalindex is', originalIndex);

      if (originalIndex !== -1 && selectedIndex !== originalIndex) {
        setCurrentIndex(originalIndex);
      } else {
        setCurrentIndex(selectedIndex);
      }

      // Update the button name here
    }
  }, [currentIndex, items, selectedCell, row, col, activeCells, buttonName]);

  // Handle button click event
  const handleButtonClick = () => {
    selectedCell = { row, col, item: [] };
  };

  // Set initial button color based on isActive or isChoosable
  const [color, setColor] = useState(
    isActive ? 'bg-slate-500' : isChoosable ? 'bg-slate-700' : 'bg-slate-700'
  );

  // Use React's useEffect hook to update button color if 'isActive' or 'isChoosable' props change
  React.useEffect(() => {
    if (isActive) {
      setColor('bg-slate-500'); // Set to 'bg-slate-500' if button is active
    } else if (isChoosable) {
      setColor('bg-slate-700'); // Set to 'bg-slate-700' if button is choosable
    } else {
      setColor('bg-slate-700'); // Set to 'bg-slate-700' if button is not active or choosable
    }
  }, [col, isActive, isChoosable, row]); // Trigger this effect whenever 'isActive' or 'isChoosable' changes

  // Set initial select state based on whether the button is active, choosable, or inactive
  const [selectState, setSelectState] = useState(
    isActive
      ? 'cursor-default' // Default cursor if button is active
      : isChoosable
      ? 'cursor-pointer' // Pointer cursor if button is choosable
      : 'pointer-events-none' // No interaction if button is inactive
  );

  // useEffect hook to update the cursor interaction based on 'isActive' or 'isChoosable' changes
  React.useEffect(() => {
    if (isActive) {
      setSelectState('cursor-default'); // Set to default cursor if button is active
    } else if (isChoosable) {
      setSelectState('cursor-pointer'); // Set to pointer cursor if button is choosable
    } else {
      setSelectState('pointer-events-none'); // Set to no interaction if button is not active or choosable
    }
  }, [isActive, isChoosable]); // Trigger this effect whenever 'isActive' or 'isChoosable' changes

  // Function to handle modal opening
  const handleOpenModal = () => {
    if (isChoosable || isActive) {
      onClick(row, col); // If the button is choosable, call the onClick function passing the row and column
    }

    dispatch(toggleModal(true)); // Dispatch Redux action to open the modal
  };

  return (
    <button
      id={id} // Assingning unique ID to the button
      className={`${color} ${selectState} grid-button `} // Dynamically set styling
      style={{ opacity }} // Set the button's opacity dynamically based on the 'opacity' prop
      onClick={() => {
        handleOpenModal(); // Open the modal on button click
        handleButtonClick(); // Handle button click logic
      }}
    >
      {/* Display text based on button state (Active, Choosable or Inactive)*/}
      {isActive ? buttonName : isChoosable ? 'Choose' : ''}
    </button>
  );
};

// Export the component so it can be used in other parts of the application
export default GridButton;
