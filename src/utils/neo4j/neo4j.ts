import neo4j from 'neo4j-driver';

// Neo4j driver instance with URI, username and password
const driver = neo4j.driver(
  process.env.NEXT_PUBLIC_NEO4J_URI!,
  neo4j.auth.basic(
    process.env.NEXT_PUBLIC_NEO4J_USER!,
    process.env.NEXT_PUBLIC_NEO4J_PASSWORD!
  )
);

// a Function to run a Cypher query
export const runCypherQuery = async (query: string, params = {}) => {
  const session = driver.session();

  try {
    const result = await session.run(query, params);
    return result.records.map((record) => record.toObject());
  } finally {
    await session.close();
  }
};

// Library page use this!
// A function to get all nodes from a specific type
export const getData = async (type: string) => {
  const query = `MATCH (n:${type}) RETURN n.name AS name`;
  try {
    return await runCypherQuery(query);
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};
// Function to retrieve all features from the neo4j
export const getFeatures = async () => {
  const query = `MATCH (n:Feature)
  RETURN n.name AS name, n.description as desc`;

  try {
    return await runCypherQuery(query);
  } catch (error) {
    console.error(error + 'erroria saatana');
    throw error;
  }
};
