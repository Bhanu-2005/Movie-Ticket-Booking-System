import requests
import json
import uuid

BASE_URL = "http://127.0.0.1:8001"

# Generate unique values
unique_id = str(uuid.uuid4())[:8]
user_data = {
    "name": "Test User",
    "email": f"test_{unique_id}@example.com",
    "phone": "1234567890",
    "password": "password123"
}

print("Testing API endpoints including Booking and Payments on port 8001...")

# 1. Register User
print("\n--- 1. Register User ---")
res = requests.post(f"{BASE_URL}/auth/register", json=user_data)
print(f"Status: {res.status_code}, Response: {res.text}")

# 2. Login
print("\n--- 2. Login User ---")
login_data = {
    "email": user_data["email"],
    "password": user_data["password"]
}
res = requests.post(f"{BASE_URL}/auth/login", json=login_data)
print(f"Status: {res.status_code}, Response: {res.text}")
if res.status_code == 200:
    token = res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
else:
    print("Login failed, aborting further tests.")
    exit(1)

# 3. List Movies
res = requests.get(f"{BASE_URL}/movies/", headers=headers)
movies = res.json().get("data", [])
movie_id = movies[0]["id"] if movies else None

# 4. List Theatres
res = requests.get(f"{BASE_URL}/theatres/", headers=headers)
theatres = res.json().get("data", [])
theatre_id = theatres[0]["id"] if theatres else None

# 5. List Screens
res = requests.get(f"{BASE_URL}/screens/", headers=headers)
screens = res.json().get("data", [])
screen_id = screens[0]["id"] if screens else None

# 6. List Shows
res = requests.get(f"{BASE_URL}/shows/", headers=headers)
shows = res.json().get("data", [])
show_id = shows[0]["id"] if shows else None

# 7. Create Booking
print("\n--- 7. Create Booking ---")
booking_id = None
if show_id:
    # Use random seats to avoid duplication
    booking_data = {
        "show_id": show_id,
        "seats": [f"S{unique_id[:2]}", f"S{unique_id[2:4]}"],
        "total_amount": 500.0
    }
    res = requests.post(f"{BASE_URL}/bookings/", json=booking_data, headers=headers)
    print(f"Status: {res.status_code}, Response: {res.text}")
    if res.status_code == 201:
        # Extract booking_id correctly based on new response format
        booking_id = res.json().get("data", {}).get("id")
else:
    print("Skipping Booking (no show_id)")

# 8. Create Payment
print("\n--- 8. Create Payment ---")
if booking_id:
    payment_data = {
        "booking_id": booking_id,
        "payment_method": "Credit Card"
    }
    res = requests.post(f"{BASE_URL}/payments/", json=payment_data, headers=headers)
    print(f"Status: {res.status_code}, Response: {res.text}")
else:
    print("Skipping Payment (no booking_id)")

print("\nTests finished.")
