import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
  process.env.NEXT_PUBLIC_NEO4J_URI!,
  neo4j.auth.basic(
    process.env.NEXT_PUBLIC_NEO4J_USER!,
    process.env.NEXT_PUBLIC_NEO4J_PASSWORD!
  )
);

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
export const getData = async (type: string) => {
  const query = `MATCH (n:${type}) RETURN n.name AS name`;
  try {
    return await runCypherQuery(query);
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};

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
