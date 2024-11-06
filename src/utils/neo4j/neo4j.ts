import neo4j from 'neo4j-driver';

// Initialize Neo4j driver once
const driver = neo4j.driver(
  process.env.NEXT_PUBLIC_NEO4J_URI!,
  neo4j.auth.basic(
    process.env.NEXT_PUBLIC_NEO4J_USER!,
    process.env.NEXT_PUBLIC_NEO4J_PASSWORD!
  ),
  {
    maxConnectionPoolSize: 10, // Example setting for connection pooling
  }
);

// Utility function to run a query with session management
const runCypherQuery = async (query: string, params = {}) => {
  // Create a session in read mode for optimized read operations
  const session = driver.session({ defaultAccessMode: neo4j.session.READ });
  try {
    const result = await session.run(query, params);
    return result.records.map((record) => record.toObject());
  } finally {
    await session.close();
  }
};

// Function to get all nodes from specified labels with features
export const getData = async () => {
  const query = `
    MATCH (n)
    WHERE any(label IN labels(n) WHERE label IN ['backendFramework', 'Database', 'frontendFramework', 'Language', 'CSSframework', 'metaFramework'])
    OPTIONAL MATCH (n)-[r:SUPPORTS]->(f:Feature)
    WITH n, collect(r.weight) AS weights
    RETURN 
      n.name AS name, 
      n.description AS desc, 
      n.imageUrl AS image, 
      n.pros AS pros, 
      n.cons AS cons, 
      n.link AS link, 
      weights
  `;
  try {
    return await runCypherQuery(query);
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};

// Function to retrieve features with associated technologies and weights
export const getFeatures = async () => {
  const query = `
    MATCH (t)-[r:SUPPORTS]->(f:Feature)
    WITH f, collect({technology: t.name, weight: r.weight}) AS techRelations
    RETURN 
      f.name AS name, 
      f.description AS desc, 
      techRelations
  `;
  try {
    return await runCypherQuery(query);
  } catch (error) {
    console.error('Error fetching features:', error);
    throw error;
  }
};

// Retrieve technologies sorted by weight for a specific feature or list of features
export const getTechsForFeature = async (featureName: string | string[]) => {
  const query = `
    MATCH (t)-[r:SUPPORTS]->(f:Feature)
    WHERE f.name IN $featureNames
      AND any(label IN labels(t) WHERE label IN ['frontendFramework', 'backendFramework', 'Database', 'Language', 'CSSframework', 'metaFramework'])
    WITH t, SUM(r.weight) AS totalScore
    RETURN labels(t) AS technologyCategory, t.name AS technology, totalScore
    ORDER BY totalScore DESC
  `;
  
  const params = {
    featureNames: Array.isArray(featureName) ? featureName : [featureName],
  };

  try {
    return await runCypherQuery(query, params);
  } catch (error) {
    console.error(`Error fetching technologies for feature(s): ${error}`);
    throw error;
  }
};

// Optional function to close the driver when the app shuts down
export const closeDriver = async () => {
  await driver.close();
};
