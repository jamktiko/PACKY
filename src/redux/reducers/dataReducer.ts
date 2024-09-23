import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CollectionData } from '@/utils/collectionData';
import { getAllCollections } from '@/utils/firebase/firebaseService';
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
export const fetchCollections = createAsyncThunk(
  'collections/fetchCollections',
  async () => {
    const response = await getFeatures();
    console.log(response);
    return response.map((item) => ({
      id: item.id,
      name: item.name,
      desc: item.desc,
      tags: item.tags,
      imageurl: item.imageurl,
      pros: item.pros,
      cons: item.cons,
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
