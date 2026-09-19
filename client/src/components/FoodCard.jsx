import './FoodCard.css';

function FoodCard({
  food,
  onClaim,
  onDelete,
  onStatusChange,
  currentUserId,
  isClaiming = false,
}) {
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

  const donorName =
    typeof food.donor === 'object'
      ? food.donor?.organization || food.donor?.name || 'Anonymous Donor'
      : food.donor || 'Anonymous Donor';

  const isOwner =
    currentUserId &&
    (food.donor?._id === currentUserId || food.donor === currentUserId);

  return (
    <div className="food-card">
      <div className="food-card-header">
        <span className="food-category-icon">
          {categoryIcons[food.category] || '🍽️'}
        </span>
        <span
          className="food-status"
          style={{ backgroundColor: statusColors[food.status] || '#757575' }}
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
        <div className="food-card-meta">
          <span className="food-donor">by {donorName}</span>
          {food.claimedBy && (
            <span className="food-claimed-by">
              Claimed by: {food.claimedBy.name || food.claimedBy.organization || 'NGO/Volunteer'}
            </span>
          )}
        </div>

        <div className="food-card-actions">
          {food.status === 'available' && onClaim && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onClaim(food._id)}
              disabled={isClaiming}
            >
              {isClaiming ? 'Claiming...' : 'Claim'}
            </button>
          )}

          {isOwner && food.status === 'claimed' && onStatusChange && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onStatusChange(food._id, 'collected')}
            >
              Mark Collected
            </button>
          )}

          {isOwner && onDelete && (
            <button
              className="btn btn-outline btn-sm delete-btn"
              onClick={() => onDelete(food._id)}
              title="Delete this listing"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
