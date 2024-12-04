import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TutorialState } from '@/utils/interface/tutorialState';

const initialState: TutorialState = {
  isOpen: false,
};

const tutorialSlice = createSlice({
  name: 'tutorial',
  initialState,
  reducers: {
    toggleTutorial: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { toggleTutorial } = tutorialSlice.actions;

export default tutorialSlice.reducer;
