import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//kommentoi aamulla
interface Item {
  item: string[];
}

const initialState: Item = {
  item: [],
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<string>) {
      state.item.push(action.payload);
    },
  },
});

export const { addItem } = itemSlice.actions;
export default itemSlice.reducer;
