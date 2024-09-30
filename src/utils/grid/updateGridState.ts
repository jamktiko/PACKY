import { setChoosableCells } from "@/redux/reducers/gridStateReducer";
export const updateGridStates = (
  activeCells: { row: number; col: number }[],
  gridSize: number,
  setChoosableCells: (activeCells: { row: number; col: number }[], newChoosableCells: { row: number; col: number }[]) => void
) => {
  const newChoosableCells: { row: number; col: number }[] = [];

  activeCells.forEach(({ row, col }) => {
    const neighbors = [
      { row: row - 1, col: col },
      { row: row + 1, col: col },
      { row: row, col: col - 1 },
      { row: row, col: col + 1 },
    ];

    neighbors.forEach(({ row: nRow, col: nCol }) => {
      if (nRow >= 0 && nRow < gridSize && nCol >= 0 && nCol < gridSize) {
        const isActive = activeCells.some(
          (cell) => cell.row === nRow && cell.col === nCol
        );
        if (!isActive) {
          newChoosableCells.push({ row: nRow, col: nCol });
        }
      }
    });
    setChoosableCells(activeCells, newChoosableCells);
  });


};
