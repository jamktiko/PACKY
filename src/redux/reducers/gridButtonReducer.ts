import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//importoidaan redux toolkitista createSlice ja PayloadAction

//luodaan interface Item
interface Item {
  item: { name: string; tags: string[] }[];
}

//luodaan tila joka saa tyypikseen interfacen item
const initialState: Item = {
  item: [],
};

//luodaan Slice initialStatesta ja reducer funktio addItem päivittää tilaa
//lisäten uuden itemin taulukkoon
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
