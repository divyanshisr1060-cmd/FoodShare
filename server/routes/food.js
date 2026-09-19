const express = require('express');
const router = express.Router();
const FoodListing = require('../models/FoodListing');
const { protect } = require('../middleware/auth');

// @route   GET /api/food
// @desc    Get all food listings with optional search & category filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, status } = req.query;
    let query = {};

    // Filter by status if specified, otherwise show all
    if (status && status !== 'all') {
      query.status = status;
    }

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search keyword in title, description, or pickup address
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { pickupAddress: searchRegex },
      ];
    }

    const listings = await FoodListing.find(query)
      .populate('donor', 'name organization phone email address')
      .populate('claimedBy', 'name organization phone email')
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    console.error('Error fetching food listings:', error);
    res.status(500).json({ message: 'Server error retrieving food listings' });
  }
});

// @route   GET /api/food/my-listings
// @desc    Get listings created by the logged-in donor/user
// @access  Private
router.get('/my-listings', protect, async (req, res) => {
  try {
    const listings = await FoodListing.find({ donor: req.user._id })
      .populate('donor', 'name organization phone email address')
      .populate('claimedBy', 'name organization phone email')
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    console.error('Error fetching user listings:', error);
    res.status(500).json({ message: 'Server error retrieving your listings' });
  }
});

// @route   GET /api/food/my-claims
// @desc    Get listings claimed by the logged-in NGO/volunteer/user
// @access  Private
router.get('/my-claims', protect, async (req, res) => {
  try {
    const listings = await FoodListing.find({ claimedBy: req.user._id })
      .populate('donor', 'name organization phone email address')
      .populate('claimedBy', 'name organization phone email')
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    console.error('Error fetching claimed listings:', error);
    res.status(500).json({ message: 'Server error retrieving your claimed listings' });
  }
});

// @route   GET /api/food/:id
// @desc    Get a single food listing by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.params.id)
      .populate('donor', 'name organization phone email address')
      .populate('claimedBy', 'name organization phone email');

    if (!listing) {
      return res.status(404).json({ message: 'Food listing not found' });
    }

    res.json(listing);
  } catch (error) {
    console.error('Error fetching listing details:', error);
    res.status(500).json({ message: 'Server error retrieving listing details' });
  }
});

// @route   POST /api/food
// @desc    Create a new food listing
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const {
      title,
      description,
      quantity,
      category,
      expiryDate,
      pickupAddress,
      pickupTime,
    } = req.body;

    if (!title || !description || !quantity || !expiryDate || !pickupAddress || !pickupTime) {
      return res.status(400).json({ message: 'Please provide all required food listing fields' });
    }

    const listing = await FoodListing.create({
      title,
      description,
      quantity,
      category: category || 'cooked',
      expiryDate,
      pickupAddress,
      pickupTime,
      donor: req.user._id,
      status: 'available',
    });

    const populatedListing = await FoodListing.findById(listing._id).populate(
      'donor',
      'name organization phone email address'
    );

    res.status(201).json({
      message: 'Food listing created successfully',
      listing: populatedListing,
    });
  } catch (error) {
    console.error('Error creating food listing:', error);
    res.status(500).json({ message: error.message || 'Server error creating listing' });
  }
});

// @route   PUT /api/food/:id
// @desc    Update a food listing
// @access  Private (Donor only)
router.put('/:id', protect, async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Food listing not found' });
    }

    // Verify ownership
    if (listing.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this listing' });
    }

    const updatedListing = await FoodListing.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .populate('donor', 'name organization phone email address')
      .populate('claimedBy', 'name organization phone email');

    res.json({
      message: 'Listing updated successfully',
      listing: updatedListing,
    });
  } catch (error) {
    console.error('Error updating food listing:', error);
    res.status(500).json({ message: error.message || 'Server error updating listing' });
  }
});

// @route   DELETE /api/food/:id
// @desc    Delete a food listing
// @access  Private (Donor only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Food listing not found' });
    }

    // Verify ownership
    if (listing.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this listing' });
    }

    await FoodListing.findByIdAndDelete(req.params.id);

    res.json({ message: 'Food listing deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('Error deleting food listing:', error);
    res.status(500).json({ message: 'Server error deleting listing' });
  }
});

// @route   PUT /api/food/:id/claim
// @desc    Claim an available food listing
// @access  Private
router.put('/:id/claim', protect, async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Food listing not found' });
    }

    if (listing.status !== 'available') {
      return res.status(400).json({ message: 'This food listing is no longer available' });
    }

    listing.status = 'claimed';
    listing.claimedBy = req.user._id;
    await listing.save();

    const populatedListing = await FoodListing.findById(listing._id)
      .populate('donor', 'name organization phone email address')
      .populate('claimedBy', 'name organization phone email');

    res.json({
      message: 'Food listing claimed successfully!',
      listing: populatedListing,
    });
  } catch (error) {
    console.error('Error claiming food listing:', error);
    res.status(500).json({ message: 'Server error claiming listing' });
  }
});

// @route   PUT /api/food/:id/unclaim
// @desc    Cancel claim on a food listing
// @access  Private (Claimer only)
router.put('/:id/unclaim', protect, async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Food listing not found' });
    }

    if (
      !listing.claimedBy ||
      listing.claimedBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to cancel this claim' });
    }

    listing.status = 'available';
    listing.claimedBy = null;
    await listing.save();

    const populatedListing = await FoodListing.findById(listing._id)
      .populate('donor', 'name organization phone email address');

    res.json({
      message: 'Claim cancelled successfully',
      listing: populatedListing,
    });
  } catch (error) {
    console.error('Error unclaiming food listing:', error);
    res.status(500).json({ message: 'Server error cancelling claim' });
  }
});

// @route   PUT /api/food/:id/status
// @desc    Update listing status (e.g., mark as collected)
// @access  Private
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const listing = await FoodListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Food listing not found' });
    }

    // Donor or claimer can update status
    const isDonor = listing.donor.toString() === req.user._id.toString();
    const isClaimer = listing.claimedBy && listing.claimedBy.toString() === req.user._id.toString();

    if (!isDonor && !isClaimer) {
      return res.status(403).json({ message: 'Not authorized to change status for this listing' });
    }

    listing.status = status;
    await listing.save();

    const populatedListing = await FoodListing.findById(listing._id)
      .populate('donor', 'name organization phone email address')
      .populate('claimedBy', 'name organization phone email');

    res.json({
      message: `Listing status updated to ${status}`,
      listing: populatedListing,
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Server error updating status' });
  }
});

module.exports = router;
