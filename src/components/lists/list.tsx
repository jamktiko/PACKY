import React, { useState, useEffect } from 'react';
import { Triangle } from 'react-loader-spinner';
import { getData } from '@/utils/neo4j/neo4j';
import Image from 'next/image';
import Link from 'next/link';

interface FeatureTechnology {
  name: string;
  desc: string;
  image: string;
  link: string;
}

const List = () => {
  const [data, setData] = useState<FeatureTechnology[]>([]);
  const [collectionName, setCollectionName] = useState('frontendFramework');

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
        <select
          value={collectionName}
          onChange={handleCollectionChange}
          className=" p-2 rounded-2xl bg-opacity-20 bg-white hover:bg-opacity-50 transition-all"
        >
          {options.map((option) => (
            <option
              value={option.value}
              key={option.value}
              className="text-black"
            >
              {option.label}
            </option>
          ))}
        </select>

        {data ? (
          <ul className="grid grid-cols-3">
            {data.map((item, index) => (
              <li
                className="m-2 p-2 flex flex-col bg-white w-96 h-72 bg-opacity-10 rounded-2xl"
                key={index}
              >
                <div className="flex flex-row">
                  {item.image && (
                    <Image
                      className="h-16 w-16"
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                    />
                  )}
                  <strong className="text-lg border-b bg-white bg-opacity-10 rounded-2xl w-full self-center content-center pl-4 h-full">
                    <Link href={item.link} target="_blank">
                      {' '}
                      {item.name}
                    </Link>
                  </strong>
                </div>
                <p className="border rounded-2xl p-1 my-2 h-full">
                  {item.desc}
                </p>
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
