import { CollectionData } from '@/utils/interface/collectionData';
// Määritellään data reducerin tila
export interface DataState {
  // Lista kokoelmatiedoista
  value: CollectionData[];
  // Tilan status
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  // Virheilmoitus
  error: string | null;
}
