// Importing types using CommonJS syntax requires a slightly different approach,
// but since types are primarily useful in TypeScript files, this direct conversion focuses on functionality.
const { VercelRequest, VercelResponse } = require('@vercel/node');

// Convert the ES Module export to CommonJS export
module.exports = (req, res) => {
  res.status(200).json({ message: 'Hello from Vercel!' });
};
