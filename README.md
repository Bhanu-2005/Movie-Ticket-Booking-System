# Movie Ticket Booking System

A full-stack web application designed for browsing movies, booking tickets, and managing theaters/shows. The project is split into a robust **FastAPI backend** utilizing MongoDB and a dynamic **React + Vite frontend** styled with Tailwind CSS.

## 🚀 Features

### For Customers
- **Browse Movies:** View upcoming and currently showing movies with rich details.
- **Book Tickets:** Select specific theaters, screens, dates, and times.
- **Payment Processing:** Mock payment integration for confirming bookings.
- **My Bookings:** View past and upcoming ticket details in your personalized dashboard.

### For Administrators
- **Dashboard Analytics:** Overview of system stats like total bookings, users, theaters, and revenue.
- **Manage Movies:** Add new movies, upload posters, and edit or remove existing titles.
- **Manage Theaters & Screens:** Add theaters and assign multiple screens with seating capacities.
- **Manage Shows:** Schedule movies to specific screens at specific times with custom pricing.
- **View All Bookings:** Complete visibility into every booking made across the platform.

## 🛠 Tech Stack

**Frontend:**
- React 19 (via Vite)
- Tailwind CSS 4
- React Router DOM
- React Hook Form
- React Hot Toast
- Axios

**Backend:**
- Python (FastAPI)
- MongoDB (Motor Asyncio)
- Pydantic (Data validation)
- Uvicorn (ASGI Server)

---

## 💻 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (3.9+)
- [MongoDB](https://www.mongodb.com/) (running locally or via MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (recommended):
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```
3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the backend development server:
   ```bash
   uvicorn app.main:app --reload
   ```
   > The backend API will be running on `http://localhost:8000`. You can view the Swagger API documentation at `http://localhost:8000/docs`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   > The frontend will be running on `http://localhost:5173`.

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
