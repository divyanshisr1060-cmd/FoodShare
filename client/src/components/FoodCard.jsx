import './FoodCard.css';

function FoodCard({ food }) {
  const categoryIcons = {
    cooked: '🍲',
    raw: '🥬',
    packaged: '📦',
    beverages: '🥤',
    other: '🍽️',
  };

  const statusColors = {
    available: '#2e7d32',
    claimed: '#ff8f00',
    collected: '#757575',
  };

  return (
    <div className="food-card">
      <div className="food-card-header">
        <span className="food-category-icon">{categoryIcons[food.category] || '🍽️'}</span>
        <span
          className="food-status"
          style={{ backgroundColor: statusColors[food.status] }}
        >
          {food.status}
        </span>
      </div>
      <h3 className="food-title">{food.title}</h3>
      <p className="food-description">{food.description}</p>
      <div className="food-details">
        <div className="food-detail">
          <span className="detail-label">📦 Quantity</span>
          <span className="detail-value">{food.quantity}</span>
        </div>
        <div className="food-detail">
          <span className="detail-label">📍 Pickup</span>
          <span className="detail-value">{food.pickupAddress}</span>
        </div>
        <div className="food-detail">
          <span className="detail-label">🕐 Time</span>
          <span className="detail-value">{food.pickupTime}</span>
        </div>
        <div className="food-detail">
          <span className="detail-label">📅 Expiry</span>
          <span className="detail-value">{food.expiryDate}</span>
        </div>
      </div>
      <div className="food-card-footer">
        <span className="food-donor">by {food.donor}</span>
        {food.status === 'available' && (
          <button className="btn btn-primary btn-sm">Claim</button>
        )}
      </div>
    </div>
  );
}

export default FoodCard;
