import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    // const tech = data.map((feature) => feature.techRelations);
    // console.log(tech);
    // tech.map((a) => {
    //   a.map((b: any) => console.log(b.technology));
    // });
    return data.map((feature) => ({
      name: feature.name,
      desc: feature.desc,
      id: feature.id,
      weight: feature.techRelations,
    }));
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    incrementWeight: (state, action: PayloadAction<string>) => {
      console.log(
        'incrementWeight action dispatched with payload:',
        action.payload
      );
      state.value = state.value.map((collection) => {
        if (collection.name === action.payload) {
          console.log('incrementing weight for collection:', collection.name);
          const newWeight = collection.weight + 1;
          console.log('new weight:', newWeight);
          return {
            ...collection,
            weight: newWeight,
          };
        }
        return collection;
      });
      console.log('updated state:', state);
    },

    decrementWeight: (state, action: PayloadAction<string>) => {
      console.log(
        'DecrementWeight action dispatched with payload:',
        action.payload
      );
      state.value = state.value.map((collection) => {
        if (collection.name === action.payload) {
          console.log('Decrementing weight for collection:', collection.name);
          const newWeight = collection.weight - 1;
          console.log('new weight:', newWeight);
          return {
            ...collection,
            weight: newWeight,
          };
        }
        return collection;
      });
      console.log('updated state:', state);
    },
  },
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

export const { incrementWeight, decrementWeight } = dataSlice.actions;

export default dataSlice.reducer;
