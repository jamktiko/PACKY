import React, { useState, useEffect } from 'react';

import { AppDispatch, RootState } from '@/redux/store/store';
import { fetchLibrary } from '@/redux/reducers/libraryDataReducer';
import { useSelector, useDispatch } from 'react-redux';

import ExpandableItem from '@/components/buttons/ExpandField';

// Define the interface for the props that the SearchBar component will receive
export interface SearchBarProps {
  name: string;
  desc: string;
  image: string;
  link: string;
}

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

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

  return (
    <div>
      <h1 className="text-center text-2xl">
        Optional: Choose familiar technologies
      </h1>
      {/* Search box to filter by name */}
      <input
        style={{ color: 'white', backgroundColor: 'black' }}
        type="text"
        placeholder="Search for technologies"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mt-4 p-2 w-full rounded-2xl border border-gray-300 focus:outline-none"
      />
      {/* Display filtered data */}
      {filteredlibraryData.length > 0 ? (
        <ul className="mt-4">
          {filteredlibraryData.map((item, index) => (
            <ExpandableItem key={index} item={item} />
          ))}
        </ul>
      ) : (
        <p className="mt-4">No data available</p>
      )}
    </div>
  );
};

export default SearchBar;
