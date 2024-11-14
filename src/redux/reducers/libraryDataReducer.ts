import { getData } from '@/utils/neo4j/neo4j';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { LibraryState } from '@/utils/interface/libraryState';
import { Weight } from '@/utils/interface/weight';
import { LibraryFeature } from '@/utils/interface/libraryFeature';
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
  async (): Promise<LibraryFeature[]> => {
    const librarydata = await getData();
    return librarydata.map(
      (libraryfeature: any): LibraryFeature => ({
        name: libraryfeature.name,
        desc: libraryfeature.desc,
        id: libraryfeature.id,
        image: libraryfeature.image,
        link: libraryfeature.link,
        weights: libraryfeature.weights.map(
          (weightObj: any): Weight => ({
            weight: Number(weightObj.weight),
            feature: weightObj.feature,
          })
        ),
        checked: libraryfeature.checked,
      })
    );
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
