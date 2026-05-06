# CRM Lead Management System - Backend

## Setup Instructions

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update `MONGO_URI` with your MongoDB connection string
   - Set a secure `JWT_SECRET`

4. Start MongoDB (if running locally):
   ```
   mongod
   ```

5. Run the server:
   ```
   npm run dev
   ```

The server will run on `http://localhost:5000`.

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email and password

### Leads
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create a new lead
- `GET /api/leads/:id` - Get a single lead
- `PUT /api/leads/:id` - Update a lead
- `DELETE /api/leads/:id` - Delete a lead

### Notes
- `GET /api/leads/:id/notes` - Get notes for a lead
- `POST /api/leads/:id/notes` - Add a note to a lead

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Default User
- Email: admin@example.com
- Password: password123