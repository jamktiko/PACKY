import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//interface Item is created
interface Item {
  item: { name: string; tags: string[] }[];
}

//initialState is created and given Item as a type
const initialState: Item = {
  item: [],
};

//Slice created from initialState and reducer function addItem created
//addItem adds item into the item array
const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ name: string; tags: string[] }>) {
      state.item.push({ name: action.payload.name, tags: action.payload.tags });
    },
  },
});

export const { addItem } = itemSlice.actions;
export default itemSlice.reducer;
