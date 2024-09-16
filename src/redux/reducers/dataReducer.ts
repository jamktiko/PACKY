import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CollectionData } from '@/utils/collectionData';
import { getAllCollections } from '@/utils/firebase/firebaseService';

interface DataState {
  value: CollectionData[];
}

const initialState: DataState = {
  value: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const data = await getAllCollections('features');
  return data;
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
