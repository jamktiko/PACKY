import React from 'react';
import { toggleModal } from '@/redux/reducers/gridModalReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, type RootState } from '@/redux/store/store';
import { CollectionData } from '@/utils/interface/collectionData';
import {
  setActiveCells,
  setChoosableCells,
} from '@/redux/reducers/gridStateReducer';
import { updateChoosableCells } from '@/utils/grid/updateGridState';
import { motion } from 'framer-motion';

interface Cell {
  row: number;
  col: number;
  item: { name: string; desc: string; tips: string }[];
}

const GridModal = () => {
  const activeCells = useSelector(
    (state: RootState) => state.gridStateReducer.activeCells
  );
  const selectedCell = useSelector(
    (state: RootState) => state.gridStateReducer.selectedCell
  );
  const choosableCells = useSelector(
    (state: RootState) => state.gridStateReducer.choosableCells
  );
  const gridmodal = useSelector(
    (state: RootState) => state.gridModalReducer.value
  );
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.dataReducer.value);

  const gridmodalData = Array.isArray(data)
    ? data.filter((item) => item.name)
    : [];

  const handleClick = (item: CollectionData, description: string) => {
    if (
      activeCells.some((cell) => cell.id === item.name && cell.id !== 'Choose')
    ) {
      //console.log(`Ominaisuus ${item.name} on jo valittu.`);
      //console.log(`Ominaisuus ${item.name} on jo valittu.`);
    } else {
      dispatch(
        setActiveCells([
          ...activeCells.filter(
            (cell) =>
              cell.row !== selectedCell?.row || cell.col !== selectedCell.col
          ),
          {
            ...selectedCell,
            row: selectedCell?.row,
            col: selectedCell?.col,
            item: [{ name: item.name, desc: description, tips: item.tips }],
            id: item.name,
          } as Cell,
        ])
      );

      updateChoosableCells(9);
      dispatch(toggleModal(false));
    }
  };

  const handleEmptyCell = () => {
    if (selectedCell) {
      //console.log('selectedCell', selectedCell);
      //console.log('selectedCell', selectedCell);
      const cellIndex = activeCells.findIndex(
        (cell) => cell.row === selectedCell.row && cell.col === selectedCell.col
      );
      //console.log('cellIndex', cellIndex);
      //console.log('cellIndex', cellIndex);
      if (cellIndex !== -1) {
        const updatedActiveCells = [...activeCells];
        updatedActiveCells.splice(cellIndex, 1);
        dispatch(setActiveCells(updatedActiveCells));
        dispatch(setChoosableCells([...choosableCells, selectedCell]));
        dispatch(toggleModal(false));
      }
    }
  };

  return (
    <>
      {gridmodal && (
        <>
          <div className='modal-header'>
            <h1>Choose feature</h1>
            <button
              className='modal-toggle'
              onClick={() => dispatch(toggleModal(false))}
              type='button'
            >
              ⏎
            </button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            className='grid-modal'
          >
            {gridmodalData.map((item, id) => {
              const isActive = activeCells.some(
                (cell) => cell.id === item.name
              );
              const isEmpty = !activeCells.some(
                (cell) =>
                  cell.row === selectedCell?.row &&
                  cell.col === selectedCell.col
              );
              //console.log('id', id);
              return (
                <>
                  {id === 0 && !isEmpty && (
                    <button
                      className={`grid-modal-item-empty col-span-2`}
                      onClick={() => handleEmptyCell()}
                    >
                      <h1 className='font-bold'>Deselect current feature</h1>
                    </button>
                  )}
                  <button
                    tabIndex={isActive || isEmpty ? 0 : -1}
                    key={id}
                    className={`grid-modal-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleClick(item, item.desc)}
                    disabled={isActive}
                  >
                    <h1 className='font-bold'>{item.name}</h1>
                    <p className='text-xs md:text-base'>{item.desc}</p>
                  </button>
                </>
              );
            })}
          </motion.div>
        </>
      )}
    </>
  );
};

export default GridModal;
