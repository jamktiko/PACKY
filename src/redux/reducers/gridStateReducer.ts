import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GridState {
  activeCells: { row: number; col: number }[];
  choosableCells: { row: number; col: number }[];
}

const initialState: GridState = {
  activeCells: [{ row: 4, col: 4 },
  ],
  choosableCells: [],
};

const gridStateSlice = createSlice({
  name: 'gridstate',
  initialState,
  reducers: {
    setActiveCells: (state, action: PayloadAction<GridState>) => {
      state.activeCells = action.payload.activeCells;
    },
setChoosableCells: (state, action: PayloadAction<GridState>) => {
  state.choosableCells = action.payload.choosableCells;
}
  },
});

export const { setActiveCells, setChoosableCells } = gridStateSlice.actions;
export default gridStateSlice.reducer;
