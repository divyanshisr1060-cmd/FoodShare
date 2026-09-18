// FoodShare Backend Server
// TODO: Implement in Stage 2

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (to be implemented)
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/food', require('./routes/food'));

app.get('/', (req, res) => {
  res.json({ message: 'FoodShare API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
