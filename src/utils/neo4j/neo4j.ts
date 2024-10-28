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
WHERE n:backendFramework OR n:Database OR n:frontendFramework OR n:Language
RETURN DISTINCT n.name AS name, n.description AS desc, n.imageUrl AS image, n.pros AS pros, n.cons AS cons, n.link AS link
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
   RETURN f.name AS name, f.description AS desc, techRelations
  `;

  // MATCH (f:Feature)
  // RETURN  f.name AS name,
  // f.description as desc
  try {
    return await runCypherQuery(query);
  } catch (error) {
    console.error('Error fetching features:', error);
    throw error;
  }
};

// export const getTechsForFeature = async (featureName: string) => {
//   const query = `MATCH (feature:Feature {name: $featureName})<-[r:SUPPORTS]-(t)
// RETURN DISTINCT t.name as name, labels(t) as type, r.weight AS weight
// ORDER BY weight DESC
//   `;

//   try {
//     const result = await runCypherQuery(query, { featureName });
//     return result;
//   } catch (error) {
//     console.error(error + 'error');
//   }
// };

export const getTechsForFeature = async (
  featureName: string | string[] // Accept both single feature or an array of features
) => {
  let query: string;
  let params: any;

  // If featureName is an array (multiple features), run the summed weight query
  if (Array.isArray(featureName)) {
    query = `
    MATCH (t)-[r:SUPPORTS]->(f:Feature)
    WHERE f.name IN $featureNames
    AND (t:frontendFramework OR t:backendFramework OR t:Database OR t:Language OR t:library)
    WITH t, SUM(r.weight) AS totalScore
    ORDER BY totalScore DESC
    RETURN labels(t) AS technologyCategory, t.name AS technology, totalScore
  `;
    params = { featureNames: featureName }; // Pass the array of feature names
  } else {
    // If it's a single feature, pass it as an array with a single element
    query = `
    MATCH (t)-[r:SUPPORTS]->(f:Feature)
    WHERE f.name IN $featureNames
   AND (t:frontendFramework OR t:backendFramework OR t:Database OR t:Language OR t:library)
    WITH t, SUM(r.weight) AS totalScore
    ORDER BY totalScore DESC
    RETURN labels(t) AS technologyCategory, t.name AS technology, totalScore
  `;
    params = { featureNames: [featureName] }; // Pass the single feature name as an array
  }

  try {
    const result = await runCypherQuery(query, params);
    return result;
  } catch (error) {
    console.error(error + ' error');
  }
};
