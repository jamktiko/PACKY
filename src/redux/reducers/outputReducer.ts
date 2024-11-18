import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OutputModalState } from '@/utils/interface/outputModalState';

//määritellään modalReducerin tila aluksi falseksi
const initialState: OutputModalState = {
  value: false,
};

//käyttää createSlicea luomaan kopion tilasta ja päivittämään sen storeen
const outputmodalslice = createSlice({
  name: 'outputmodal',
  initialState,
  reducers: {
    //toggleModal on action, joka muuttaa modalReducerin tilan, ottaa kaksi argumenttia
    //ja muuttaa tilan arvoa
    toggleOutputModal: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
      //console.log('state', state.value);
    },
  },
});

//exportoidaan action creator funktio
export const { toggleOutputModal } = outputmodalslice.actions;

//exportoidaan reducer funktio jotta sitä voidaan käyttäää muualla sovelluksessa
export default outputmodalslice.reducer;
