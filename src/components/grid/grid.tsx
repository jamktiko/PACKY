/* eslint-disable react/jsx-key */
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
      const centerView = () => {
        const gridButtonElement = document.getElementById('grid-button-4-4');

        if (gridButtonElement) {
          const rect = gridButtonElement.getBoundingClientRect();
          const scale = 1; // Adjust based on your known scale

          const scrollTop =
            window.scrollY +
            rect.top / scale +
            rect.height / (2 * scale) -
            window.innerHeight / 2;
          const scrollLeft =
            window.scrollX +
            rect.left / scale +
            rect.width / (2 * scale) -
            window.innerWidth / 2;

          window.scrollTo({
            top: Math.max(0, scrollTop),
            left: Math.max(0, scrollLeft),
            behavior: 'smooth',
          });
        }
      };

      // Execute the centering logic with a delay
      const timeoutId = setTimeout(centerView, 200);

      // Cleanup on unmount
      return () => clearTimeout(timeoutId);
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
    <motion.div
      className='w-screen flex lg:justify-center justify-start'
      ref={gridRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className='fixed w-screen z-20 top-20 text-center text-2xl md:ml-0 ml-8'>
        Tap on buttons to choose features
      </h1>
      <div
        className='grid-container absolute z-10 md:scale-100 scale-75 -top-10 md:top-8'
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
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: col * 0.075 }}
            >
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
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Grid;
