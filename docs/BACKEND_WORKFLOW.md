# 🚀 Backend Workflow & Frontend-Backend Integration Guide

## 📋 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [How Frontend Connects to Backend](#how-frontend-connects-to-backend)
3. [Complete Request-Response Flow](#complete-request-response-flow)
4. [Real-World Examples](#real-world-examples)
5. [Authentication Flow](#authentication-flow)
6. [Data Population (MongoDB)](#data-population-mongodb)
7. [API Endpoints Reference](#api-endpoints-reference)

---

## 🏗️ Architecture Overview

Your Travel & Tourism app uses a **client-server architecture** with these layers:

```mermaid
graph TB
    subgraph "Frontend (React + Vite)"
        A[User Interface]
        B[React Components]
        C[API Client - api.js]
        D[LocalStorage]
    end
    
    subgraph "Backend (Node.js + Express)"
        E[Express Server]
        F[Routes]
        G[Middlewares]
        H[Controllers]
        I[Models]
    end
    
    subgraph "Database"
        J[(MongoDB)]
    end
    
    A --> B
    B --> C
    C --> D
    C -->|HTTP Requests| E
    E --> F
    F --> G
    G --> H
    H --> I
    I --> J
    J --> I
    I --> H
    H -->|HTTP Response| C
    C --> B
    B --> A
```

### **Key Components:**

| Component | Location | Purpose |
|-----------|----------|---------|
| **Frontend** | `Frontend/src/` | React app running on port 5173 (Vite dev server) |
| **Backend** | `Backend/` | Express API server running on port 3000 |
| **Database** | MongoDB Atlas | Cloud-hosted MongoDB database |
| **API Client** | `Frontend/src/lib/api.js` | Axios instance for HTTP communication |

---

## 🔗 How Frontend Connects to Backend

### **1. API Client Setup** (`Frontend/src/lib/api.js`)

This is the **bridge** between your React app and Express server:

```javascript
import axios from "axios";

// Create axios instance pointing to backend
const api = axios.create({ 
    baseURL: "http://localhost:3000",  // Backend server URL
});

// Auto-attach JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
```

**What this does:**
- Creates an axios instance that always points to `http://localhost:3000`
- Automatically adds the JWT token to every request header
- Simplifies API calls throughout your app

### **2. Making API Calls**

Your React components use functions from `api.js`:

```javascript
// Example: Fetch destinations
export const getDestinations = async () => {
    const response = await api.get("/destinations");
    return response.data;
};

// Example: Login user
export const loginUser = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
};
```

### **3. Using in React Components**

```javascript
// In Home.jsx or Destinations.jsx
import { getDestinations } from '../lib/api';

const fetchData = async () => {
    const destinations = await getDestinations();
    setDestinations(destinations);
};
```

---

## 🔄 Complete Request-Response Flow

Let's trace what happens when a user loads the destinations page:

```mermaid
sequenceDiagram
    participant U as User Browser
    participant R as React Component
    participant A as API Client (api.js)
    participant E as Express Server
    participant RT as Route Handler
    participant C as Controller
    participant M as Mongoose Model
    participant DB as MongoDB

    U->>R: User visits /destinations page
    R->>A: Call getDestinations()
    A->>E: GET http://localhost:3000/destinations
    E->>RT: Match route in server.js
    RT->>C: Call getDestinations controller
    C->>M: Destination.find().populate()
    M->>DB: Query database
    DB-->>M: Return destination documents
    M-->>C: Return populated data
    C-->>E: res.json(destinations)
    E-->>A: HTTP 200 + JSON data
    A-->>R: Return destinations array
    R->>U: Render destinations on page
```

### **Step-by-Step Breakdown:**

#### **Step 1: User Action**
```javascript
// User visits: http://localhost:5173/destinations
```

#### **Step 2: React Component (`Destinations.jsx`)**
```javascript
useEffect(() => {
    const fetchDestinations = async () => {
        const data = await getDestinations();  // Call API
        setDestinations(data);
    };
    fetchDestinations();
}, []);
```

#### **Step 3: API Client Sends HTTP Request**
```
GET http://localhost:3000/destinations
Headers: {
    Content-Type: application/json
}
```

#### **Step 4: Express Server Receives Request** (`server.js`)
```javascript
app.use('/destinations', require('./routes/destinations'));
```

#### **Step 5: Route Handler** (`Backend/routes/destinations.js`)
```javascript
router.get('/', getDestinations);  // Matches GET /destinations
```

#### **Step 6: Controller Logic** (`Backend/controllers/destination.controller.js`)
```javascript
const getDestinations = async (req, res) => {
    const destinations = await Destination.find()
        .populate('hotels')
        .populate('flights');
    res.json(destinations);  // Send back to frontend
};
```

#### **Step 7: Database Query**
```javascript
Destination.find()  // MongoDB query to get all destinations
    .populate('hotels')  // Replace hotel IDs with full hotel objects
    .populate('flights') // Replace flight IDs with full flight objects
```

#### **Step 8: Response Sent Back**
```json
HTTP 200 OK
Content-Type: application/json

[
    {
        "_id": "123abc",
        "name": "Taj Mahal",
        "city": "Agra",
        "basePrice": 5000,
        "hotels": [
            { "_id": "hotel1", "name": "Taj Hotel", "pricePerNight": 2000 }
        ],
        "flights": [
            { "_id": "flight1", "airline": "Air India", "price": 3000 }
        ]
    }
]
```

#### **Step 9: React Updates UI**
```javascript
setDestinations(data);  // State updates, component re-renders
```

---

## 🌟 Real-World Examples

### **Example 1: User Login Flow**

```mermaid
sequenceDiagram
    participant Browser
    participant Login.jsx
    participant api.js
    participant Express
    participant authController
    participant MongoDB

    Browser->>Login.jsx: User enters email & password
    Login.jsx->>api.js: loginUser(email, password)
    api.js->>Express: POST /auth/login
    Express->>authController: loginUser()
    authController->>MongoDB: User.findOne({ email })
    MongoDB-->>authController: User document
    authController->>authController: bcrypt.compare(password)
    authController->>authController: generateToken(user.id)
    authController-->>Express: { user, token }
    Express-->>api.js: HTTP 200 + JSON
    api.js->>api.js: localStorage.setItem('token')
    api.js-->>Login.jsx: Return user data
    Login.jsx->>Browser: Redirect to home page
```

**Frontend Code** (`Login.jsx`):
```javascript
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const userData = await loginUser(email, password);
        // User data now contains: { _id, name, email, role, token }
        navigate('/');  // Redirect to home
    } catch (error) {
        toast.error('Login failed');
    }
};
```

**API Function** (`api.js`):
```javascript
export const loginUser = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    
    // Save token to localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data));
    
    return response.data;
};
```

**Backend Route** (`Backend/routes/auth.js`):
```javascript
router.post('/login', loginUser);  // Maps to controller
```

**Backend Controller** (`Backend/controllers/auth.controller.js`):
```javascript
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    // 1. Find user in database
    const user = await User.findOne({ email });
    
    // 2. Compare password
    if (user && await bcrypt.compare(password, user.password)) {
        // 3. Generate JWT token
        const token = jwt.sign(
            { id: user._id }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: '30d' }
        );
        
        // 4. Send response
        return res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: 'USER',
            token: token
        });
    }
    
    res.status(400).json({ message: 'Invalid credentials' });
};
```

---

### **Example 2: Creating a Booking (Protected Route)**

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant api.js
    participant Express
    participant authMiddleware
    participant bookingController
    participant MongoDB

    User->>Frontend: Click "Book Now"
    Frontend->>api.js: createBooking(bookingData)
    api.js->>api.js: Add JWT token to headers
    api.js->>Express: POST /bookings + Authorization header
    Express->>authMiddleware: Verify JWT token
    authMiddleware->>MongoDB: Find user by token ID
    MongoDB-->>authMiddleware: User found
    authMiddleware->>authMiddleware: Attach user to req.user
    authMiddleware->>bookingController: Continue to controller
    bookingController->>MongoDB: Create new Booking
    MongoDB-->>bookingController: Booking saved
    bookingController-->>Express: Return booking
    Express-->>api.js: HTTP 201 + booking data
    api.js-->>Frontend: Success
    Frontend->>User: Show success message
```

**Frontend Code**:
```javascript
// In DetailsModal.jsx or similar
const handleBooking = async () => {
    const bookingData = {
        destination: destinationId,
        hotel: selectedHotelId,
        flight: selectedFlightId,
        checkIn: checkInDate,
        checkOut: checkOutDate
    };
    
    await createBooking(bookingData);
    toast.success('Booking created!');
};
```

**API Client** (`api.js`):
```javascript
export const createBooking = async (bookingData) => {
    const response = await api.post("/bookings", bookingData);
    // Token automatically added by interceptor!
    return response.data;
};
```

**Request Headers** (Auto-added by interceptor):
```
POST http://localhost:3000/bookings
Headers: {
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    Content-Type: application/json
}
Body: {
    "destination": "123abc",
    "hotel": "hotel1",
    "flight": "flight1",
    ...
}
```

**Backend Route** (`Backend/routes/bookings.js`):
```javascript
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createBooking);  // Protected route!
```

**Authentication Middleware** (`Backend/middlewares/authMiddleware.js`):
```javascript
const protect = async (req, res, next) => {
    // 1. Extract token from header
    const token = req.headers.authorization.split(' ')[1];
    
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // 3. Find user
    const user = await User.findById(decoded.id);
    
    // 4. Attach to request
    req.user = user;
    
    // 5. Continue to controller
    next();
};
```

**Controller** (`Backend/controllers/booking.controller.js`):
```javascript
const createBooking = async (req, res) => {
    const booking = await Booking.create({
        user: req.user._id,  // From middleware!
        destination: req.body.destination,
        hotel: req.body.hotel,
        flight: req.body.flight,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut
    });
    
    res.status(201).json(booking);
};
```

---

### **Example 3: Admin Creating Destination (Double-Protected)**

```mermaid
sequenceDiagram
    participant Admin
    participant AdminDashboard
    participant api.js
    participant Express
    participant protect
    participant adminMiddleware
    participant adminController
    participant MongoDB

    Admin->>AdminDashboard: Fill destination form
    AdminDashboard->>api.js: POST /admin/destination
    api.js->>Express: + JWT token in header
    Express->>protect: Verify user is logged in
    protect->>MongoDB: Find user by token
    MongoDB-->>protect: User found
    protect->>adminMiddleware: Check if user is admin
    adminMiddleware->>adminMiddleware: req.user.role === 'ADMIN'?
    adminMiddleware->>adminController: Proceed
    adminController->>MongoDB: Create destination
    MongoDB-->>adminController: Destination saved
    adminController-->>Express: Return destination
    Express-->>api.js: HTTP 201
    api.js-->>AdminDashboard: Success
    AdminDashboard->>Admin: Show success toast
```

**Frontend** (`AdminDashboard.jsx`):
```javascript
const handleAddDestination = async (e) => {
    e.preventDefault();
    
    const formData = {
        name: destForm.name,
        city: destForm.city,
        basePrice: destForm.basePrice,
        images: destForm.images
    };
    
    await api.post('/admin/destination', formData);
    toast.success('Destination added!');
};
```

**Backend Route** (`Backend/routes/admin.js`):
```javascript
const { protect } = require('../middlewares/authMiddleware');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

// ALL routes in this file are protected
router.use(protect);          // Must be logged in
router.use(adminMiddleware);  // Must be admin

router.post('/destination', createDestination);
```

**Admin Middleware** (`Backend/middlewares/adminMiddleware.js`):
```javascript
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ 
            message: 'Admin access required' 
        });
    }
    next();
};
```

---

## 🔐 Authentication Flow

### **How JWT (JSON Web Token) Works**

```mermaid
graph LR
    A[User Logs In] --> B[Backend generates JWT]
    B --> C[Frontend stores token in localStorage]
    C --> D[Every request includes token]
    D --> E[Backend verifies token]
    E --> F[Identifies user & permissions]
```

### **Token Structure**

When you log in, backend creates a token:

```javascript
const token = jwt.sign(
    { id: user._id },           // Payload: user ID
    process.env.ACCESS_TOKEN_SECRET,  // Secret key
    { expiresIn: '30d' }        // Token valid for 30 days
);
```

**Decoded Token Example:**
```json
{
    "id": "507f1f77bcf86cd799439011",
    "iat": 1640000000,
    "exp": 1642592000
}
```

### **How Frontend Sends Token**

The interceptor in `api.js` automatically adds it:

```javascript
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});
```

**Actual HTTP Request:**
```
GET /bookings/my HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTY0MDAwMDAwMCwiZXhwIjoxNjQyNTkyMDAwfQ.signature
```

### **Backend Verification**

```javascript
const protect = async (req, res, next) => {
    // 1. Extract token
    const token = req.headers.authorization.split(' ')[1];
    
    // 2. Verify signature and expiry
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // decoded = { id: "507f1f77bcf86cd799439011" }
    
    // 3. Find user
    const user = await User.findById(decoded.id);
    
    // 4. Make user available to controller
    req.user = user;
    
    next();
};
```

---

## 🗃️ Data Population (MongoDB)

### **What is `.populate()`?**

MongoDB stores **references** (IDs) instead of full objects. `.populate()` replaces IDs with actual data.

**Destination Schema** (`Backend/models/Destination.js`):
```javascript
{
    name: "Taj Mahal",
    city: "Agra",
    hotels: [ObjectId("hotel1"), ObjectId("hotel2")],  // Just IDs!
    flights: [ObjectId("flight1")]
}
```

**Without `.populate()`:**
```javascript
const dest = await Destination.findById(id);
// dest.hotels = ["hotel1", "hotel2"]  ❌ Just IDs
```

**With `.populate()`:**
```javascript
const dest = await Destination.findById(id)
    .populate('hotels')
    .populate('flights');

// dest.hotels = [
//   { _id: "hotel1", name: "Taj Hotel", pricePerNight: 2000 },
//   { _id: "hotel2", name: "ITC Mughal", pricePerNight: 3500 }
// ] ✅ Full objects!
```

### **Example in Your Code**

```javascript
// Backend/controllers/destination.controller.js
const getDestinations = async (req, res) => {
    const destinations = await Destination.find()
        .populate('hotels')   // Replace hotel IDs with hotel objects
        .populate('flights'); // Replace flight IDs with flight objects
    
    res.json(destinations);
};
```

**Frontend receives:**
```json
[
    {
        "_id": "dest1",
        "name": "Taj Mahal",
        "hotels": [
            { "_id": "h1", "name": "Taj Hotel", "pricePerNight": 2000 },
            { "_id": "h2", "name": "ITC Mughal", "pricePerNight": 3500 }
        ],
        "flights": [
            { "_id": "f1", "airline": "Air India", "price": 3000 }
        ]
    }
]
```

---

## 📚 API Endpoints Reference

### **Public Endpoints** (No Authentication)

| Method | Endpoint | Purpose | Request Body |
|--------|----------|---------|--------------|
| `POST` | `/auth/register` | Register new user | `{ name, email, password }` |
| `POST` | `/auth/register-admin` | Register admin | `{ name, email, password }` |
| `POST` | `/auth/login` | Login user/admin | `{ email, password }` |
| `GET` | `/destinations` | Get all destinations | None |
| `GET` | `/destinations/:id` | Get one destination | None |

### **Protected Endpoints** (Requires JWT Token)

| Method | Endpoint | Purpose | Middleware |
|--------|----------|---------|------------|
| `POST` | `/bookings` | Create booking | `protect` |
| `GET` | `/bookings/my` | Get user's bookings | `protect` |
| `POST` | `/reviews` | Create review | `protect` |

### **Admin-Only Endpoints** (Requires JWT + Admin Role)

| Method | Endpoint | Purpose | Middleware |
|--------|----------|---------|------------|
| `POST` | `/admin/destination` | Add destination | `protect` + `adminMiddleware` |
| `PUT` | `/admin/destination/:id` | Update destination | `protect` + `adminMiddleware` |
| `DELETE` | `/admin/destination/:id` | Delete destination | `protect` + `adminMiddleware` |
| `POST` | `/admin/hotel` | Add hotel | `protect` + `adminMiddleware` |
| `POST` | `/admin/flight` | Add flight | `protect` + `adminMiddleware` |
| `GET` | `/admin/bookings` | Get all bookings | `protect` + `adminMiddleware` |
| `PATCH` | `/admin/bookings/:id/complete` | Mark booking complete | `protect` + `adminMiddleware` |
| `DELETE` | `/admin/bookings/:id` | Delete booking | `protect` + `adminMiddleware` |

---

## 🎯 Summary: The Complete Flow

### **When Frontend Needs Data:**

1. **React component** calls function from `api.js`
2. **api.js** sends HTTP request to Express server (port 3000)
3. **Express server** matches URL to route in `routes/` folder
4. **Middleware** (if needed) verifies JWT token and permissions
5. **Controller** processes business logic
6. **Mongoose model** queries MongoDB database
7. **Database** returns data
8. **Controller** sends JSON response back
9. **api.js** receives response
10. **React component** updates state and re-renders UI

### **Key Files:**

```
Frontend:
├── src/lib/api.js              → HTTP client (talks to backend)
├── src/pages/Home.jsx          → Uses api.js functions
└── src/pages/AdminDashboard.jsx

Backend:
├── server.js                   → Entry point, defines routes
├── routes/
│   ├── auth.js                 → /auth/* endpoints
│   ├── destinations.js         → /destinations/* endpoints
│   └── admin.js                → /admin/* endpoints (protected)
├── middlewares/
│   ├── authMiddleware.js       → Verifies JWT
│   └── adminMiddleware.js      → Checks admin role
├── controllers/
│   ├── auth.controller.js      → Login/register logic
│   └── destination.controller.js → Get destinations logic
└── models/
    ├── User.js                 → User database schema
    └── Destination.js          → Destination database schema
```

---

## 💡 Quick Debugging Tips

### **If Frontend Can't Reach Backend:**

1. Check both servers are running:
   - Backend: `npm run dev` in `Backend/` folder
   - Frontend: `npm run dev` in `Frontend/` folder

2. Verify baseURL in `api.js`:
   ```javascript
   baseURL: "http://localhost:3000"  // Must match backend port
   ```

3. Check CORS is enabled in `server.js`:
   ```javascript
   app.use(cors());
   ```

### **If Authentication Fails:**

1. Check token is stored:
   ```javascript
   console.log(localStorage.getItem('token'));
   ```

2. Verify `.env` has `ACCESS_TOKEN_SECRET`

3. Check token hasn't expired (30 days validity)

---

🎉 **That's the complete workflow!** Your frontend and backend communicate through HTTP requests, with JWT tokens for authentication and MongoDB for data storage.
