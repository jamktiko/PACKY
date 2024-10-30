import { SearchBarProps } from '@/utils/search';
import { getData } from '@/utils/neo4j/neo4j';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

//defined the interface for the state
interface LibraryState {
  // Lista kokoelmatiedoista
  value: SearchBarProps[];
  // Tilan status
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  // Virheilmoitus
  error: string | null;
}

// define the initial state
const initialLibraryState: LibraryState = {
  value: [],
  status: 'idle',
  error: null,
};

// define the async thunk to fetch library data
export const fetchLibrary = createAsyncThunk(
  'library/fetchLibrary',
  async () => {
    const librarydata = await getData();
    return librarydata.map((libraryfeature) => ({
      name: libraryfeature.name,
      desc: libraryfeature.desc,
      id: libraryfeature.id,
      image: libraryfeature.image,
      pros: libraryfeature.pros,
      cons: libraryfeature.cons,
      link: libraryfeature.link,
      weights: libraryfeature.weights,
    }));
  }
);

// create the librarydata slice
export const librarydata = createSlice({
  name: 'librarydata',
  initialState: initialLibraryState,
  reducers: {
    incrementLibraryWeight: (state, action: PayloadAction<string>) => {
      console.log(
        'incrementWeight action dispatched with payload:',
        action.payload
      );
      state.value = state.value.map((collection) => {
        if (collection.name === action.payload) {
          console.log('Incrementing weight for collection:', collection.name);

          // Käydään läpi kaikki weights-taulukon objektit ja lisätään jokaisen weight-arvoa
          const updatedWeights = collection.weights.map((weightObj) => ({
            ...weightObj,
            weight: weightObj.weight + 1, // Päivitä weight-arvoa yhdellä
          }));

          console.log('Updated weights:', updatedWeights);

          return {
            ...collection,
            weights: updatedWeights,
          };
        }
        return collection;
      });
      console.log('Updated state:', state);
    },

    decrementLibraryWeight: (state, action: PayloadAction<string>) => {
      console.log(
        'DecrementWeight action dispatched with payload:',
        action.payload
      );
      state.value = state.value.map((collection) => {
        if (collection.name === action.payload) {
          console.log('Decrementing weight for collection:', collection.name);

          // Käydään läpi kaikki weights-taulukon objektit ja lisätään jokaisen weight-arvoa
          const updatedWeights = collection.weights.map((weightObj) => ({
            ...weightObj,
            weight: weightObj.weight - 1, // Päivitä weight-arvoa yhdellä
          }));

          console.log('Updated weights:', updatedWeights);

          return {
            ...collection,
            weights: updatedWeights,
          };
        }
        return collection;
      });
      console.log('Updated state:', state);
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

export const { incrementLibraryWeight, decrementLibraryWeight } =
  librarydata.actions;

export default librarydata.reducer;
