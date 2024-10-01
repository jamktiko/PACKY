import { setActiveCells, setChoosableCells } from '@/redux/reducers/gridStateReducer';
import { useSelector } from 'react-redux';
import { store } from '@/redux/store/store';

let activeCells: { row: number; col: number }[] = [];

const unsubscribe = store.subscribe(() => {
  const newActiveCells = store.getState().gridStateReducer.activeCells;
  activeCells = newActiveCells;
});


const choosableCells = store.getState().gridStateReducer.choosableCells;

interface GridState {
  activeCells: { row: number; col: number }[];
  choosableCells: { row: number; col: number }[];
  selectedCell: { row: number; col: number }[];
}

export const updateChoosableCells = (
  gridSize: number,
) => {
  unsubscribe();
  const activeCells = store.getState().gridStateReducer.activeCells;
  const newChoosableCells: { row: number; col: number }[] = [];
  const neighbors: { row: number; col: number }[] = [];

  activeCells.forEach((cell: { row: any; col: any; }) => {
    const row = cell.row;
    const col = cell.col;

    neighbors.push(
      { row: row - 1, col: col },
      { row: row + 1, col: col },
      { row: row, col: col - 1 },
      { row: row, col: col + 1 }
    );
  });

  neighbors.forEach(({ row: nRow, col: nCol }) => {
    if (nRow >= 0 && nRow < gridSize && nCol >= 0 && nCol < gridSize) {
      const isActive = activeCells.some(
        (cell: { row: number; col: number; }) => cell.row === nRow && cell.col === nCol
      );
      if (!isActive) {
        newChoosableCells.push({ row: nRow, col: nCol });
      }
    }
  });

  store.dispatch(setChoosableCells(newChoosableCells));
  unsubscribe();
};

export const updateActiveCells = (newCell: { row: number; col: number }) => {
  unsubscribe();
  const updatedActiveCells = [...activeCells, newCell];
  console.log("updated cells on list are", updatedActiveCells);
  store.dispatch(setActiveCells(updatedActiveCells));
  updateChoosableCells(9);
  console.log("updated cells now are", activeCells);
  unsubscribe();
};

