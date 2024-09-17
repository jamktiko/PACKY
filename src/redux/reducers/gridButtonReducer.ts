import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ItemState {
  item: any[];
}

const initialState: ItemState = {
  item: [],
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    insert_item: (state, action: PayloadAction<any>) => {
      state.item.push(action.payload);
    },
  },
});

export const { insert_item } = itemSlice.actions;
export default itemSlice.reducer;
