import React from 'react';

//functional component grid, creating an array with 9x9 buttons
const Grid: React.FC = () => {
  const cells = Array.from({ length: 81 }, (_, i) => (
    <button key={i} onClick={() => console.log(i)}>
      {i}
    </button>
  ));

  return <div className="grid grid-cols-9 gap-4">{cells}</div>;
};

export default Grid;
