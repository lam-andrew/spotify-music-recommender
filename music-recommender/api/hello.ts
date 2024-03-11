import type { VercelRequest, VercelResponse } from '@vercel/node'

export default (req: VercelRequest, res: VercelResponse): void => {
  res.status(200).json({ message: 'Hello from Vercel!' })
}
