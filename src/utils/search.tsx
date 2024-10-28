import React, { useState, useEffect } from 'react';
import { getData } from '@/utils/neo4j/neo4j';
import Loader from '@/components/loader';

import ExpandableItem from '@/components/buttons/ExpandField';

export interface SearchBarProps {
  name: string;
  desc: string;
  image: string;
  link: string;
}

const SearchBar = () => {
  const [data, setData] = useState<SearchBarProps[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Fetch all collections on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from multiple collections and combine them
      const frontendFrameworks = await getData('frontendFramework');
      const backendFrameworks = await getData('backendFramework');
      const databases = await getData('Database');
      const languages = await getData('Language');

      // Combine all data into a single array
      const combinedData = [
        ...frontendFrameworks,
        ...backendFrameworks,
        ...databases,
        ...languages,
      ];

      setData(combinedData as SearchBarProps[]);
    };

    fetchData();
  }, []); // Empty dependency array to run once on component mount

  // Filter data based on the search query
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Render loading screen if data is empty
  if (data.length === 0) {
    return <Loader />;
  }
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
      {filteredData.length > 0 ? (
        <ul className="mt-4">
          {filteredData.map((item, index) => (
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
