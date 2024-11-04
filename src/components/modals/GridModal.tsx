import React from 'react';
import { toggleModal } from '@/redux/reducers/gridModalReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, type RootState } from '@/redux/store/store';
import { CollectionData } from '@/utils/collectionData';
import { setActiveCells } from '@/redux/reducers/gridStateReducer';
import { updateChoosableCells } from '@/utils/grid/updateGridState';
import { motion } from 'framer-motion';

interface Cell {
  row: number;
  col: number;
  item: { name: string; desc: string }[];
}

const GridModal = () => {
  const activeCells = useSelector(
    (state: RootState) => state.gridStateReducer.activeCells
  );
  const selectedCell = useSelector(
    (state: RootState) => state.gridStateReducer.selectedCell
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
    if (activeCells.some((cell) => cell.id === item.name)) {
      console.log(`Ominaisuus ${item.name} on jo valittu.`);
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
            item: [{ name: item.name, desc: description }],
            id: item.name,
          } as Cell,
        ])
      );

      updateChoosableCells(9);
      dispatch(toggleModal(false));
    }
  };

  return (
    <>
      {gridmodal && (
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid-modal"
        >
          <button
            className="grid-modal-item"
            onClick={() =>
              handleClick(
                {
                  name: 'Choose',
                  desc: '',
                  weight: 0,
                },
                ''
              )
            }
          >
            <h1 className="font-bold">Empty Cell</h1>
          </button>
          {gridmodalData.map((item, id) => {
            const isActive = activeCells.some((cell) => cell.id === item.name);
            return (
              <button
                key={id}
                className={`grid-modal-item ${isActive ? 'active' : ''}`}
                onClick={() => handleClick(item, item.desc)}
                disabled={isActive}
              >
                <h1 className="font-bold">{item.name}</h1>
                <p>{item.desc}</p>
              </button>
            );
          })}
          <div className="modal-header">
            <h1>Choose feature</h1>
            <button
              className="modal-toggle"
              onClick={() => dispatch(toggleModal(false))}
              type="button"
            >
              ⏎
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default GridModal;
