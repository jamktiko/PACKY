import { setChoosableCells } from '@/redux/reducers/gridStateReducer'; // Import action to update choosable cells in Redux state
import { store } from '@/redux/store/store'; // Import the Redux store to access the current state

// Function to update the choosable cells based on active cells
export const updateChoosableCells = (gridSize: number) => {
  // Get the current active cells from the Redux store
  const activeCells = store.getState().gridStateReducer.activeCells;
  // Initialize an array to store new choosable cells
  const newChoosableCells: { row: number; col: number }[] = [];
  // Initialize an array to store neighboring cells around active cells
  const neighbors: { row: number; col: number }[] = [];

  // Loop through each active cell and calculate its neighboring cells
  activeCells.forEach((cell: { row: any; col: any }) => {
    const row = cell.row;
    const col = cell.col;

    // Add neighboring cells in four directions: up, down, left, and right
    neighbors.push(
      { row: row - 1, col: col }, // Above the active cell
      { row: row + 1, col: col }, // Below the active cell
      { row: row, col: col - 1 }, // Left of the active cell
      { row: row, col: col + 1 } // Right of the active cell
    );
  });

  // Loop through each neighboring cell to check if it's a valid choosable cell
  neighbors.forEach(({ row: nRow, col: nCol }) => {
    // Ensure the neighbot is within the grid boundaries
    if (nRow >= 0 && nRow < gridSize && nCol >= 0 && nCol < gridSize) {
      // Check if the neighboring cell is already an active cell
      const isActive = activeCells.some(
        (cell: { row: number; col: number }) =>
          cell.row === nRow && cell.col === nCol
      );
      // If the neighboring cell is not active, mark it as choosable
      if (!isActive) {
        newChoosableCells.push({ row: nRow, col: nCol });
      }
    }
  });
  // Dispatch an action to update the Redux store with the new choosable cells
  store.dispatch(setChoosableCells(newChoosableCells));
};
