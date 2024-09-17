import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//määritellään interface ModalState
interface ModalState {
  value: boolean;
}

//määritellään modalReducerin tila aluksi falseksi
const initialState: ModalState = {
  value: false,
};

//käyttää createSlicea luomaan kopion tilasta ja päivittämään sen storeen
const outputmodalslice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    //toggleModal on action, joka muuttaa modalReducerin tilan, ottaa kaksi argumenttia
    //ja muuttaa tilan arvoa
    toggleOutputModal: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

//exportoidaan action creator funktio
export const { toggleOutputModal } = outputmodalslice.actions;

//exportoidaan reducer funktio jotta sitä voidaan käyttäää muualla sovelluksessa
export default outputmodalslice.reducer;
