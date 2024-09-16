import React, { useState, useEffect } from 'react';
import { Triangle } from 'react-loader-spinner';
import { CollectionData } from '@/utils/collectionData';
import { getAllCollections } from '@/utils/firebase/firebaseService';
/**
 * Placeholder for now. Change if you want to,
 * i think the library page is good base for it
 * if not, feel free to delete all the code
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
        <option value="cloudservices">Cloudservices</option>
        <option value="apis">Apis</option>
        <option value="features">Features</option>
        <option value="languages">Languages</option>
        <option value="libraries">Libraries</option>
        <option value="other_tools">Other toolss</option>
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
