import React, { useState, useEffect } from 'react';
import { getAllCollections } from '@/utils/firebase/firebaseService';

type CollectionData = {
  id: string;
  name: string;
  info: string;
};

const List = () => {
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const collections = ['app type', 'frameworks', 'databases'];
  const [data, setData] = useState<CollectionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const collections = await getAllCollections(selectedCollection);
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
        <option value=""></option>
        {collections.map((collection) => (
          <option key={collection} value={collection}>
            {collection}
          </option>
        ))}
      </select>
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.info}</p>
          </div>
        ))}
    </>
  );
};

export default List;
