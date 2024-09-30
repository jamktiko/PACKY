'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GridButton from '../buttons/GridButton';
import { updateGridStates } from '@/utils/grid/updateGridState';
import { calculateDistance } from '@/utils/grid/calculateDistance';
import {
  setActiveCells,
  setChoosableCells,
} from '@/redux/reducers/gridStateReducer';
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

const Grid: React.FC<GridProps> = ({ setIsModalOpen }) => {
  const activeCells = useSelector(
    (state: RootState) => state.gridStateReducer.activeCells
  );
  const choosableCells = useSelector(
    (state: RootState) => state.gridStateReducer.choosableCells
  );

  const gridSize = 9;

  const handleGridButtonClick = (row: number, col: number) => {
    // Opens the modal when that cell is clicked
    setIsModalOpen(true);
  };
  useEffect(() => {
    updateGridStates(gridSize);
  }, []);
  return (
    // Grid component is constructed here
    <div
      className='grid-container'
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {/* Grid buttons are constructed here */}
      {Array.from({ length: gridSize * gridSize }, (_, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        const isActive = activeCells.some(
          (cell: { row: number; col: number }) =>
            cell.row === row && cell.col === col
        );
        const isChoosable = choosableCells.some(
          (cell: { row: number; col: number }) =>
            cell.row === row && cell.col === col
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
          // Renders the grid buttons
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
