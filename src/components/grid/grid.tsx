// Enables the use of React hooks and client-side rendering
'use client';
import React, { useState, useEffect } from 'react';
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
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  if (width < 700) {
    return (
      <div className='rotate-screen-message'>
        <p>
          In order to use the grid, please try turning your device sideways.
        </p>
      </div>
    );
  }
  return (
    <div>
      {/* Grid container for buttons */}
      <div
        className='grid-container absolute z-10'
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          // gridTemplateColumns: `repeat(auto-fill, 150px)`,
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
      <div className='rotate-screen-message' style={{ display: 'none' }}>
        <p>Please try turning your screen sideways for a better experience.</p>
      </div>
    </div>
  );
};

export default Grid;
