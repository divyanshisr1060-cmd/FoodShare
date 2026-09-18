// Food Listing model
// TODO: Implement in Stage 2

const mongoose = require('mongoose');

const foodListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: String, required: true },
  category: { type: String, enum: ['cooked', 'raw', 'packaged', 'beverages', 'other'], required: true },
  expiryDate: { type: Date, required: true },
  pickupAddress: { type: String, required: true },
  pickupTime: { type: String, required: true },
  status: { type: String, enum: ['available', 'claimed', 'collected'], default: 'available' },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('FoodListing', foodListingSchema);
