// Enables the use of React hooks and client-side rendering
'use client';
// All the imports that are needed
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridButton from '../buttons/GridButton';
import { updateChoosableCells } from '@/utils/grid/updateGridState';
import { calculateDistance } from '@/utils/grid/calculateDistance';
import { setSelectedCell } from '@/redux/reducers/gridStateReducer';
import { RootState } from '@/redux/store/store';
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
// Functional component for rendering the grid
const Grid: React.FC<GridProps> = ({ setIsModalOpen }) => {
  // Accessing Redux state for active and choosable cells using useSelector hook
  const activeCells = useSelector(
    (state: RootState) => state.gridStateReducer.activeCells
  );
  const choosableCells = useSelector(
    (state: RootState) => state.gridStateReducer.choosableCells
  );

  // Define gridsize and dispatch
  const gridSize = 9;
  const dispatch = useDispatch();
  // Handler to handle what happens when grid button is clicked
  // row and col parameters
  const handleGridButtonClick = (row: number, col: number) => {
    // update selectedCell with dispatch redux action
    dispatch(
      setSelectedCell({
        row,
        col,
      })
    );
    // Opens the modal when that cell is clicked
    setIsModalOpen(true);
  };
  // UseEffect to update choosable cells whenever activeCells change
  useEffect(() => {
    updateChoosableCells(gridSize);
  }, [activeCells]);

  return (
    // Container for the grid, styled with CSS Grid
    <div
      className="grid-container"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {/* Grid buttons are constructed here */}
      {Array.from({ length: gridSize * gridSize }, (_, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;

        // Check if the current cell is active by comparing row and col
        const isActive = activeCells.some(
          (cell) => cell && cell.row === row && cell.col === col
        );
        // Check if the current cell is choosable by comparing row and col
        const isChoosable = choosableCells.some(
          (cell) => cell && cell.row === row && cell.col === col
        );

        let minDistance = Infinity;

        // Calculate distance if the cell is neither active nor choosable
        if (!isActive && !isChoosable) {
          [...activeCells, ...choosableCells].forEach((cell) => {
            if (cell) {
              // Ensure valid cell before calculating distance
              const distance = calculateDistance({ row, col }, cell);
              if (distance < minDistance) {
                minDistance = distance;
              }
            }
          });
        }

        // Calculate opacity based on distance
        let opacity = 1;
        if (!isActive && !isChoosable) {
          if (minDistance > 4) {
            opacity = 0;
          } else {
            opacity = 1 - minDistance * 0.45;
          }
        }

        return (
          // Render the grid button
          <GridButton
            id={`grid-button-${row}-${col}`}
            key={`${row}-${col}`}
            row={row}
            col={col}
            isActive={isActive}
            isChoosable={isChoosable}
            opacity={opacity}
            onClick={() => handleGridButtonClick(row, col)}
          />
        );
      })}
    </div>
  );
};

export default Grid;
