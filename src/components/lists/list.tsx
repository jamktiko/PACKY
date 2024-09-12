import React, { useState, useEffect } from 'react';
import { getDatabases, getFrameworks } from '@/utils/firebase/firebaseService';

// Typing for the collectionframeworks object
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

  // Defining an array of collection names

  // Using the useState hook to create a state variable for the collection frameworks
  // and a function to update the state variable
  const [frameworks, setframeworks] = useState<CollectionData[]>([]);
  const [database, setDatabase] = useState<CollectionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [frameworks, databases] = await Promise.all([
          getFrameworks('frameworks'),
          getDatabases('databases'),
        ]);
        setframeworks(frameworks as CollectionData[]);
        setDatabase(databases as CollectionData[]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {frameworks &&
        frameworks.length > 0 &&
        frameworks.map((item) => (
          <div key={item.id} className="mt-4">
            <h2 className="text-xl font-bold">{item.name}</h2>
            <p>{item.tags[0]}</p>
            <p className="text-teal-500 bg-teal100">{item.info}</p>
          </div>
        ))}
      <hr></hr>
      {database &&
        database.length > 0 &&
        database.map((item) => (
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
