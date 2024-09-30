import {store} from '@/redux/store/store';
import { setChoosableCells } from '@/redux/reducers/gridStateReducer';

const activeCells = store.getState().gridStateReducer.activeCells;


export const updateGridStates = (
  gridSize: number,
) => {
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
  console.log("neighbors", neighbors);
  setChoosableCells({ activeCells, choosableCells: newChoosableCells });
};