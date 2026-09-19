import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FoodCard from '../components/FoodCard';
import './Dashboard.css';

function Dashboard() {
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();

  const [myListings, setMyListings] = useState([]);
  const [myClaims, setMyClaims] = useState([]);
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'claims'
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const [newListing, setNewListing] = useState({
    title: '',
    description: '',
    quantity: '',
    category: 'cooked',
    expiryDate: '',
    pickupAddress: '',
    pickupTime: '',
  });

  const fetchDashboardData = async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const [listingsRes, claimsRes] = await Promise.all([
        fetch('/api/food/my-listings', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/food/my-claims', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (listingsRes.ok) {
        const listingsData = await listingsRes.json();
        setMyListings(listingsData);
      }

      if (claimsRes.ok) {
        const claimsData = await claimsRes.json();
        setMyClaims(claimsData);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated, token]);

  const handleChange = (e) => {
    setNewListing({ ...newListing, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification({ message: '', type: '' });

    try {
      const res = await fetch('/api/food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newListing),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create listing');
      }

      setNotification({
        message: '✅ Surplus food listing created and published successfully!',
        type: 'success',
      });

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

      // Refresh listings
      fetchDashboardData();
    } catch (err) {
      setNotification({
        message: `⚠️ ${err.message || 'Error creating listing'}`,
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNotification({ message: '', type: '' }), 5000);
    }
  };

  const handleDelete = async (foodId) => {
    if (!window.confirm('Are you sure you want to delete this food listing?')) {
      return;
    }

    try {
      const res = await fetch(`/api/food/${foodId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error('Failed to delete listing');
      }

      setMyListings((prev) => prev.filter((item) => item._id !== foodId));
      setNotification({
        message: '🗑️ Food listing deleted successfully.',
        type: 'success',
      });
    } catch (err) {
      setNotification({
        message: 'Failed to delete listing. Please try again.',
        type: 'error',
      });
    } finally {
      setTimeout(() => setNotification({ message: '', type: '' }), 4000);
    }
  };

  const handleStatusChange = async (foodId, newStatus) => {
    try {
      const res = await fetch(`/api/food/${foodId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error('Failed to update status');
      }

      fetchDashboardData();
      setNotification({
        message: `Status updated to "${newStatus}"!`,
        type: 'success',
      });
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setNotification({ message: '', type: '' }), 4000);
    }
  };

  // If user is not logged in
  if (!authLoading && !isAuthenticated) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="auth-prompt-card">
            <div className="prompt-icon">🔒</div>
            <h2>Access Your Dashboard</h2>
            <p>
              Please log in or register an account to create food listings, view your
              donations, and manage claimed distributions.
            </p>
            <div className="prompt-buttons">
              <Link to="/login" className="btn btn-primary">
                Login to Dashboard
              </Link>
              <Link to="/register" className="btn btn-outline">
                Register New Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculated statistics
  const totalListings = myListings.length;
  const availableCount = myListings.filter((i) => i.status === 'available').length;
  const claimedCount = myListings.filter((i) => i.status === 'claimed').length;
  const totalClaimsMade = myClaims.length;

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Welcome, {user?.name}!</h1>
            <p className="dashboard-subtitle">
              Role: <strong style={{ textTransform: 'capitalize' }}>{user?.role}</strong>{' '}
              {user?.organization ? `• ${user.organization}` : ''}
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Cancel' : '+ Add New Listing'}
          </button>
        </div>

        {notification.message && (
          <div className={`dash-notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        {/* Add Listing Form */}
        {showForm && (
          <div className="add-listing-form">
            <h3>Create New Food Listing</h3>
            <p className="form-helper-text">
              Enter surplus food details. NGOs and volunteers will be able to browse and claim it.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Food Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newListing.title}
                    onChange={handleChange}
                    placeholder="e.g., Cooked Rice & Curry Servings"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
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
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={newListing.description}
                  onChange={handleChange}
                  placeholder="Describe the items, dietary info, packaging, and who it can serve..."
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quantity">Quantity / Servings *</label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={newListing.quantity}
                    onChange={handleChange}
                    placeholder="e.g., 40 meal packets / 15 kg"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expiryDate">Best Before / Expiry *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={newListing.expiryDate}
                    onChange={handleChange}
                    placeholder="e.g., Today 9:00 PM or 2026-09-20"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pickupAddress">Pickup Address *</label>
                  <input
                    type="text"
                    id="pickupAddress"
                    name="pickupAddress"
                    value={newListing.pickupAddress}
                    onChange={handleChange}
                    placeholder="Enter complete pickup location"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pickupTime">Pickup Time Window *</label>
                  <input
                    type="text"
                    id="pickupTime"
                    name="pickupTime"
                    value={newListing.pickupTime}
                    onChange={handleChange}
                    placeholder="e.g., 3:00 PM - 6:00 PM"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Listing'}
              </button>
            </form>
          </div>
        )}

        {/* Summary Metric Cards */}
        <div className="dashboard-stats">
          <div className="dash-stat-card">
            <span className="dash-stat-icon">📋</span>
            <div>
              <span className="dash-stat-number">{totalListings}</span>
              <span className="dash-stat-label">Your Listings</span>
            </div>
          </div>
          <div className="dash-stat-card">
            <span className="dash-stat-icon">✅</span>
            <div>
              <span className="dash-stat-number">{availableCount}</span>
              <span className="dash-stat-label">Available</span>
            </div>
          </div>
          <div className="dash-stat-card">
            <span className="dash-stat-icon">🤝</span>
            <div>
              <span className="dash-stat-number">{claimedCount}</span>
              <span className="dash-stat-label">Claimed by NGOs</span>
            </div>
          </div>
          <div className="dash-stat-card">
            <span className="dash-stat-icon">📦</span>
            <div>
              <span className="dash-stat-number">{totalClaimsMade}</span>
              <span className="dash-stat-label">Your Claims</span>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="dash-tabs">
          <button
            className={`dash-tab-btn ${activeTab === 'listings' ? 'active' : ''}`}
            onClick={() => setActiveTab('listings')}
          >
            My Donated Food ({myListings.length})
          </button>
          <button
            className={`dash-tab-btn ${activeTab === 'claims' ? 'active' : ''}`}
            onClick={() => setActiveTab('claims')}
          >
            Food I Claimed ({myClaims.length})
          </button>
        </div>

        {/* Listings Display */}
        {isLoading ? (
          <div className="loading-state">
            <p>Loading dashboard listings from database...</p>
          </div>
        ) : activeTab === 'listings' ? (
          <div>
            <h2 className="listings-title">Your Food Donations</h2>
            {myListings.length > 0 ? (
              <div className="listings-grid">
                {myListings.map((food) => (
                  <FoodCard
                    key={food._id}
                    food={food}
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                    currentUserId={user?._id}
                  />
                ))}
              </div>
            ) : (
              <div className="dash-empty-state">
                <span className="empty-icon">🍲</span>
                <h3>No food listed yet</h3>
                <p>Have surplus food from an event or restaurant? Click "Add New Listing" to share it.</p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowForm(true)}
                >
                  + Create First Listing
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="listings-title">Food You Have Claimed for Distribution</h2>
            {myClaims.length > 0 ? (
              <div className="listings-grid">
                {myClaims.map((food) => (
                  <FoodCard
                    key={food._id}
                    food={food}
                    onStatusChange={handleStatusChange}
                    currentUserId={user?._id}
                  />
                ))}
              </div>
            ) : (
              <div className="dash-empty-state">
                <span className="empty-icon">🤝</span>
                <h3>No claimed listings yet</h3>
                <p>Browse available food listings in your community to collect and distribute.</p>
                <Link to="/available-food" className="btn btn-primary btn-sm">
                  Browse Available Food
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
