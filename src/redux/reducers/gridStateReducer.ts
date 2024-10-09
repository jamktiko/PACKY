import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Cell {
  row: number;
  col: number;
  item: { name: string; desc: string }[];
  id?: string;
}

interface GridState {
  activeCells: Cell[];
  choosableCells: Cell[];
  selectedCell: Cell | null; // Assuming only one cell can be selected at a time
}

const initialState: GridState = {
  activeCells: [
    {
      row: 4,
      col: 4,
      item: [{ name: 'Web App', desc: 'This is test' }],
      id: 'Web App',
    },
  ],
  choosableCells: [],
  selectedCell: null,
};

const gridStateSlice = createSlice({
  name: 'gridstate',
  initialState,
  reducers: {
    setActiveCells: (state, action: PayloadAction<Cell[]>) => {
      state.activeCells = action.payload;
    },
    setChoosableCells: (state, action: PayloadAction<Cell[]>) => {
      state.choosableCells = action.payload;
    },
    setSelectedCell: (state, action: PayloadAction<Cell>) => {
      state.selectedCell = action.payload;
      console.log('selected cell on nyt:', state.selectedCell);
    },
  },
});

export const { setActiveCells, setChoosableCells, setSelectedCell } =
  gridStateSlice.actions;
export default gridStateSlice.reducer;
