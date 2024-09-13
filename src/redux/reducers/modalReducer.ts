import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';


/* 


pitää luoda reducerslicer joka hakee tiedon tietokannasta ja paivittaa stateen




*/

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
    extraReducers: (builder) => {
      builder.addCase(fetchData.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
      builder.addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true ;
      });
    }
    
  },
});

const fetchData = createAsyncThunk( 'fetch_data', async (const item = await fetch('')) => {
  
})

export const { toggleModal } = modalslice.actions;

export default modalslice.reducer;
