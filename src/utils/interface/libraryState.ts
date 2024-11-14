import { SearchBarProps } from './searchBarData';
//defined the interface for the state
export interface LibraryState {
  // Lista kokoelmatiedoista
  value: SearchBarProps[];
  // Tilan status
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  // Virheilmoitus
  error: string | null;
  checked: boolean;
}
