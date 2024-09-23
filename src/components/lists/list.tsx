import React, { useState, useEffect } from 'react';
import { Triangle } from 'react-loader-spinner';
import { CollectionData } from '@/utils/collectionData';
import { getAllCollections } from '@/utils/firebase/firebaseService';
import { getData } from '@/utils/neo4j/neo4j';
/**
 * THIS COMPONENT IS GOING TO BE USED FOR THE LIBRARY PAGE
 */
interface FeatureTechnology {
  name: string;
}
const List = () => {
  const [data, setData] = useState<FeatureTechnology[]>([]);
  const [collectionName, setCollectionName] = useState('frontendFrameworks');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(collectionName);
      console.log(data);
      setData(data as FeatureTechnology[]);
    };
    fetchData();
  }, [collectionName]);
  const options = [
    { value: 'frontendFramework', label: 'Frontend Frameworks' },
    { value: 'backendFramework', label: 'Backend Frameworks' },
    { value: 'Feature', label: 'Features' },
    { value: 'Language', label: 'Languages' },
  ];
  // // Initialize state with default values and empty array
  // const [collectionName, setCollectionName] = useState('frontendFrameworks'); // Default view is frontend frameworks
  // const [data, setData] = useState<CollectionData[]>([]); // Data fetched from Firebase
  // const [isLoading, setIsLoading] = useState(true); // Loading state

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getAllCollections(collectionName); // Fetch data from Firebase
  //     setData(data); // Updating the state with fetched data
  //     setTimeout(() => {
  //       setIsLoading(false); // Set loading state to false after one second
  //     }, 1000);
  //   };
  //   fetchData(); // Fetch data when component mounts or collectionName changes
  // }, [collectionName]);

  // const handleCollectionChange = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setCollectionName(event.target.value); // Updated the collections name
  //   setIsLoading(true); // set loading state to true
  // };
  const handleCollectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCollectionName(event.target.value);
  };
  return (
    <>
      <div>
        <h1>Features and Technologies</h1>
        <select value={collectionName} onChange={handleCollectionChange}>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}{' '}
            </option>
          ))}
        </select>
        {data ? (
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <Triangle />
        )}
      </div>
    </>
  );
};

export default List;
