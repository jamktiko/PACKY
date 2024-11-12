import React, { useState, useEffect } from 'react';
import { AppDispatch, RootState } from '@/redux/store/store';
import { fetchLibrary } from '@/redux/reducers/libraryDataReducer';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import ExpandableItem from '@/components/buttons/ExpandField';
import Loader from '@/components/loader';
import { useFetchCollections } from '@/hooks/useFetchCollections';
import { Root } from 'postcss';

// Define the interface for the props that the SearchBar component will receive
export interface SearchBarProps {
  name: string;
  desc: string;
  image: string;
  link: string;
  weights: { weight: number }[];
  checked: boolean;
}

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useFetchCollections();

  // Get librarydata from Redux store
  const librarydata = useSelector(
    (state: RootState) => state.libraryDataReducer.value
  );

  // Fetch library data when component mounts
  useEffect(() => {
    dispatch(fetchLibrary());
  }, [dispatch]);

  // Filter data based on the search query
  const filteredlibraryData = librarydata.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  <Loader />;

  const [isLibraryVisible, setIsLibraryVisible] = useState(false);

  useEffect(() => {
    if (!isLibraryVisible) {
      setIsLibraryVisible(true);
    }
  }, [isLibraryVisible]);

  useEffect(() => {
    if (isLibraryVisible) {
      const gridButtonElement = document.getElementById('library');
      if (gridButtonElement) {
        const rect = gridButtonElement.getBoundingClientRect();
        window.scrollTo({
          top: Math.abs(0),
          left: Math.abs(0),
          behavior: 'smooth',
        });
      }
    }
  }, [isLibraryVisible]);

  return (
    <div>
      <h1 className='text-center text-2xl'>
        Optional: Choose familiar technologies
      </h1>
      {/* Search box to filter by name */}
      <input
        style={{ color: 'gray', backgroundColor: 'black' }}
        type='text'
        placeholder='Search for technologies'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='library-search'
      />
      {/* Display filtered data or loader */}
      {librarydata.length === 0 ? (
        <Loader />
      ) : (
        <motion.ul
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          className='mt-4'
          id='library'
        >
          {filteredlibraryData.map((item, index) => (
            <ExpandableItem key={index} item={item} />
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default SearchBar;
