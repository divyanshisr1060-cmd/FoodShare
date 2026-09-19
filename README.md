# FoodShare 🍽️ — Surplus Food Redistribution Platform

> A full-stack web application connecting restaurants, banquet halls, caterers, and organizations with surplus edible food to NGOs and volunteers who collect and distribute it to communities in need.

---

## 📌 Table of Contents
1. [Overview & Purpose](#overview--purpose)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [Architecture & Project Structure](#architecture--project-structure)
5. [Database Design (MongoDB)](#database-design-mongodb)
6. [REST API Documentation](#rest-api-documentation)
7. [Authentication & Security](#authentication--security)
8. [Environment Variables](#environment-variables)
9. [Installation & Setup Guide](#installation--setup-guide)
10. [User Workflows & Feature Guide](#user-workflows--feature-guide)

---

## 🌟 Overview & Purpose

Around one-third of all food produced globally goes to waste, while millions face food insecurity. **FoodShare** bridges this gap by providing a real-time coordination platform:
- **Donors** (restaurants, hotels, event organizers) list fresh surplus food with pickup windows and quantity.
- **NGOs & Volunteers** browse available listings in real-time, claim food packets, and organize transport to feed underprivileged communities.

---

## 🚀 Key Features

* 🔐 **Secure Authentication**: Multi-role registration (`Donor`, `NGO`, `Volunteer`) with JWT-based session management and bcrypt password hashing.
* 📦 **Surplus Food Listing Creation**: Donors can list surplus meals, raw ingredients, bakery items, or beverages with pickup address, quantity, and expiry details.
* 🔍 **Interactive Food Catalog**: Real-time search across titles, descriptions, and pickup locations, plus instant category filtering (Cooked, Raw, Packaged, Beverages).
* 🤝 **One-Click Claiming**: Verified NGOs and volunteers can claim available listings to prevent duplicate pickups.
* 📊 **Donor & Claimer Dashboard**:
  - Live metric counters (Total Listings, Available, Claimed, Claims Made).
  - Tabbed interface to manage donated food items and track claimed food deliveries.
  - Ability to delete listings or mark claimed food as collected.
* 📱 **Modern Responsive UI**: Clean, mobile-friendly interface built with React, CSS3 Flexbox/Grid, and responsive sticky navigation.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, React Router v6, Context API, Vite, CSS3 (Custom Responsive Layouts) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas / Local MongoDB, Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt.js password hashing |
| **API Architecture** | RESTful JSON API with CORS and JWT bearer protection |

---

## 📁 Architecture & Project Structure

```text
FoodShare/
├── .gitignore                      # Git ignore rules for node_modules and .env
├── README.md                       # Complete project documentation
│
├── client/                         # React Frontend (Vite)
│   ├── index.html                  # HTML entry template
│   ├── package.json                # Frontend dependencies & scripts
│   ├── vite.config.js              # Vite server & proxy configuration (/api -> :5000)
│   └── src/
│       ├── main.jsx                # Application root mounting
│       ├── App.jsx                 # Routes & AuthProvider wrapper
│       ├── App.css                 # Global layout styles
│       ├── index.css               # Global typography & color scheme
│       ├── context/
│       │   └── AuthContext.jsx     # User authentication state & token persistence
│       ├── components/
│       │   ├── Navbar.jsx / .css   # Responsive navigation with role tag & logout
│       │   ├── Footer.jsx / .css   # 4-column informational footer
│       │   └── FoodCard.jsx / .css # Reusable food item card with claim/status actions
│       └── pages/
│           ├── Home.jsx / .css     # Landing page with stats, steps, and roles
│           ├── Login.jsx / .css    # Sign-in form with error validation
│           ├── Register.jsx / .css # Sign-up form with role selector
│           ├── Dashboard.jsx / .css# Metric cards, listing form, and tabbed items
│           ├── AvailableFood.jsx / .css # Browse catalog with live search & filters
│           └── About.jsx / .css    # Mission, global hunger stats, and vision
│
└── server/                         # Node.js + Express Backend
    ├── server.js                   # Express application entry & middleware
    ├── package.json                # Backend dependencies
    ├── .env.example                # Sample environment configuration
    ├── config/
    │   └── db.js                   # Mongoose connection with resilient DNS resolver
    ├── middleware/
    │   └── auth.js                 # JWT verification & request user population
    ├── models/
    │   ├── User.js                 # User schema with bcrypt pre-save hook
    │   └── FoodListing.js          # Food listing schema with donor/claimedBy refs
    └── routes/
        ├── auth.js                 # Auth endpoints (register, login, me)
        └── food.js                 # Food CRUD, claim, and status endpoints
```

---

## 🗄️ Database Design (MongoDB)

### 1. `User` Schema
| Field | Type | Required | Description |
|---|---|---|---|
| `name` | String | Yes | Full name of contact person |
| `email` | String | Yes (Unique) | Account email address |
| `password` | String | Yes | Hashed with bcrypt (salt rounds: 10) |
| `role` | String | Yes | Enum: `'donor'`, `'ngo'`, `'volunteer'` |
| `organization`| String | No | Company, hotel, or foundation name |
| `phone` | String | No | Contact phone number |
| `address` | String | No | Location address |
| `createdAt` / `updatedAt` | Date | Auto | Timestamps |

### 2. `FoodListing` Schema
| Field | Type | Required | Description |
|---|---|---|---|
| `title` | String | Yes | Food item title (e.g., "Veg Biryani & Raita") |
| `description` | String | Yes | Description of food and serving size |
| `quantity` | String | Yes | Servings or weight (e.g., "40 meals / 10 kg") |
| `category` | String | Yes | Enum: `'cooked'`, `'raw'`, `'packaged'`, `'beverages'`, `'other'` |
| `expiryDate` | String | Yes | Expiry / best before timing |
| `pickupAddress`| String | Yes | Physical address for food pickup |
| `pickupTime` | String | Yes | Window for collection (e.g. "4:00 PM - 7:00 PM") |
| `status` | String | Yes | Enum: `'available'`, `'claimed'`, `'collected'` |
| `donor` | ObjectId | Yes | Reference to `User` (Donor creator) |
| `claimedBy` | ObjectId | No | Reference to `User` (Claiming NGO/Volunteer) |
| `createdAt` / `updatedAt` | Date | Auto | Timestamps |

---

## 📡 REST API Documentation

### Authentication Endpoints (`/api/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new user; returns JWT token & profile |
| `POST` | `/api/auth/login` | Public | Authenticate user; returns JWT token & profile |
| `GET` | `/api/auth/me` | Private | Retrieve logged-in user profile from token |

### Food Listing Endpoints (`/api/food`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/food` | Public | List all food with optional `?category=&search=&status=` |
| `GET` | `/api/food/my-listings` | Private | Get listings created by the logged-in donor |
| `GET` | `/api/food/my-claims` | Private | Get listings claimed by the logged-in user |
| `GET` | `/api/food/:id` | Public | Get single food listing details |
| `POST` | `/api/food` | Private | Create a new food listing |
| `PUT` | `/api/food/:id` | Private (Owner) | Update an existing food listing |
| `DELETE`| `/api/food/:id` | Private (Owner) | Delete a food listing |
| `PUT` | `/api/food/:id/claim` | Private | Claim an available food listing |
| `PUT` | `/api/food/:id/unclaim`| Private (Claimer)| Cancel claim on a food listing |
| `PUT` | `/api/food/:id/status` | Private | Update listing status (e.g., to `'collected'`) |

---

## 🔒 Authentication & Security

1. **Password Hashing**: Passwords are never stored in plain text. A Mongoose `pre('save')` hook utilizes `bcryptjs` to generate salt rounds and hash passwords.
2. **JWT Authorization**: Requests to protected routes send `Authorization: Bearer <token>` in headers. The `protect` middleware verifies the signature and attaches the sanitized user object (`req.user`) to the request.
3. **Environment Isolation**: Database connection URIs and JWT secrets reside exclusively in `server/.env` and are strictly excluded from version control via `.gitignore`.

---

## ⚙️ Environment Variables

Create a file named `.env` inside the `server/` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/foodshare?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
```

*(For local MongoDB installations, set `MONGO_URI=mongodb://localhost:27017/foodshare`).*

---

## 💻 Installation & Setup Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer)
- MongoDB Atlas account or local MongoDB instance
- Git

### 1. Clone & Setup Backend
```bash
# Navigate to server directory
cd server

# Install backend dependencies
npm install

# Start backend server
npm run dev
# (or: node server.js)
```
*Backend runs on: `http://localhost:5000`*

### 2. Setup Frontend
```bash
# In a new terminal, navigate to client directory
cd client

# Install frontend dependencies
npm install

# Start Vite frontend development server
npm run dev
```
*Frontend runs on: `http://localhost:3000`*

---

## 🎯 User Workflows & Feature Guide

### 1. Donor Workflow (Restaurants / Catering / Individuals)
1. Navigate to **Register** and choose the **Donor** role.
2. Log in and go to the **Dashboard**.
3. Click **+ Add New Listing** and fill in food details (Title, Category, Quantity, Expiry, Address, Pickup window).
4. Click **Publish Listing** — the item instantly appears in the public catalog and in your dashboard.
5. Track status as NGOs claim it, and mark as **Collected** once picked up.

### 2. NGO & Volunteer Workflow
1. Navigate to **Register** and choose **NGO** or **Volunteer**.
2. Visit **Available Food** to browse surplus food in your city.
3. Filter by category (e.g., *Cooked Food*) or search by location.
4. Click **Claim** on any available food listing.
5. Visit your **Dashboard** -> **Food I Claimed** to review pickup instructions and contact the donor.

---

## 📜 License
This project is open source and available under the [MIT License](LICENSE).
