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