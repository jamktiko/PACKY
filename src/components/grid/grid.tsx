import React, { useEffect, useState } from 'react';
import GridButton from '../buttons/GridButton';

// Manhattan distance = abs(x1 - x2) + abs(y1 - y2)
// The distance between two points measured along axes at right angles.

// SUOMEKSI: Kahden pisteen välinen etäisyys mitattuna
// suorassa kulmassa olevia akseleita pitkin.

// calculate the Manhattan distance between each cell and the
// closest choosable or active cell. Then, use this distance
// to set the opacity of the inactive cells, with the opacity
// reducing to 0

//interface defines the props it receives from stackbuilder
interface GridProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Grid: React.FC<GridProps> = ({ setIsModalOpen }) => {
  const gridSize = 9;
  const [activeCells, setActiveCells] = useState<
    { row: number; col: number }[]
  >([{ row: Math.floor(gridSize / 2), col: Math.floor(gridSize / 2) }]);
  const [choosableCells, setChoosableCells] = useState<
    { row: number; col: number }[]
  >([]);

  // Helper function to calculate Manhattan distance
  const calculateDistance = (
    cellA: { row: number; col: number },
    cellB: { row: number; col: number }
  ) => {
    return Math.abs(cellA.row - cellB.row) + Math.abs(cellA.col - cellB.col);
  };

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
    setActiveCells((prevActiveCells) => [...prevActiveCells, { row, col }]);
  };

  return (
    <div
      className='grid grid-cols-9 gap-4'
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

        let minDistance = Infinity;

        // Calculate the minimum distance to any active or choosable cell
        if (!isActive && !isChoosable) {
          [...activeCells, ...choosableCells].forEach((cell) => {
            const distance = calculateDistance({ row, col }, cell);
            if (distance < minDistance) {
              minDistance = distance;
            }
          });
        }

        // Determine the opacity based on the distance
        let opacity = 1;
        if (!isActive && !isChoosable) {
          // Reduce opacity as the distance increases, max distance is 4
          if (minDistance > 4) {
            opacity = 0;
          } else {
            opacity = 1 - minDistance * 0.45;
          }
        }

        return (
          <GridButton
            key={`${row}-${col}`}
            row={row}
            col={col}
            isActive={isActive}
            isChoosable={isChoosable}
            opacity={opacity}
            onClick={() => handleGridButtonClick(row, col)}
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
