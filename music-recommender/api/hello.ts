import type { VercelRequest, VercelResponse } from '@vercel/node';

const handler = (req: VercelRequest, res: VercelResponse): void => {
  res.status(200).json({ message: 'Hello from Vercel!' });
};

export default handler;
