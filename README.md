# Lead Management Dashboard

A full-stack CRM dashboard for managing leads with analytics. Built with React, Node.js, Express, and MongoDB.

## 🚀 **IMPORTANT: Read Before Accessing**

**⚠️ Backend needs to wake up first!** (Render free tier spins down after inactivity)

**Step 1: Wake up backend server**  
Visit: [https://lead-management-backend-dpcw.onrender.com](https://lead-management-backend-dpcw.onrender.com)  
Wait 30 seconds until you see API response

**Step 2: Access frontend**  
URL: [https://lead-managemnt.netlify.app/](https://lead-managemnt.netlify.app/)

## 📍 Live Links
- **Frontend**: [https://lead-managemnt.netlify.app/](https://lead-managemnt.netlify.app/)
- **Backend API**: [https://lead-management-backend-dpcw.onrender.com](https://lead-management-backend-dpcw.onrender.com)
- **Frontend Code**: [GitHub](https://github.com/Priyankanegi28/Lead-Management-frontend)
- **Backend Code**: [GitHub](https://github.com/Priyankanegi28/Lead-Management-backend)

## 🔑 Demo Credentials
```
Email: admin@example.com
Password: password123
```

## ✨ Features
- ✅ User authentication (JWT)
- ✅ Dashboard with analytics charts
- ✅ Leads management with search/filter/sort
- ✅ Mobile responsive design
- ✅ 500+ sample leads generation
- ✅ Deployed on Netlify + Render

## 🛠️ Tech Stack
- **Frontend**: React, Material-UI, Recharts
- **Backend**: Node.js, Express, MongoDB
- **Database**: MongoDB Atlas
- **Hosting**: Netlify (Frontend), Render (Backend)

## 📋 API Endpoints
- `POST /api/auth/login` - User login
- `GET /api/leads` - Get leads with pagination
- `GET /api/leads/analytics` - Get dashboard analytics
- `POST /api/leads/seed` - Generate sample data

## 🚀 Local Setup

### 1. Backend Setup
```bash
git clone https://github.com/Priyankanegi28/Lead-Management-backend.git
cd Lead-Management-backend
npm install

# Create .env file with:
# MONGODB_URI=your_mongodb_connection
# JWT_SECRET=your-secret-key
# PORT=5000

node seed.js  # Create admin user
npm run dev   # Start server
```

### 2. Frontend Setup
```bash
git clone https://github.com/Priyankanegi28/Lead-Management-frontend.git
cd Lead-Management-frontend
npm install

# Create .env file with:
# REACT_APP_API_URL=http://localhost:5000

npm start  # Start React app
```

## 📱 Pages
1. **Login Page** - Authentication
2. **Dashboard** - Analytics with charts
3. **Leads Page** - Manage leads with filters
4. **Lead Details** - View individual lead info

## 🎯 Key Functionalities
- Search leads by name/email/company
- Filter by status and source
- Pagination (10, 25, 50 rows per page)
- Sort by any column
- View lead details
- Generate sample data

## 🔧 Deployment
- **Frontend**: Netlify (CI/CD from GitHub)
- **Backend**: Render (Free tier with cold starts)
- **Database**: MongoDB Atlas (Free tier)
