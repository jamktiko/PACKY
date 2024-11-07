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
export const getData = async () => {
  const query = `MATCH (n)
WHERE n:backendFramework OR n:Database OR n:frontendFramework OR n:Language OR n:CSSframework OR n:metaFramework OR n:Service
OPTIONAL MATCH (n)-[r:SUPPORTS]->(f:Feature)
WITH n, collect({weight: r.weight}) AS weights
RETURN DISTINCT 
    n.name AS name, 
    n.description AS desc, 
    n.imageUrl AS image,
    n.link AS link, 
    weights
`;

  // MATCH (n)
  // WHERE n:backendFramework OR n:Database OR n:frontendFramework OR n:Language
  // OPTIONAL MATCH (n)-[r:SUPPORTS]->(f:Feature)
  // WITH n, f, collect({technology: n.name, weight: r.weight}) AS weights
  // RETURN DISTINCT
  //     n.name AS name,
  //     n.description AS desc,
  //     n.imageUrl AS image,
  //     n.pros AS pros,
  //     n.cons AS cons,
  //     n.link AS link,
  //     weights

  try {
    return await runCypherQuery(query);
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};
// Function to retrieve all features from the neo4j
export const getFeatures = async () => {
  const query = `
   MATCH (t)-[r:SUPPORTS]->(f:Feature)
  WITH f, collect({technology: t.name, weight: r.weight}) AS techRelations
   RETURN f.name AS name, f.description AS desc, techRelations
  `;

  try {
    return await runCypherQuery(query);
  } catch (error) {
    console.error('Error fetching features:', error);
    throw error;
  }
};

// Function to retrieve technologies for a specific feature
export const getTechsForFeature = async (featureName: string | string[]) => {
  const query = `
    MATCH (t)-[r:SUPPORTS]->(f:Feature)
    WHERE f.name IN $featureNames
    AND any(label IN labels(t) WHERE label IN ['frontendFramework', 'backendFramework', 
    'Database', 'Language', 'library', 'cssFramework', 'metaFramework','Service'])
    WITH t, SUM(r.weight) AS totalScore
    ORDER BY totalScore DESC
    RETURN labels(t) AS technologyCategory, t.name AS technology, totalScore
  `;

  // Ensure `featureNames` is an array, whether single or multiple features
  const params = {
    featureNames: Array.isArray(featureName) ? featureName : [featureName],
  };

  try {
    const result = await runCypherQuery(query, params);
    return result;
  } catch (error) {
    console.error(`Error fetching technologies for feature(s): ${error}`);
    throw error; // Optionally rethrow error to handle it further up the call stack
  }
};
