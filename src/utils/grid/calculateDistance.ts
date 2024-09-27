export const calculateDistance = (
  cellA: { row: number; col: number },
  cellB: { row: number; col: number }
): number => {
  return Math.abs(cellA.row - cellB.row) + Math.abs(cellA.col - cellB.col);
};
