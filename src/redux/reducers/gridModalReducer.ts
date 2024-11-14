import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GridModalState } from '@/utils/interface/gridModalState';

//initialState is created and typed with interface GridModalState
const initialState: GridModalState = {
  value: false,
};

//gridmodalslice is created to create copy of the state and update it to store
const gridmodalslice = createSlice({
  name: 'gridmodal',
  initialState,
  reducers: {
    //toggleModal is an reducer function and it updates the state
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

//toggleModal is an action creator function which is exported
export const { toggleModal } = gridmodalslice.actions;

//reducer function is exported
export default gridmodalslice.reducer;
