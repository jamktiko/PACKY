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
  const [buttonName, setButtonName] = useState(
    isActive ? 'Active' : isChoosable ? 'Choose' : ''
  );

  const items = useSelector((state: RootState) => state.gridButtonReducer.item);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Update the button name based on global state when the modal sends new data
  useEffect(() => {
    if (items.length > 0 && currentIndex >= 0 && currentIndex < items.length) {
      setButtonName(items[currentIndex].name); // Set the button name to the first item in the array
    }
  }, [currentIndex, items]);

  const handleButtonClick = () => {
    setCurrentIndex(items.length);
    onClick(row, col);
    console.log(items.length);
  };

  const [color, setColor] = useState(
    isActive ? 'bg-green-500' : isChoosable ? 'bg-yellow-500' : 'bg-blue-500'
  );

  // Use React's useEffect hook to update button color if 'isActive' or 'isChoosable' props change
  React.useEffect(() => {
    if (isActive) {
      setColor('bg-slate-500'); // Set to green if button is active
    } else if (isChoosable) {
      setColor('bg-slate-700'); // Set to yellow if button is choosable
    } else {
      setColor('bg-slate-700'); // Set to blue if button is not active or choosable
    }
  }, [isActive, isChoosable]); // Trigger this effect whenever 'isActive' or 'isChoosable' changes

  const [selectState, setSelectState] = useState(
    isActive
      ? 'cursor-default'
      : isChoosable
      ? 'cursor-pointer'
      : 'pointer-events-none'
  );

  React.useEffect(() => {
    if (isActive) {
      setSelectState('cursor-default'); // Set to default cursor if button is active
    } else if (isChoosable) {
      setSelectState('cursor-pointer'); // Set to pointer cursor if button is choosable
    } else {
      setSelectState('pointer-events-none'); // Set to no interaction if button is not active or choosable
    }
  }, [isActive, isChoosable]); // Trigger this effect whenever 'isActive' or 'isChoosable' changes

  // Render button component with appropriate styling and behaviour
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(toggleModal(true));
    if (isChoosable) {
      onClick(row, col); // If the button is choosable, call the onClick function passing the row and column
    }
  };

  return (
    <div>
      <button
        id={id} // Assingning unique ID to the button
        className={`${color} ${selectState} grid-button `} // Dynamically set styling
        style={{ opacity }} // Set the button's opacity dynamically based on the 'opacity' prop
        onClick={() => {
          handleOpenModal();
          handleButtonClick();
        }}
      >
        {/* Display text based on button state (Active, Choosable or Inactive)*/}
        {isActive ? buttonName : isChoosable ? 'Choose' : ''}
      </button>
    </div>
  );
};

// Export the component so it can be used in other parts of the application
export default GridButton;
