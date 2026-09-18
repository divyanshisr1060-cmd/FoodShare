import { useState } from 'react';
import FoodCard from '../components/FoodCard';
import './AvailableFood.css';

// Mock data for demonstration
const mockListings = [
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
    donor: 'Taj Hotel',
  },
  {
    id: 2,
    title: 'Fresh Vegetables',
    description: 'Surplus vegetables from our farm. Includes tomatoes, potatoes, onions, and spinach.',
    quantity: '15 kg',
    category: 'raw',
    expiryDate: '2026-09-21',
    pickupAddress: 'Green Farms, Pune Highway',
    pickupTime: '10:00 AM - 12:00 PM',
    status: 'available',
    donor: 'Green Farms',
  },
  {
    id: 3,
    title: 'Packaged Snacks',
    description: 'Assorted packaged snacks approaching best-before date. All sealed and safe.',
    quantity: '50 packs',
    category: 'packaged',
    expiryDate: '2026-10-15',
    pickupAddress: 'Star Supermarket, Bandra',
    pickupTime: '6:00 PM - 8:00 PM',
    status: 'available',
    donor: 'Star Supermarket',
  },
  {
    id: 4,
    title: 'Juice Bottles',
    description: 'Fresh fruit juice bottles from today\'s event. Mango and orange flavors.',
    quantity: '40 bottles',
    category: 'beverages',
    expiryDate: '2026-09-19',
    pickupAddress: 'Event Hall, Juhu',
    pickupTime: '5:00 PM - 7:00 PM',
    status: 'claimed',
    donor: 'Fresh Juices Co.',
  },
  {
    id: 5,
    title: 'Wedding Catering Leftovers',
    description: 'Variety of dishes from a wedding reception. Includes dal, sabzi, rice, and roti.',
    quantity: '100 servings',
    category: 'cooked',
    expiryDate: '2026-09-18',
    pickupAddress: 'Grand Banquet Hall, Versova',
    pickupTime: '11:00 PM - 12:00 AM',
    status: 'available',
    donor: 'Royal Caterers',
  },
  {
    id: 6,
    title: 'Bread Loaves',
    description: 'Day-old bread from our bakery. White and whole wheat options available.',
    quantity: '25 loaves',
    category: 'packaged',
    expiryDate: '2026-09-19',
    pickupAddress: 'Baker\'s Delight, Andheri West',
    pickupTime: '7:00 PM - 9:00 PM',
    status: 'collected',
    donor: 'Baker\'s Delight',
  },
];

function AvailableFood() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredListings = mockListings.filter((food) => {
    const matchesFilter = filter === 'all' || food.category === filter;
    const matchesSearch =
      food.title.toLowerCase().includes(search.toLowerCase()) ||
      food.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="available-food">
      <div className="container">
        <div className="page-header">
          <h1>Available Food</h1>
          <p>Browse surplus food available for pickup in your area</p>
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search food listings..."
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
        <p className="results-count">
          Showing {filteredListings.length} listing{filteredListings.length !== 1 ? 's' : ''}
        </p>

        {/* Listings Grid */}
        <div className="food-grid">
          {filteredListings.length > 0 ? (
            filteredListings.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))
          ) : (
            <div className="no-results">
              <span className="no-results-icon">🔍</span>
              <h3>No listings found</h3>
              <p>Try changing your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AvailableFood;
