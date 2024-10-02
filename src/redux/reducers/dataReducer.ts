import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CollectionData } from '@/utils/collectionData';
import { getFeatures } from '@/utils/neo4j/neo4j';
// Määritellään data reducerin tila
interface DataState {
  // Lista kokoelmatiedoista
  value: CollectionData[];
  // Tilan status
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  // Virheilmoitus
  error: string | null;
}

// Määritellään data reducerin alkutila
const initialState: DataState = {
  value: [],
  status: 'idle',
  error: null,
};

// Luodaan async thunk -funktio kokoelmatietojen hakemiseen
//käytetään getFeatures() funktiota hakemaan data --> myöhemmin api
export const fetchCollections = createAsyncThunk(
  'collections/fetchCollections',
  async () => {
    const data = await getFeatures();
    return data.map((feature) => ({
      name: feature.name,
      desc: feature.desc,
      id: feature.id,
    }));
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  // Määritellään mitä tapahtuu kun fetchCollections -funktio on käynnissä
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message ?? null;
      });
  },
});

export default dataSlice.reducer;
