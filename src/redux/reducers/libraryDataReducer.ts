import { SearchBarProps } from '@/utils/search';
import { getData } from '@/utils/neo4j/neo4j';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

//defined the interface for the state
interface LibraryState {
  // Lista kokoelmatiedoista
  value: SearchBarProps[];
  // Tilan status
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  // Virheilmoitus
  error: string | null;
  checked: boolean;
}

// define the initial state
const initialLibraryState: LibraryState = {
  value: [],
  status: 'idle',
  error: null,
  checked: false,
};

// define the async thunk to fetch library data
export const fetchLibrary = createAsyncThunk(
  'library/fetchLibrary',
  async (_, { getState }) => {
    const state = getState() as RootState;
    if (state.libraryDataReducer.value.length > 0)
      return state.libraryDataReducer.value;
    const librarydata = await getData();
    return librarydata.map((libraryfeature) => ({
      name: libraryfeature.name,
      desc: libraryfeature.desc,
      id: libraryfeature.id,
      image: libraryfeature.image,
      link: libraryfeature.link,
      weights: libraryfeature.weights,
      checked: libraryfeature.checked || false,
    }));
  }
);

// create the librarydata slice
export const librarydata = createSlice({
  name: 'librarydata',
  initialState: initialLibraryState,
  reducers: {
    toggleCheckbox: (state, action: PayloadAction<string>) => {
      state.value = state.value.map((collection) => {
        if (collection.name === action.payload) {
          const updatedWeights = collection.weights.map((weightObj) => ({
            ...weightObj,
            weight: (collection as any).checked
              ? Math.round((weightObj.weight - 1) * 10) / 10
              : Math.round((weightObj.weight + 1) * 10) / 10,
          }));
          return {
            ...collection,
            checked: !(collection as any).checked,
            weights: updatedWeights,
          };
        }
        return collection;
      });
    },

    resetWeights: (state) => {
      state.value = state.value.map((collection) => ({
        ...collection,
        weights: collection.weights.map((weightObj) => ({
          ...weightObj,
          weight: collection.checked
            ? Math.round((weightObj.weight - 1) * 10) / 10
            : weightObj.weight,
        })),
        checked: false,
      }));
    },
  },

  // Määritellaan mitä tapahtuu kun fetchCollections -funktio on käynnissä
  extraReducers: (builder) => {
    builder
      .addCase(fetchLibrary.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLibrary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchLibrary.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message ?? null;
      });
  },
});

export const { resetWeights, toggleCheckbox } = librarydata.actions;

export default librarydata.reducer;
