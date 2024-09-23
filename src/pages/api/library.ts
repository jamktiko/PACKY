import type { NextApiRequest, NextApiResponse } from 'next';
import { getData } from '@/utils/neo4j/neo4j';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const type = request.query.type as string;
  try {
    const data = await getData(type);
    response.status(200).json({ data });
  } catch (err) {
    response
      .status(500)
      .json({ err: 'Failed to fetch features and technologies' });
  }
}
