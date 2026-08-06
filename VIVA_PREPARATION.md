# Viva Preparation Guide: Movie Ticket Booking System

This document is designed to help you prepare for your viva by explaining the core architecture, key logic, and important APIs of your Movie Ticket Booking System.

---

## 1. System Architecture

Your project is built using a modern **Client-Server architecture**.
*   **Frontend (Client):** Built with **React** and **Vite**, styled with **Tailwind CSS**. It handles the user interface, routing (via React Router), and state management.
*   **Backend (Server):** Built with **FastAPI** (Python). It handles the business logic, API endpoints, and data validation (using Pydantic).
*   **Database:** **MongoDB** (NoSQL), accessed asynchronously via Motor.

**Why this stack?**
*   *FastAPI* is extremely fast and provides automatic API documentation (Swagger).
*   *React* allows for building dynamic, single-page applications (SPAs) smoothly.
*   *MongoDB* provides flexibility for storing complex nested data without strict schemas.

---

## 2. Core Workflows & Key Logic

Be prepared to explain how these specific processes work behind the scenes.

### A. The Booking Flow (How a user books a ticket)
**Flow:** User selects Movie -> Selects Show (Date/Time/Screen) -> Selects Seats -> Pays -> Booking Confirmed.

**Key Logic (Concurrency & Seat Validation):**
When a user attempts to book a seat, the backend must ensure that the seat hasn't *just* been booked by someone else. 
*   **Code Location:** `backend/app/services/booking_service.py` -> `create_booking`
*   **How it works:** 
    1. The API receives the `show_id` and the requested `seats` array.
    2. It queries the `bookings` collection for all existing `CONFIRMED` bookings for that specific `show_id`.
    3. It gathers all currently booked seats into a single list.
    4. It performs a **Set Intersection** between the user's requested seats and the already booked seats.
    5. If the intersection is not empty, it throws a `400 Bad Request` ("Seats already booked"). Otherwise, it inserts the new booking.

### B. Authentication Flow (Login & Security)
**Flow:** User enters credentials -> Backend verifies -> Backend issues JWT -> Frontend stores JWT and uses it for subsequent requests.

**Key Logic:**
*   **Passwords are NEVER stored in plain text.** They are hashed using `bcrypt` before being saved to MongoDB.
*   **JWT (JSON Web Tokens):** When login is successful, FastAPI generates a JWT containing the user's ID and role (`admin` or `user`).
*   **Code Location:** `backend/app/dependencies/auth_dependency.py`
*   **How it works:** Any protected API route uses `Depends(get_current_user)`. This function extracts the JWT from the `Authorization` header, decodes it, verifies the signature, and checks if the token has expired. If valid, the API proceeds.

### C. Admin Show Creation & Deduplication
**Flow:** Admin selects Movie, Theater, Screen, Date, and Time to create a show.

**Key Logic:**
*   A physical screen can only play one movie at a specific date and time.
*   **Code Location:** `backend/app/services/show_service.py` -> `add_show`
*   **How it works:** Before inserting a new show, the backend queries the database for an existing show with the exact same `screen_id`, `show_date`, and `show_time`. If one exists, it rejects the request to prevent double-booking the theater screen.

---

## 3. Important Database Collections

Since it's MongoDB, data is stored in collections of JSON-like documents.

1.  **Users:** Stores `email`, `hashed_password`, `name`, and `role` (admin/customer).
2.  **Movies:** Stores movie metadata (`title`, `description`, `duration`, `genre`, `poster_url`).
3.  **Theatres & Screens:** A Theater has an ID, and Screens reference that `theatre_id`. Screens hold the `total_seats` capacity.
4.  **Shows:** The central link. A show connects a `movie_id`, `theatre_id`, and `screen_id` to a specific `show_date`, `show_time`, and `ticket_price`.
5.  **Bookings:** Links a `user_id` to a `show_id`. Contains an array of booked `seats`, `total_amount`, and `booking_status`.

---

## 4. Crucial APIs to Know

If asked to explain how the frontend talks to the backend, mention these key FastAPI endpoints:

### User / Auth Endpoints
*   `POST /auth/register`: Hashes the password and creates a new user document.
*   `POST /auth/login`: Verifies the password against the hash and returns a JWT access token.

### Show Endpoints
*   `GET /shows/`: Fetches all active shows. The frontend then filters this list based on the selected `movie_id` to display available times to the user.
*   `POST /shows/` (Admin Only): Creates a new show instance. Validates that the screen, theater, and movie ObjectIds actually exist in the database before creation.

### Booking Endpoints
*   `POST /bookings/`: The most critical endpoint. Expects a `show_id` and a list of `seats`. It runs the overlap validation logic mentioned above and saves the booking.
*   `GET /bookings/my-bookings`: Identifies the user via their JWT token and fetches only the bookings associated with their specific `user_id`.

---

## 5. Potential Viva Questions & Answers

**Q: Why did you use React instead of plain HTML/JS?**
*A: React allows for a component-based architecture, making it easier to reuse UI elements (like Movie Cards or Inputs). It also handles state efficiently without needing to reload the page, providing a seamless user experience.*

**Q: How do you handle security in your API?**
*A: We use JWT (JSON Web Tokens) for stateless authentication. Passwords are encrypted using bcrypt. Admin routes have a specific dependency (`get_current_admin`) that decodes the JWT and ensures the `role` is set to admin before granting access.*

**Q: What happens if two users try to book the exact same seat at the exact same time?**
*A: While standard MongoDB inserts don't lock the table, our API performs a real-time check of previously confirmed bookings just milliseconds before inserting the new one. (For absolute production-level safety, a database transaction or a brief lock on the specific show document would be used).*

**Q: How is data linked in MongoDB since there are no foreign keys?**
*A: We use `ObjectId` references. For example, a Booking document stores the `show_id` and `user_id` as ObjectIds. When we need full details on the frontend, we use these IDs to fetch the related data from other endpoints.*
