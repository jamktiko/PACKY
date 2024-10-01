import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Cell {
  row: number;
  col: number;
}

interface GridState {
  activeCells: Cell[];
  choosableCells: Cell[];
  selectedCell: Cell | undefined;  // Assuming only one cell can be selected at a time
}

const initialState: GridState = {
  activeCells: [{ row: 4, col: 4 }],
  choosableCells: [],
  selectedCell: undefined,
};

const gridStateSlice = createSlice({
  name: 'gridstate',
  initialState,
  reducers: {
    setActiveCells: (state, action: PayloadAction<Cell[]>) => {
      console.log("setActiveCells is pressed, payload is", action.payload);
      console.log("activeCells before are", state.activeCells);
      state.activeCells = action.payload;
      console.log("activeCells after are", state.activeCells);
    },
    setChoosableCells: (state, action: PayloadAction<Cell[]>) => {
      state.choosableCells = action.payload;
    },
    setSelectedCell: (state, action: PayloadAction<Cell>) => {
      state.selectedCell = action.payload;
    },
  },
});

export const { setActiveCells, setChoosableCells, setSelectedCell } = gridStateSlice.actions;
export default gridStateSlice.reducer;
