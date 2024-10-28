import { SearchBarProps } from '@/utils/search';
import { getData } from '@/utils/neo4j/neo4j';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
    }));
  }
);

// create the librarydata slice
export const librarydata = createSlice({
  name: 'librarydata',
  initialState: initialLibraryState,
  reducers: {},
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

export default librarydata.reducer;
