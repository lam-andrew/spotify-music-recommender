// /api/hello.ts
import { VercelRequest, VercelResponse } from '@vercel/node'

const handler = (req: VercelRequest, res: VercelResponse) => {
  res.status(200).json({ message: 'Hello from Vercel!' })
}

module.exports = handler
