import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//reducers are functions that update the state based on actions

interface ModalState {
  value: boolean;
}

const initialState: ModalState = {
  value: false,
};

const modalslice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { toggleModal } = modalslice.actions;

export default modalslice.reducer;
