import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FoodCard from '../components/FoodCard';
import './AvailableFood.css';

function AvailableFood() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [claimingId, setClaimingId] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch food listings from API
  const fetchFood = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/food');
      if (res.ok) {
        const data = await res.json();
        setListings(data);
      }
    } catch (error) {
      console.error('Failed to load food listings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  const handleClaim = async (foodId) => {
    if (!isAuthenticated) {
      setNotification({
        message: 'Please login or register to claim surplus food.',
        type: 'warning',
      });
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    try {
      setClaimingId(foodId);
      const res = await fetch(`/api/food/${foodId}/claim`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Could not claim this listing');
      }

      setNotification({
        message: '🎉 Successfully claimed! Check pickup details in your Dashboard.',
        type: 'success',
      });

      // Update local state
      setListings((prev) =>
        prev.map((item) =>
          item._id === foodId
            ? { ...item, status: 'claimed', claimedBy: user }
            : item
        )
      );
    } catch (err) {
      setNotification({
        message: err.message || 'Failed to claim listing',
        type: 'error',
      });
    } finally {
      setClaimingId(null);
      setTimeout(() => setNotification({ message: '', type: '' }), 5000);
    }
  };

  // Filter listings by category and search keyword
  const filteredListings = listings.filter((food) => {
    const matchesFilter = filter === 'all' || food.category === filter;
    const titleMatch = food.title?.toLowerCase().includes(search.toLowerCase());
    const descMatch = food.description?.toLowerCase().includes(search.toLowerCase());
    const addressMatch = food.pickupAddress?.toLowerCase().includes(search.toLowerCase());
    const matchesSearch = titleMatch || descMatch || addressMatch;
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="available-food">
      <div className="container">
        <div className="page-header">
          <h1>Available Food</h1>
          <p>Browse surplus food available for pickup in your area</p>
        </div>

        {notification.message && (
          <div className={`notification-banner ${notification.type}`}>
            {notification.message}
          </div>
        )}

        {/* Filters */}
        <div className="filters">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by food name, description, or pickup location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-buttons">
            {[
              { value: 'all', label: 'All' },
              { value: 'cooked', label: '🍲 Cooked' },
              { value: 'raw', label: '🥬 Raw' },
              { value: 'packaged', label: '📦 Packaged' },
              { value: 'beverages', label: '🥤 Beverages' },
            ].map((cat) => (
              <button
                key={cat.value}
                className={`filter-btn ${filter === cat.value ? 'active' : ''}`}
                onClick={() => setFilter(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="results-header">
          <p className="results-count">
            Showing {filteredListings.length} listing{filteredListings.length !== 1 ? 's' : ''}
          </p>
          <button onClick={fetchFood} className="btn btn-outline btn-sm refresh-btn">
            🔄 Refresh
          </button>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="loading-state">
            <p>Loading food listings from database...</p>
          </div>
        ) : (
          <div className="food-grid">
            {filteredListings.length > 0 ? (
              filteredListings.map((food) => (
                <FoodCard
                  key={food._id || food.id}
                  food={food}
                  onClaim={handleClaim}
                  currentUserId={user?._id || user?.id}
                  isClaiming={claimingId === (food._id || food.id)}
                />
              ))
            ) : (
              <div className="no-results">
                <span className="no-results-icon">🔍</span>
                <h3>No listings found</h3>
                <p>Try changing your search or filter criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AvailableFood;
