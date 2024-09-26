import { useEffect } from 'react';
import { fetchCollections } from '@/redux/reducers/dataReducer';
import { store } from '@/redux/store/store';

//custom hook to fetch collections
export const useFetchCollections = () => {
  useEffect(() => {
    store.dispatch(fetchCollections());
  }, []);
};
