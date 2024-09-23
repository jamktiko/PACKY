import type { NextApiRequest, NextApiResponse } from 'next';
import { getFeatures } from '@/utils/neo4j/neo4j';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const data = await getFeatures();
    response.status(200).json({ data });
  } catch (err) {
    response
      .status(500)
      .json({ err: 'Failed to fetch features and technologies' });
  }
}
