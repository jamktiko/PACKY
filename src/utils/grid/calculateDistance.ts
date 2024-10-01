export const calculateDistance = (
  cellA: { row: number; col: number } | undefined,
  cellB: { row: number; col: number } | undefined
): number => {
  if (!cellA || !cellB) {
    console.error('Invalid cells provided:', { cellA, cellB });
    return NaN; // or any other fallback value
  }

  return Math.abs(cellA.row - cellB.row) + Math.abs(cellA.col - cellB.col);
};
