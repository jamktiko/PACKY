// Enables the use of React hooks and client-side rendering
'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridButton from '../buttons/GridButton';
import { updateChoosableCells } from '@/utils/grid/updateGridState';
import { calculateDistance } from '@/utils/grid/calculateDistance';
import { setSelectedCell } from '@/redux/reducers/gridStateReducer';
import { RootState } from '@/redux/store/store';

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
  let selectedCell = useSelector(
    (state: RootState) => state.gridStateReducer.selectedCell
  );

  const gridSize = 9;
  const dispatch = useDispatch();

  const handleGridButtonClick = (row: number, col: number) => {
    dispatch(
      setSelectedCell({
        row,
        col,
        item: [],
      })
    );
    selectedCell = {
      row,
      col,
      item: [],
    };
    setIsModalOpen(true);
  };

  useEffect(() => {
    updateChoosableCells(gridSize);
  }, [activeCells, selectedCell]);

  const isAdjacent = (
    cell1: { row: number; col: number },
    cell2: { row: number; col: number }
  ) => {
    const rowDiff = Math.abs(cell1.row - cell2.row);
    const colDiff = Math.abs(cell1.col - cell2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  };

  return (
    <div className="relative">
      {/* SVG container for lines */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          zIndex: 0, // Ensure the SVG is behind the buttons
        }}
      >
        {activeCells.map((cell1, index1) =>
          activeCells.map((cell2, index2) => {
            if (index1 !== index2 && isAdjacent(cell1, cell2)) {
              return (
                // Fragment groups elements without parent node
                // Ez placing of lines under buttons
                <React.Fragment key={`line-pair-${index1}-${index2}`}>
                  {/* Blurred line under line that joins activeCells*/}
                  <line
                    x1={`${(cell1.col + 0.5) * (100 / gridSize)}%`}
                    y1={`${(cell1.row + 0.5) * (100 / gridSize)}%`}
                    x2={`${(cell2.col + 0.5) * (100 / gridSize)}%`}
                    y2={`${(cell2.row + 0.5) * (100 / gridSize)}%`}
                    stroke="teal"
                    strokeWidth="4"
                    className="stroke-teal-500 blur-sm opacity-50"
                  />
                  {/* Line that joins activeCells */}
                  <line
                    x1={`${(cell1.col + 0.5) * (100 / gridSize)}%`}
                    y1={`${(cell1.row + 0.5) * (100 / gridSize)}%`}
                    x2={`${(cell2.col + 0.5) * (100 / gridSize)}%`}
                    y2={`${(cell2.row + 0.5) * (100 / gridSize)}%`}
                    stroke="teal"
                    strokeWidth="2"
                    className="stroke-teal-500"
                  />
                </React.Fragment>
              );
            }
            return null;
          })
        )}
      </svg>

      {/* Grid container for buttons */}
      <div
        className="grid-container relative z-10"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {Array.from({ length: gridSize * gridSize }, (_, index) => {
          const row = Math.floor(index / gridSize);
          const col = index % gridSize;

          const isActive = activeCells.some(
            (cell) => cell && cell.row === row && cell.col === col
          );
          const isChoosable = choosableCells.some(
            (cell) => cell && cell.row === row && cell.col === col
          );

          let minDistance = Infinity;

          if (!isActive && !isChoosable) {
            [...activeCells, ...choosableCells].forEach((cell) => {
              if (cell) {
                const distance = calculateDistance({ row, col }, cell);
                if (distance < minDistance) {
                  minDistance = distance;
                }
              }
            });
          }

          let opacity = 1;
          if (!isActive && !isChoosable) {
            if (minDistance > 4) {
              opacity = 0;
            } else {
              opacity = 1 - minDistance * 0.45;
            }
          }

          return (
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
    </div>
  );
};

export default Grid;
