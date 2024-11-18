import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cell } from '@/utils/interface/cell';
import { GridState } from '@/utils/interface/gridState';

const initialState: GridState = {
  activeCells: [
    {
      row: 4,
      col: 4,
      item: [{ name: 'Web App', desc: 'This is test', tips: 'test' }],
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

    resetGridState: (state) => {
      if (state.activeCells.length > 1) {
        return initialState;
      } else {
        console.log('Nothing to reset');
      }
    },
  },
});

export const {
  setActiveCells,
  setChoosableCells,
  setSelectedCell,
  resetGridState,
} = gridStateSlice.actions;
export default gridStateSlice.reducer;
