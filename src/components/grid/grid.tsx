import React, { useEffect, useState } from 'react';
import GridButton from '../buttons/GridButton';

//interface defines the props it receives from stackbuilder
interface GridProps {
  //setIsModalOpen is a function that updates the state of isModalOpen
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

//Grid component is constructed here and it receives setIsModalOpen as a prop from stackbuilder
//setIsModalOpen is used to update the state of isModalOpen
const Grid: React.FC<GridProps> = ({ setIsModalOpen }) => {
  const gridSize = 9;
  const [activeCells, setActiveCells] = useState<
    { row: number; col: number }[]
  >([{ row: Math.floor(gridSize / 2), col: Math.floor(gridSize / 2) }]);
  const [choosableCells, setChoosableCells] = useState<
    { row: number; col: number }[]
  >([]);

  useEffect(() => {
    const updateGridStates = () => {
      const newChoosableCells: { row: number; col: number }[] = [];

      activeCells.forEach(({ row, col }) => {
        const neighbors = [
          { row: row - 1, col: col }, // Up
          { row: row + 1, col: col }, // Down
          { row: row, col: col - 1 }, // Left
          { row: row, col: col + 1 }, // Right
        ];

        neighbors.forEach(({ row: nRow, col: nCol }) => {
          if (nRow >= 0 && nRow < gridSize && nCol >= 0 && nCol < gridSize) {
            const isActive = activeCells.some(
              (cell) => cell.row === nRow && cell.col === nCol
            );
            if (!isActive) {
              newChoosableCells.push({ row: nRow, col: nCol });
            }
          }
        });
      });

      setChoosableCells(newChoosableCells);
    };

    updateGridStates();
  }, [activeCells]);

  const handleGridButtonClick = (row: number, col: number) => {
    setIsModalOpen(true);
    setActiveCells((prevActiveCells) => [...prevActiveCells, { row, col }]);
  };

  return (
    <div
      className="grid grid-cols-9 gap-4"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {Array.from({ length: gridSize * gridSize }, (_, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        const isActive = activeCells.some(
          (cell) => cell.row === row && cell.col === col
        );
        const isChoosable = choosableCells.some(
          (cell) => cell.row === row && cell.col === col
        );
        const opacity = isActive || isChoosable ? 1 : 0.5; // Adjust opacity based on state

        return (
          <GridButton
            key={`${row}-${col}`}
            row={row}
            col={col}
            isActive={isActive}
            isChoosable={isChoosable}
            opacity={opacity}
            onClick={handleGridButtonClick}
            id={''}
            handleGridButtonClick={function (id: string): void {
              throw new Error('Function not implemented.');
            }}
          />
        );
      })}
    </div>
  );
};

export default Grid;
