# CRM Lead Management System

# 🚀 Project Overview

The CRM Lead Management System helps small sales teams efficiently manage potential customers and track sales activities.

The system allows users to:
- Authenticate securely
- Create and manage sales leads
- Track leads through a sales pipeline
- Add notes and follow-up reminders
- Search and filter leads

The application is designed with practical CRM workflows inspired by modern CRM platforms.

---

# 🛠 Tech Stack Used

## Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- Mongoose

## Database
- MongoDB Atlas

---

# ✨ Features Implemented

## 🔐 Authentication
- JWT-based login authentication
- Protected frontend and backend routes
- Default admin user support

---

## 📋 Lead Management
- Create new leads
- View all leads
- Edit leads
- Delete leads
- View detailed lead information
- Update lead statuses

Lead fields include:
- Lead Name
- Company Name
- Email
- Phone Number
- Lead Source
- Assigned Salesperson
- Status
- Estimated Deal Value
- Priority Level
- Follow-Up Date
- Created Date
- Updated Date

---

## 📝 Lead Notes
- Add notes to leads
- View note history
- Track note creator and timestamp

---

## 📊 Dashboard
Dashboard includes:
- Total Leads
- New Leads
- Qualified Leads
- Won Leads
- Lost Leads
- Total Estimated Deal Value
- Total Won Deal Value

---

## 🔍 Search & Filtering
Users can:
- Search leads by:
  - Lead Name
  - Company Name
  - Email
- Filter leads by:
  - Status
  - Lead Source
  - Assigned Salesperson
  - Follow-Up Status

---

# 🌟 Bonus Features Implemented

## 🔥 Lead Priority Scoring
Leads are automatically categorized as:
- Hot
- Warm
- Cold

Based on:
- Deal value
- Recent activity

---

## 🕒 Activity Timeline
Tracks:
- Lead creation
- Status changes
- Updates
- Notes added

---

# 📂 Project Structure

```bash
crm-application/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md

---

# ▶️ How to Run Locally

## 1️⃣ Clone the Repository

```bash
git clone <https://github.com/th4ru/CRM-Application.git>
```

---

## 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3️⃣ Setup Environment Variables

Create a `.env` file inside the `backend` folder and add:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

---

## 4️⃣ Start Backend Server

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

---

## 5️⃣ Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

## 6️⃣ Start Frontend Application

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

# ⚙️ Environment Variables

The backend requires the following environment variables:

| Variable | Description |
|----------|-------------|
| PORT | Backend server port |
| MONGO_URI | MongoDB Atlas connection string |
| JWT_SECRET | Secret key for JWT authentication |

Example:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/crm
JWT_SECRET=mysecretkey
```

---

# 🗄 Database Setup

This project uses MongoDB Atlas as the database.

## Steps:
1. Create a MongoDB Atlas account
2. Create a cluster
3. Create a database user
4. Add IP access:
   - Go to `Network Access`
   - Add:
   
```text
0.0.0.0/0
```

5. Copy your MongoDB connection string
6. Add it to the `.env` file

Example:

```text
mongodb+srv://username:password@cluster.mongodb.net/crm
```

---

# 🔑 Test Login Credentials

Use the following credentials to log into the system:

```text
Email: admin@example.com
Password: password123
```

---

# ⚠️ Known Limitations

- No email integration implemented
- No role-based access control
- Limited reporting/export functionality
- No automated testing included
- Real-time notifications are not implemented
- Kanban drag-and-drop optimization can be improved for larger datasets

---

# 💡 Reflection

This project helped improve my understanding of full-stack application development using React, Node.js, Express, and MongoDB.

During development, I gained hands-on experience with:
- JWT authentication
- REST API development
- MongoDB schema design
- Frontend and backend integration
- State management in React
- Search and filtering logic
- CRM workflow design

One of the biggest challenges was configuring MongoDB Atlas connectivity and handling API integration between the frontend and backend. Implementing lead prioritization and activity tracking also helped me understand practical CRM workflows used in real business environments.

Overall, this project strengthened both my technical and problem-solving skills while improving my understanding of scalable web application architecture.