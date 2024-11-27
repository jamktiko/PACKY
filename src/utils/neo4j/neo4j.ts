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
  const query = `
MATCH (n)
WHERE n:backendFramework OR n:Database OR n:frontendFramework OR n:Language OR n:cssFramework
OPTIONAL MATCH (n)-[r:SUPPORTS]->(f:Feature)
WITH n, f.name AS featureName, SUM(r.weight) AS totalWeight
WITH n, collect({feature: featureName, weight: totalWeight}) AS weights
RETURN DISTINCT 
  n.name AS name, 
  n.description AS desc, 
  n.imageUrl AS image,
  n.link AS link,
  n.checked AS checked,
  weights
`;

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
   RETURN f.name AS name, f.description AS desc,f.tip AS tips ,techRelations
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
  AND any(label IN labels(t) WHERE label IN ['frontendFramework', 'backendFramework','cssFramework' ,'Database', 'Language'])
  RETURN labels(t) AS technologyCategory, t.name AS technology, f.name AS featureName, r.weight AS weight
  ORDER BY weight DESC
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

export const getTutorialsForTechAndFeatures = async (
  techs: string[],
  features: string[]
) => {
  const query = `
  MATCH (tech)-[:HAS_TUTORIAL]->(tut:Tutorial)<-[:REQUIRES_TUTORIAL]-(feat:Feature)
  WHERE ANY(label IN labels(tech) WHERE label IN ['frontendFramework', 'backendFramework', 'Database','cssFramework'])
    AND tech.name IN $techs
    AND feat.name IN $features
  RETURN tech.name AS Technology, feat.name AS Feature, tut.name AS TutorialName, tut.link AS TutorialLink
`;
  const params = { techs, features };

  try {
    const result = await runCypherQuery(query, params);
    return result; // This will be an empty array if no tutorials exist
  } catch (error) {
    console.error('Error fetching tutorials:', error);
    throw error;
  }
};
