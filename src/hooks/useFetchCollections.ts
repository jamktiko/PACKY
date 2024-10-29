import { useEffect } from 'react';
import { fetchCollections } from '@/redux/reducers/dataReducer';
import { store } from '@/redux/store/store';

//custom hook to fetch collections
//very important to use
export const useFetchCollections = () => {
  useEffect(() => {
    const fetchCollectionsAsync = async () => {
      await store.dispatch(fetchCollections());
    };
    fetchCollectionsAsync();
  }, []);
};
