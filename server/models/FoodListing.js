const mongoose = require('mongoose');

const foodListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a food title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, 'Please provide the quantity/servings'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['cooked', 'raw', 'packaged', 'beverages', 'other'],
      default: 'cooked',
      required: true,
    },
    expiryDate: {
      type: String,
      required: [true, 'Please provide the expiry date or time'],
      trim: true,
    },
    pickupAddress: {
      type: String,
      required: [true, 'Please provide the pickup address'],
      trim: true,
    },
    pickupTime: {
      type: String,
      required: [true, 'Please provide the pickup time window'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['available', 'claimed', 'collected'],
      default: 'available',
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FoodListing', foodListingSchema);
