import { useState } from 'react';
import FoodCard from '../components/FoodCard';
import './Dashboard.css';

// Mock data for demonstration
const mockMyListings = [
  {
    id: 1,
    title: 'Leftover Biryani',
    description: 'Freshly cooked chicken biryani from lunch event. Serves approximately 20 people.',
    quantity: '20 servings',
    category: 'cooked',
    expiryDate: '2026-09-19',
    pickupAddress: 'Taj Hotel, Colaba, Mumbai',
    pickupTime: '4:00 PM - 6:00 PM',
    status: 'available',
    donor: 'You',
  },
  {
    id: 2,
    title: 'Bread and Pastries',
    description: 'Day-old bread loaves and pastries from our bakery. Still fresh and edible.',
    quantity: '30 pieces',
    category: 'packaged',
    expiryDate: '2026-09-19',
    pickupAddress: 'Baker\'s Delight, Andheri West',
    pickupTime: '7:00 PM - 9:00 PM',
    status: 'claimed',
    donor: 'You',
  },
];

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [newListing, setNewListing] = useState({
    title: '',
    description: '',
    quantity: '',
    category: 'cooked',
    expiryDate: '',
    pickupAddress: '',
    pickupTime: '',
  });

  const handleChange = (e) => {
    setNewListing({ ...newListing, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend API
    console.log('New listing:', newListing);
    alert('Listing created! (Backend integration pending)');
    setShowForm(false);
    setNewListing({
      title: '',
      description: '',
      quantity: '',
      category: 'cooked',
      expiryDate: '',
      pickupAddress: '',
      pickupTime: '',
    });
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p className="dashboard-subtitle">Manage your food listings</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Cancel' : '+ Add New Listing'}
          </button>
        </div>

        {/* Add Listing Form */}
        {showForm && (
          <div className="add-listing-form">
            <h3>Create New Food Listing</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Food Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newListing.title}
                    onChange={handleChange}
                    placeholder="e.g., Leftover Biryani"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={newListing.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="cooked">🍲 Cooked Food</option>
                    <option value="raw">🥬 Raw Ingredients</option>
                    <option value="packaged">📦 Packaged Food</option>
                    <option value="beverages">🥤 Beverages</option>
                    <option value="other">🍽️ Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newListing.description}
                  onChange={handleChange}
                  placeholder="Describe the food, how many people it can serve, etc."
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={newListing.quantity}
                    onChange={handleChange}
                    placeholder="e.g., 20 servings"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    value={newListing.expiryDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pickupAddress">Pickup Address</label>
                  <input
                    type="text"
                    id="pickupAddress"
                    name="pickupAddress"
                    value={newListing.pickupAddress}
                    onChange={handleChange}
                    placeholder="Enter pickup location"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pickupTime">Pickup Time</label>
                  <input
                    type="text"
                    id="pickupTime"
                    name="pickupTime"
                    value={newListing.pickupTime}
                    onChange={handleChange}
                    placeholder="e.g., 4:00 PM - 6:00 PM"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Create Listing
              </button>
            </form>
          </div>
        )}

        {/* Summary Cards */}
        <div className="dashboard-stats">
          <div className="dash-stat-card">
            <span className="dash-stat-icon">📋</span>
            <div>
              <span className="dash-stat-number">2</span>
              <span className="dash-stat-label">Total Listings</span>
            </div>
          </div>
          <div className="dash-stat-card">
            <span className="dash-stat-icon">✅</span>
            <div>
              <span className="dash-stat-number">1</span>
              <span className="dash-stat-label">Available</span>
            </div>
          </div>
          <div className="dash-stat-card">
            <span className="dash-stat-icon">🤝</span>
            <div>
              <span className="dash-stat-number">1</span>
              <span className="dash-stat-label">Claimed</span>
            </div>
          </div>
          <div className="dash-stat-card">
            <span className="dash-stat-icon">📦</span>
            <div>
              <span className="dash-stat-number">0</span>
              <span className="dash-stat-label">Collected</span>
            </div>
          </div>
        </div>

        {/* Listings */}
        <h2 className="listings-title">Your Listings</h2>
        <div className="listings-grid">
          {mockMyListings.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
