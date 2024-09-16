import React, { useState, useEffect } from 'react';
import { Triangle } from 'react-loader-spinner';
import { CollectionData } from '@/utils/collectionData';
import { getAllCollections } from '@/utils/firebase/firebaseService';
/**
 * THIS FILE IS GOING TO BE USED FOR THE LIBRARY PAGE AND IT WILL BE DIFFERENT THIS IS JUST THE DEMO
 */

const List = () => {
  const [collectionName, setCollectionName] = useState('frontendFrameworks');
  const [data, setData] = useState<CollectionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCollections(collectionName);
      setData(data);
    };
    fetchData();
  }, [collectionName]);

  const handleCollectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCollectionName(event.target.value);
  };
  return (
    <>
      <select
        value={collectionName}
        onChange={handleCollectionChange}
        className="py-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
      >
        <option value="frontendFrameworks">Frontend Frameworks</option>
        <option value="backendFrameworks">Backend Frameworks</option>
        <option value="mobileFrameworks">Mobile Frameworks</option>
        <option value="databases">Databases</option>
      </select>
      <div className="content">
        {data.map((item) => (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      {/* <div className="mt-4 text-center">
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
      </div> */}
    </>
  );
};

export default List;
