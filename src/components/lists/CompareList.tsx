import React, { useState, useEffect } from 'react';
import { getData } from '@/utils/neo4j/neo4j'; // Importing a utility function to fetch data from Neo4j database
/**
 * THIS COMPONENT IS GOING TO BE USED FOR THE COMPARE PAGE
 */
interface FeatureTechnology {
  name: string;
}
const CompareList = () => {
  const [data, setData] = useState<FeatureTechnology[]>([]);
  const [collectionName, setCollectionName] = useState('frontendFrameworks');
  const [selectedOne, setSelectedOne] = useState(''); // First technology to compare
  const [selectedTwo, setSelectedTwo] = useState(''); // Second technology to compare

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
    setSelectedOne(''); // Reset the selected technology when the collection changes
    setSelectedTwo(''); // Reset the selected technology when the collection changes
  };
  // Handle changes for the two technologies being compared
  const handleTechChangeOne = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOne(event.target.value);
  };

  const handleTechChangeTwo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTwo(event.target.value);
  };
  return (
    <>
      <div>
        <h1>Compare Technologies</h1>
        {/* Select Category frontend, backend, features or languages */}
        <select
          value={collectionName}
          onChange={handleCollectionChange}
          style={{
            backgroundColor: '#333',
            border: '1px solid #ccc',
            padding: '5px',
            marginBottom: '20px',
          }}
        >
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Select the first technology to compare for example Angular vs React*/}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '20px',
          }}
        >
          <div style={cardStyle}>
            <h2>Select First Technology</h2>
            <select
              value={selectedOne}
              onChange={handleTechChangeOne}
              style={{
                backgroundColor: '#333',
                border: '1px solid #ccc',
                padding: '5px',
                marginRight: '10px',
              }}
            >
              <option>Select Technology</option>
              {data.map((tech, index) => (
                <option value={tech.name} key={index}>
                  {tech.name}
                </option>
              ))}
            </select>
            {selectedOne && (
              <div>
                <h4>Details for {selectedOne}</h4>
                {/* Add more detailed information about the selected technology here */}
                <p style={{ color: '#333' }}>
                  Add some detailed information about {selectedOne}...
                </p>
              </div>
            )}
          </div>

          {/* Select the second technology to compare for exmaple Angular vs React */}
          <div style={cardStyle}>
            <h2>Select Second Technology</h2>
            <select
              value={selectedTwo}
              onChange={handleTechChangeTwo}
              style={{
                backgroundColor: '#333',
                border: '1px solid #ccc',
                padding: '5px',
              }}
            >
              <option>Select Technology</option>
              {data.map((tech, index) => (
                <option value={tech.name} key={index}>
                  {tech.name}
                </option>
              ))}
            </select>
            {selectedTwo && (
              <div>
                <h4>Details for {selectedTwo}</h4>
                {/* Add more detailed information about the selected technology here */}
                <p style={{ color: '#333' }}>
                  Add some detailed information about {selectedTwo}...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
// Styling for comparison cards
const cardStyle: React.CSSProperties = {
  width: '40%',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  backgroundColor: '#333',
};
export default CompareList;
