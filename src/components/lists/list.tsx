import React, { useState, useEffect } from 'react';
import { Triangle } from 'react-loader-spinner';
import { getData } from '@/utils/neo4j/neo4j';
import Image from 'next/image';

interface FeatureTechnology {
  name: string;
  desc: string;
  image: string; // Lisätty image-ominaisuus
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
              {option.label}
            </option>
          ))}
        </select>

        {data ? (
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong>
                <p>{item.desc}</p>

                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                  />
                )}
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
