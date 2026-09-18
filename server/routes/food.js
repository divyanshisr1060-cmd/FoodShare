// Food listing routes
// TODO: Implement in Stage 2

const express = require('express');
const router = express.Router();

// GET /api/food - Get all available listings
router.get('/', async (req, res) => {
  res.json({ message: 'Get all listings - to be implemented' });
});

// POST /api/food - Create a new listing
router.post('/', async (req, res) => {
  res.json({ message: 'Create listing - to be implemented' });
});

// PUT /api/food/:id - Update a listing
router.put('/:id', async (req, res) => {
  res.json({ message: 'Update listing - to be implemented' });
});

// DELETE /api/food/:id - Delete a listing
router.delete('/:id', async (req, res) => {
  res.json({ message: 'Delete listing - to be implemented' });
});

// PUT /api/food/:id/claim - Claim a listing
router.put('/:id/claim', async (req, res) => {
  res.json({ message: 'Claim listing - to be implemented' });
});

module.exports = router;
