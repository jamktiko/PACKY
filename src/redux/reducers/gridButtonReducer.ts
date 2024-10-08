import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//interface Item is created
//item is the data that is meant for buttons
//wholeItem is the data that is meant for outputModal/list
interface Item {
  outPutItem: { name: string; description: string }[];
}

//initialState is created and given Item as a type
const initialState: Item = {
  outPutItem: [],
};

//Slice created from initialState and reducer function addItem created
//addItem adds item into the item array
const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addItem(
      state,
      action: PayloadAction<{
        name: string;

        description: string;
      }>
    ) {
      //buttons

      //outputmodal
      state.outPutItem.push({
        name: action.payload.name,
        description: action.payload.description,
      });
    },
  },
});

export const { addItem } = itemSlice.actions;
export default itemSlice.reducer;
