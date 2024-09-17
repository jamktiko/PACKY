import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//määritellään interface ModalState
interface GridModalState {
  value: boolean;

  data: any[];
}

//määritellään modalReducerin tila aluksi falseksi
const initialState: GridModalState = {
  value: false,
  data: [],
};

//käyttää createSlicea luomaan kopion tilasta ja päivittämään sen storeen
const gridmodalslice = createSlice({
  name: 'gridmodal',
  initialState,
  reducers: {
    //toggleModal on action, joka muuttaa modalReducerin tilan, ottaa kaksi argumenttia
    //ja muuttaa tilan arvoa
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

//exportoidaan action creator funktio
export const { toggleModal } = gridmodalslice.actions;

//exportoidaan reducer funktio jotta sitä voidaan käyttäää muualla sovelluksessa
export default gridmodalslice.reducer;
