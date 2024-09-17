import React, { useState, useEffect } from 'react';
import { Triangle } from 'react-loader-spinner';
import { CollectionData } from '@/utils/collectionData';
import { getAllCollections } from '@/utils/firebase/firebaseService';
/**
 * THIS COMPONENT IS GOING TO BE USED FOR THE LIBRARY PAGE
 */

const List = () => {
  const options = [
    { value: 'frontendFrameworks', label: 'Frontend Frameworks' },
    { value: 'backendFrameworks', label: 'Backend Frameworks' },
    { value: 'mobileFrameworks', label: 'Mobile Frameworks' },
    { value: 'databases', label: 'Databases' },
    { value: 'cloudservices', label: 'Cloudservices' },
    { value: 'languages', label: 'Languages' },
  ];
  // Initialize state with default values and empty array
  const [collectionName, setCollectionName] = useState('frontendFrameworks'); // Default view is frontend frameworks
  const [data, setData] = useState<CollectionData[]>([]); // Data fetched from Firebase
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCollections(collectionName); // Fetch data from Firebase
      setData(data); // Updating the state with fetched data
      setTimeout(() => {
        setIsLoading(false); // Set loading state to false after one second
      }, 1000);
    };
    fetchData(); // Fetch data when component mounts or collectionName changes
  }, [collectionName]);

  const handleCollectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCollectionName(event.target.value); // Updated the collections name
    setIsLoading(true); // set loading state to true
  };
  return (
    <>
      {/* Select input to choose collection */}
      <select
        value={collectionName}
        onChange={handleCollectionChange}
        className=" text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* Loading spinner */}
      {isLoading ? (
        <div className="mt-4 text-center">
          <p className="font-bold">Loading the library...</p>
          <Triangle
            visible={true}
            height="100"
            width="100"
            color="#38B2AC"
            ariaLabel="triangle-loading"
            wrapperStyle={{
              width: '100%',
              position: 'flex',
              justifyContent: 'center',
            }}
            wrapperClass=""
          />
        </div>
      ) : (
        // Render data in a list
        <div className="content">
          {data.map((item) => (
            <div key={item.id}>
              <h1>{item.name}</h1>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default List;
