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
<<<<<<< HEAD
    const data = await getFeatures();
    console.log(data.map((d) => d.name));
    console.log(data.map((d) => d.desc));

    return data.map((feature) => ({
      name: feature.name,
      desc: feature.desc,
      id: feature.id,
=======
    const response = await getFeatures();
    const data = response;
    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      desc: item.desc,
>>>>>>> 196cef290e87403aa47314efe9f79b76837912da
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
