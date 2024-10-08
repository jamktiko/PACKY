import React, { useState, useEffect } from 'react';
import { getData } from '@/utils/neo4j/neo4j'; // Importing a utility function to fetch data from Neo4j database
import Image from 'next/image';
import Link from 'next/link';
import { color } from 'framer-motion';
/**
 * THIS COMPONENT IS GOING TO BE USED FOR THE COMPARE PAGE
 * It allows users to select two technologies from a category and compare them
 * Edit so you cannot compare two same things
 */

// Define the structure of the technology data
interface FeatureTechnology {
  name: string;
  desc: string;
  image: string;
  pros: string[];
  cons: string[];
  link: string;
}
const CompareList = () => {
  // State to hold the list of technologies fetched from the database
  const [data, setData] = useState<FeatureTechnology[]>([]);

  // State to manage the selected category of technologies (e.g., "frontendFrameworks")

  const [collectionName, setCollectionName] = useState<string | null>(null);
  const [selectedOne, setSelectedOne] = useState(''); // First technology to compare
  const [selectedTwo, setSelectedTwo] = useState(''); // Second technology to compare

  // Fetch data based on the selected category (e.g., "frontendFrameworks", "backendFrameworks")
  useEffect(() => {
    if (collectionName !== null) {
      const fetchData = async () => {
        const data = await getData(collectionName); // Fetch technology data from the Neo4j database
        console.log(data);
        setData(data as FeatureTechnology[]); // Set the fetched data into the state
      };
      fetchData();
    }
  }, [collectionName]); // Re-run the effect if the selected category change

  // Options for selecting the type of collection (Frontend, Backend, Features, or Languages)
  const options = [
    { value: 'frontendFramework', label: 'Frontend Frameworks' },
    { value: 'backendFramework', label: 'Backend Frameworks' },
    { value: 'Language', label: 'Languages' },
    { value: 'Database', label: 'Databases' },
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

  // Clear option for clearing the comparison sections
  const clearCompare = () => {
    setSelectedOne('');
    setSelectedTwo('');
  };
  return (
    <>
      <div>
        <h1>Select Comparable Technologies</h1>
        {/* Dropdown to select category such as frontend, backend, features or languages */}
        <select
          // Set the current value of the dropdown to the selected category or an empty string if no category is selected.
          value={collectionName ?? ''}
          onChange={handleCollectionChange}
          style={{
            backgroundColor: '#333',
            border: '1px solid #ccc',
            padding: '5px',
            marginBottom: '20px',
          }}
        >
          <option value="" disabled selected hidden>
            Select
          </option>
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
            alignItems: 'flex-start', // Ensure cards align at the top and not stretch equally
          }}
        >
          {/* Select the first technology to compare for example Angular vs React*/}
          <div style={cardStyle}>
            <h2>Select First Technology</h2>
            {/* Dropdown to select the first technology */}
            <select
              value={selectedOne}
              disabled={collectionName === null}
              onChange={handleTechChangeOne}
              style={{
                backgroundColor: '#333',
                border: '1px solid #ccc',
                padding: '5px',
                marginRight: '10px',
                opacity: collectionName === null ? 0.5 : 1, // add some opacity to make it look disabled
              }}
            >
              {/* Palceholder kind of thing to show when nothing is selected*/}
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
                <h4>{selectedOne}</h4>
                {/* Add more detailed information about the selected technology here */}
                <p>{data.find((tech) => tech.name === selectedOne)?.desc}</p>
                {/* Show pros and cons */}
                <h4>Pros</h4>
                {/* Show cons and pros in list */}
                <ul>
                  {data
                    .find((tech) => tech.name === selectedOne)
                    ?.pros.map((pro, index) => (
                      <li key={index} style={{ color: 'green' }}>
                        {pro}
                      </li>
                    ))}
                </ul>
                <h4>Cons</h4>
                {/* Show cons and pros in list */}
                <ul>
                  {data
                    .find((tech) => tech.name === selectedOne)
                    ?.cons.map((con, index) => (
                      <li key={index} style={{ color: 'red' }}>
                        {con}
                      </li>
                    ))}
                </ul>
                {/* Link in image to navigate to sites for example if you press angular logo it will take you to angular site */}
                <Link
                  href={
                    data.find((tech) => tech.name === selectedOne)?.link || '/'
                  }
                  target="_blank"
                >
                  <Image
                    className="h-16 w-16 mx-auto"
                    src={
                      data.find((tech) => tech.name === selectedOne)?.image ||
                      ''
                    }
                    alt={selectedOne}
                    width={100}
                    height={100}
                  />
                </Link>
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
              disabled={collectionName === null}
              onChange={handleTechChangeTwo}
              style={{
                backgroundColor: '#333',
                border: '1px solid #ccc',
                padding: '5px',
                opacity: collectionName === null ? 0.5 : 1,
              }}
            >
              {/* Palceholder kind of thing to show when nothing is selected*/}
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

                <p>{data.find((tech) => tech.name === selectedTwo)?.desc}</p>

                <h4>Pros</h4>
                {/* Show cons and pros in list */}
                <ul>
                  {data
                    .find((tech) => tech.name === selectedTwo)
                    ?.pros.map((pro, index) => (
                      <li key={index} style={{ color: 'green' }}>
                        {pro}
                      </li>
                    ))}
                </ul>
                <h4>Cons</h4>
                <ul>
                  {/* Show cons and pros in list */}
                  {data
                    .find((tech) => tech.name === selectedTwo)
                    ?.cons.map((con, index) => (
                      <li key={index} style={{ color: 'red' }}>
                        {con}
                      </li>
                    ))}
                </ul>
                <Link
                  href={
                    data.find((tech) => tech.name === selectedTwo)?.link || '/'
                  }
                  target="_blank"
                >
                  <Image
                    className="h-16 w-16 mx-auto"
                    src={
                      data.find((tech) => tech.name === selectedTwo)?.image ||
                      ''
                    }
                    alt={selectedTwo}
                    width={100}
                    height={100}
                  />
                </Link>
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
          {/* Clear Comparison button */}
          <button
            style={{
              backgroundColor: '#333',
              color: 'white', // Tekstin väri
              padding: '10px 20px', // Lisää sisätilaa
              border: '1px solid #ccc',
              borderRadius: '5px', // Kulmat pyöristetty
              cursor: 'pointer', // Muuttaa osoittimen painiketta hiirellä
            }}
            onClick={clearCompare}
          >
            Clear Selections
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
