import React, { useState, useEffect } from 'react';
import { getData } from '@/utils/neo4j/neo4j'; // Importing a utility function to fetch data from Neo4j database

/**
 * THIS COMPONENT IS GOING TO BE USED FOR THE COMPARE PAGE
 * It allows users to select two technologies from a category and compare them
 * Edit so you cannot compare two same things
 */

// Define the structure of the technology data
interface FeatureTechnology {
  name: string;
  desc: string;
}
const CompareList = () => {
  // State to hold the list of technologies fetched from the database
  const [data, setData] = useState<FeatureTechnology[]>([]);

  // State to manage the selected category of technologies (e.g., "frontendFrameworks")
  const [collectionName, setCollectionName] = useState('frontendFramework');
  const [selectedOne, setSelectedOne] = useState(''); // First technology to compare
  const [selectedTwo, setSelectedTwo] = useState(''); // Second technology to compare

  // Fetch data based on the selected category (e.g., "frontendFrameworks", "backendFrameworks")
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(collectionName); // Fetch the technologies from the database
      console.log(data);
      setData(data as FeatureTechnology[]); // Set the fetched data into state
    };
    fetchData(); // Call fetch function whenever the category changes
  }, [collectionName]); // Trigger effect when the selected category changes

  // Options for selecting the type of collection (Frontend, Backend, Features, or Languages)
  const options = [
    { value: 'frontendFramework', label: 'Frontend Frameworks' },
    { value: 'backendFramework', label: 'Backend Frameworks' },
    { value: 'Language', label: 'Languages' },
  ];
  // Handle the change of the technology category
  const handleCollectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCollectionName(event.target.value);
    setSelectedOne(''); // Reset the selected technology when the collection changes
    setSelectedTwo(''); // Reset the selected technology when the collection changes
  };
  // Handle changes for the two technologies being compared
  const handleTechChangeOne = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOne(event.target.value); // Update the first selected technology
  };
  // Handle changes when the user selects the second technology
  const handleTechChangeTwo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTwo(event.target.value); // Update the second selected technology
  };

  const clearCompare = () => {
    setSelectedOne('');
    setSelectedTwo('');
  };
  return (
    <>
      <div>
        <h1>Compare Technologies</h1>
        {/* Dropdown to select category such as frontend, backend, features or languages */}
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
          {/* Render the category options */}
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Render the comparison cards side by side */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '20px',
          }}
        >
          {/* Select the first technology to compare for example Angular vs React*/}
          <div style={cardStyle}>
            <h2>Select First Technology</h2>
            {/* Dropdown to select the first technology */}
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
              <option value="" disabled selected hidden>
                Select Technology
              </option>
              {/* Render the list of technologies fetched from the database */}
              {data.map((tech, index) => (
                <option
                  value={tech.name}
                  key={index}
                  disabled={tech.name === selectedTwo}
                >
                  {tech.name}
                </option>
              ))}
            </select>
            {/* Display the details of the selected technology */}
            {selectedOne && (
              <div>
                {/* Show select item */}
                <h4>Details for {selectedOne}</h4>
                {/* Add more detailed information about the selected technology here */}
                <p>{data.find((tech) => tech.name === selectedOne)?.desc}</p>
              </div>
            )}
          </div>

          {/* Second comparison card */}
          {/* Select the second technology to compare for exmaple Angular vs React */}
          <div style={cardStyle}>
            <h2>Select Second Technology</h2>
            {/* Dropdown to select the second technology */}
            <select
              value={selectedTwo}
              onChange={handleTechChangeTwo}
              style={{
                backgroundColor: '#333',
                border: '1px solid #ccc',
                padding: '5px',
              }}
            >
              <option value="" disabled selected hidden>
                Select Technology
              </option>
              {/* Render the list of technologies fetched from the database */}
              {data.map((tech, index) => (
                <option
                  value={tech.name}
                  key={index}
                  disabled={tech.name === selectedOne}
                >
                  {tech.name}
                </option>
              ))}
            </select>
            {/* Display the details of the selected technology */}
            {selectedTwo && (
              <div>
                {/* Show select item */}
                <h4>{selectedTwo}</h4>
                <p>Add some detailed information about {selectedTwo}...</p>
                <h4>Details for {selectedTwo}</h4>
                <p>
                  <p>{data.find((tech) => tech.name === selectedTwo)?.desc}</p>
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Clear Comparison button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <button
            style={{
              backgroundColor: '#333',
              color: 'white', // Tekstin väri
              padding: '10px 20px', // Lisää sisätilaa
              border: 'none', // Poistaa reunuksen
              borderRadius: '5px', // Kulmat pyöristetty
              cursor: 'pointer', // Muuttaa osoittimen painiketta hiirellä
            }}
            onClick={clearCompare}
          >
            Clear Comparison
          </button>
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
