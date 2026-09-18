# FoodShare 🍽️

FoodShare connects organizations with surplus edible food to NGOs and volunteers who can collect and distribute it.

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Authentication:** JWT
- **API:** RESTful

## Project Structure

```
FoodShare/
├── client/           # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
├── server/           # Express backend
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB

### Run the Frontend

```bash
cd client
npm install
npm run dev
```

### Run the Backend (coming soon)

```bash
cd server
npm install
npm run dev
```

## Features

- User registration & login (Donor / NGO / Volunteer)
- Donors can list surplus food
- NGOs and volunteers can browse and claim food
- Dashboard to manage listings
- Responsive design

## License

MIT
