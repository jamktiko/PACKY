import React, { useState } from 'react';

interface GridButtonProps {
  row: number;
  col: number;
  isActive: boolean;
  isChoosable: boolean;
  opacity: number;
  id: string;
  onClick: (row: number, col: number) => void;
  handleGridButtonClick: (id: string) => void;
}

const GridButton: React.FC<GridButtonProps> = ({
  id,
  row,
  col,
  isActive,
  isChoosable,
  opacity,
  onClick,
}) => {
  // Define initial color based on the state
  const [color, setColor] = useState(
    isActive ? 'bg-green-500' : isChoosable ? 'bg-yellow-500' : 'bg-blue-500'
  );

  // Update color when isActive or isChoosable props change
  React.useEffect(() => {
    if (isActive) {
      setColor('bg-green-500');
    } else if (isChoosable) {
      setColor('bg-yellow-500');
    } else {
      setColor('bg-blue-500');
    }
  }, [isActive, isChoosable]);

  // Handle button click
  const handleClick = () => {
    if (isChoosable) {
      onClick(row, col);
    }
  };

  return (
    <button
      id={id}
      className={`${color} text-white px-5 py-5 rounded hover:opacity-10`}
      onClick={handleClick}
      style={{ opacity }}
    >
      {isActive ? 'Active' : isChoosable ? 'Choosable' : 'Inactive'}
    </button>
  );
};

export default GridButton;
