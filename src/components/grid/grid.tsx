'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridButton from '../buttons/GridButton';
import {
  updateChoosableCells,
  updateActiveCells,
} from '@/utils/grid/updateGridState';
import { calculateDistance } from '@/utils/grid/calculateDistance';
import {
  setActiveCells,
  setChoosableCells,
  setSelectedCell,
} from '@/redux/reducers/gridStateReducer';
import { RootState, store } from '@/redux/store/store';
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

interface SelectedCellPayload {
  activeCells: { row: number; col: number }[];
  choosableCells: { row: number; col: number }[];
  selectedCell: { row: number; col: number };
}

const Grid: React.FC<GridProps> = ({ setIsModalOpen }) => {
  const activeCells = useSelector(
    (state: RootState) => state.gridStateReducer.activeCells
  );
  const choosableCells = useSelector(
    (state: RootState) => state.gridStateReducer.choosableCells
  );

  const gridSize = 9;
  const dispatch = useDispatch();
  const handleGridButtonClick = (row: number, col: number) => {
<<<<<<< HEAD
    const isChoosable = choosableCells.some(
      (cell: { row: number; col: number }) =>
        cell.row === row && cell.col === col
    );

    if (isChoosable) {
      // Activate the choosable cell when clicked
      updateActiveCells({ row, col });
      updateChoosableCells(gridSize); // Update the choosable cells based on new active cell
    }

    // Open the modal if choosable cell is clicked
=======
    // update selectedCell
    dispatch(
      setSelectedCell({
        row,
        col,
      })
    );
    // Opens the modal when that cell is clicked
>>>>>>> ea5a1ced009765cb2f0d142fab0be339b06dbc0a
    setIsModalOpen(true);
  };
  useEffect(() => {
    updateChoosableCells(gridSize);
  }, [activeCells]);
  return (
    // Grid component is constructed here
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

        // Check if the current cell is active or choosable
        const isActive = activeCells.some(
          (cell) => cell && cell.row === row && cell.col === col
        );
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
