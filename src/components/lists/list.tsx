import { getDatabases, getFrameworks } from '@/utils/firebase/firebaseService';
import React, { useState, useEffect } from 'react';
import { Triangle } from 'react-loader-spinner';
import { CollectionData } from '@/utils/collectionData';
/**
 * THIS FILE IS GOING TO BE USED FOR THE LIBRARY PAGE AND IT WILL BE DIFFERENT THIS IS JUST THE DEMO
 */

const List = () => {
  // Declare two pieces of state using the useState hook
  // 'frameworks' will store the data for frameworks, and 'setframeworks' will be used to update it
  // 'database' will store the data for databases, and 'setDatabase' will be used to update it
  const [frameworks, setframeworks] = useState<CollectionData[]>([]);
  const [database, setDatabase] = useState<CollectionData[]>([]);

  //  useEffect hook to run code when the component mounts
  // The empty dependency array `[]` ensures this effect runs only once after the component mounts
  useEffect(() => {
    //  Define an async function 'fetchData' to fetch both frameworks and databases data
    const fetchData = async () => {
      try {
        //  Using 'Promise.all' to fetch both frameworks and databases simultaneously
        // 'getFrameworks' and 'getDatabases' are assumed to be functions that fetch the data from Firebase
        const [frameworks, databases] = await Promise.all([
          getFrameworks('frameworks'),
          getDatabases('databases'),
        ]);
        //  Update the state with the fetched data
        setframeworks(frameworks as CollectionData[]);
        setDatabase(databases as CollectionData[]);
      } catch (error) {
        console.error(error);
      }
    };
    //  Invoke the fetchData function to trigger the data fetching
    fetchData();
  }, []);
  return (
    <div className='content'>
      {frameworks &&
        frameworks.length > 0 &&
        frameworks.map((item) => (
          <div key={item.id} className='data-item'>
            <h2 className='data-header'>{item.name}</h2>
            <p className='data-tags'>{item.tags[0]}</p>
            <p className='data-description'>{item.info}</p>
          </div>
        ))}
      <hr></hr>
      {database &&
        database.length > 0 &&
        database.map((item) => (
          <div key={item.id} className='data-item'>
            <h2 className='text-xl font-bold'>{item.name}</h2>
            <p>{item.tags[0]}</p>
            <p className='text-teal-500 bg-teal100'>{item.info}</p>
          </div>
        ))}{' '}
      (
      <div className='mt-4 text-center'>
        <p className='font-bold'>Loading the library...</p>
        <Triangle
          visible={true}
          height='100'
          width='100'
          color='#38B2AC'
          ariaLabel='triangle-loading'
          wrapperStyle={{
            width: '100%',
            position: 'flex',
            justifyContent: 'center',
          }}
          wrapperClass=''
        />
      </div>
      )
    </div>
  );
};

export default List;
