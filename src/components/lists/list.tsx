import React, { useState, useEffect } from 'react';
import { getAllCollections } from '@/utils/firebase/firebaseService';

// Typing for the collectionData object
type CollectionData = {
  id: string;
  name: string;
  info: string;
  tags: string[];
};

/**
 * THIS FILE IS GOING TO BE USED FOR THE LIBRARY PAGE AND IT WILL BE DIFFERENT THIS IS JUST THE DEMO
 */

const List = () => {
  // Using the useState hook to create a state variable for the selected collection
  // and a function to update the state variable
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  // Defining an array of collection names
  const collections = ['frameworks', 'databases'];
  // Using the useState hook to create a state variable for the collection data
  // and a function to update the state variable
  const [data, setData] = useState<CollectionData[]>([]);

  // useEffect hook runs when the selectedCollection state variable changes
  useEffect(() => {
    // async function to fetch the data from the selected collection
    const fetchData = async () => {
      // calling getAllConncetions function from firebaseService.ts
      const collections = await getAllCollections(selectedCollection);
      // setting the data state variable to the fetched data
      setData(collections as CollectionData[]);
    };
    fetchData();
  }, [selectedCollection]);

  return (
    <>
      <select
        value={selectedCollection}
        onChange={(e) => setSelectedCollection(e.target.value)}
        className="bg-slate-700 text-teal-500 border-teal-800 rounded-lg p-2"
      >
        {collections.map((collection) => (
          <option key={collection} value={collection}>
            {collection}
          </option>
        ))}
      </select>
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <div key={item.id} className="mt-4">
            <h2 className="text-xl font-bold">{item.name}</h2>
            <p>{item.tags[0]}</p>
            <p className="text-teal-500 bg-teal100">{item.info}</p>
          </div>
        ))}
    </>
  );
};

export default List;
