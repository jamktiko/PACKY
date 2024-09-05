import React from 'react';
import GridButton from '../buttons/GridButton';

//functional component grid, creating an array with 9x9 buttons
const Grid: React.FC = () => {
  const cells = Array.from({ length: 81 }, (_, i) => (
    <GridButton key={i} onClick={() => console.log(i)}>
      {i}
    </GridButton>
  ));

  return <div className="grid grid-cols-9 gap-4">{cells}</div>;
};

export default Grid;
