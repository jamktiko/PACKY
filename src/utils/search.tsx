import React, { useState, useEffect } from 'react';
import { getData } from '@/utils/neo4j/neo4j';
import Image from 'next/image'; // Import Image component from Next.js

interface SearchBarProps {
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

  return (
    <>
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
              <li key={index} className="m-2 p-2 border-b border-gray-300">
                {/* Display image using Next.js Image component */}
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={40} // You can adjust the width and height
                    height={30} // depending on how you want to size your images
                    className="rounded-lg mb-4"
                    objectFit="cover" // Ensures the image fits nicely within the given dimensions
                  />
                )}
                <strong>{item.name}</strong>
                <p>{item.desc}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4">No data available</p>
        )}
      </div>
    </>
  );
};

export default SearchBar;
