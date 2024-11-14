'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridButton from '../buttons/GridButton';
import { updateChoosableCells } from '@/utils/grid/updateGridState';
import { calculateDistance } from '@/utils/grid/calculateDistance';
import { setSelectedCell } from '@/redux/reducers/gridStateReducer';
import { RootState } from '@/redux/store/store';
import { motion } from 'framer-motion';

interface GridProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Grid: React.FC<GridProps> = ({ setIsModalOpen }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const gridSize = 9;

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [isGridVisible, setIsGridVisible] = useState(false);

  const activeCells = useSelector(
    (state: RootState) => state.gridStateReducer.activeCells
  );
  const choosableCells = useSelector(
    (state: RootState) => state.gridStateReducer.choosableCells
  );
  let selectedCell = useSelector(
    (state: RootState) => state.gridStateReducer.selectedCell
  );

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

  useEffect(() => {
    if (!isGridVisible) {
      setIsGridVisible(true);
    }
  }, [isGridVisible]);

  useEffect(() => {
    if (isGridVisible) {
      const gridButtonElement = document.getElementById('grid-button-4-4');
      if (gridButtonElement) {
        const rect = gridButtonElement.getBoundingClientRect();
        window.scrollTo({
          top: Math.abs(
            window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2
          ),
          left: Math.abs(
            rect.left + window.scrollX + rect.width / 2 - window.innerWidth / 2
          ),
          behavior: 'smooth',
        });
      }
    }
  }, [isGridVisible]);

  useEffect(() => {
    updateChoosableCells(gridSize);
  }, [activeCells, selectedCell]);

  const handleGridButtonClick = (row: number, col: number) => {
    dispatch(setSelectedCell({ row, col, item: [] }));
    selectedCell = { row, col, item: [] };
    setIsModalOpen(true);
  };

  return (
    <motion.div ref={gridRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div
        className='grid-container absolute z-10 md:scale-100 scale-75 -top-28 md:-top-0'
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
    </motion.div>
  );
};

export default Grid;
