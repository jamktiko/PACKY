import { Cell } from './cell';

export interface GridState {
  activeCells: Cell[];
  choosableCells: Cell[];
  selectedCell: Cell | null; // Assuming only one cell can be selected at a time
}
