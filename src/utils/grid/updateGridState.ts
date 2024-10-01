import { store } from '@/redux/store/store';
import {
  setActiveCells,
  setChoosableCells,
} from '@/redux/reducers/gridStateReducer';

export const updateChoosableCells = (gridSize: number) => {
  const activeCells = store.getState().gridStateReducer.activeCells;
  const choosableCells = store.getState().gridStateReducer.choosableCells;
  const newChoosableCells: { row: number; col: number }[] = [];
  const neighbors: { row: number; col: number }[] = [];

  activeCells.forEach((cell: { row: any; col: any }) => {
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
        (cell: { row: number; col: number }) =>
          cell.row === nRow && cell.col === nCol
      );
      if (!isActive) {
        newChoosableCells.push({ row: nRow, col: nCol });
      }
    }
  });

  store.dispatch(
    setChoosableCells({ activeCells, choosableCells: newChoosableCells })
  );
};

// Function to update active cells
export const updateActiveCells = (newCell: { row: number; col: number }) => {
  const state = store.getState();
  const activeCells = [...state.gridStateReducer.activeCells, newCell];

  store.dispatch(
    setActiveCells({
      activeCells,
      choosableCells: state.gridStateReducer.choosableCells,
    })
  );
};
