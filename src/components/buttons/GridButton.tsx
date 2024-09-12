import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../../redux/reducers/modalReducer';

const GridButton = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(toggleModal(true));
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
    </div>
  );
};

// Export the component so it can be used in other parts of the application
export default GridButton;
