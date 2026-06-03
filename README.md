# 🏢 StudyNook – Online Room Booking Management System

StudyNook is a full-stack room booking platform that helps users discover, reserve, and manage study spaces through a centralized and user-friendly system.

## 🔗 Live Demo

**Frontend:**
https://studynook-client-side.vercel.app

**Backend API:**
https://study-nook-server-side.onrender.com

---

## 📌 Project Overview

Finding a quiet and suitable study environment can be challenging for students, researchers, freelancers, and remote workers. StudyNook provides a centralized platform where users can browse available study rooms, make reservations, manage bookings, and publish their own study space listings.

---

## 🎯 Problem Solved

StudyNook solves the difficulty of finding and booking quiet study spaces by providing a platform where users can:

* Discover available study rooms
* Search and filter rooms based on preferences
* Reserve study spaces efficiently
* Manage bookings from a personalized dashboard
* Publish and manage their own room listings

---

## 👥 Target Users

* Students
* Researchers
* Freelancers
* Remote Workers
* Library Visitors
* Anyone needing a quiet study or work environment

---

## 🛠️ Tech Stack

| Category         | Technologies                                          |
| ---------------- | ----------------------------------------------------- |
| Frontend         | Next.js, React.js, Tailwind CSS, Axios, Framer Motion |
| Backend          | Node.js, Express.js                                   |
| Database         | MongoDB Atlas                                         |
| Authentication   | Firebase Authentication, JWT                          |
| Deployment       | Vercel, Render                                        |
| Additional Tools | Cookie Parser, CORS                                   |

---

## ✨ Features

### Authentication

* Secure Firebase Authentication
* JWT HTTP-only cookie authentication
* Google OAuth Login
* Protected routes

### Room Management

* Add new room listings
* Update existing listings
* Delete owned listings
* View room details

### Search & Filtering

* Search by room name
* Filter by amenities
* Filter by floor
* Filter by price range

### Booking System

* Create room bookings
* Prevent overlapping bookings
* View personal bookings
* Cancel bookings
* Automatic booking count updates

### User Dashboard

* My Listings
* My Bookings
* Personalized user experience

### Responsive Design

* Mobile-friendly interface
* Responsive layouts
* Modern dark-themed UI

---



## 👤 User Role

### User

Users can:

* Register an account
* Login using Email/Password
* Login using Google OAuth
* Browse study rooms
* Search and filter rooms
* Book study rooms
* Cancel bookings
* Add room listings
* Manage their own listings

---

## 🗄️ Database Structure

### Collections

* users
* rooms
* bookings

---

## 🔌 API Endpoints

### Authentication

```http
POST /jwt
POST /logout
```

### Users

```http
POST /users
```

### Rooms

```http
GET /rooms
GET /rooms/latest
GET /rooms/:id
POST /rooms
PATCH /rooms/:id
DELETE /rooms/:id
GET /my-listings
```

### Bookings

```http
POST /bookings
GET /bookings
PATCH /bookings/:id/cancel
```

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/Avishek-Pratyay/StudyNook-client-side.git
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env.local` file and configure the following variables:

```env
VITE_API_URL=
VITE_FIREBASE_API_KEY=
MONGODB_URI=
JWT_SECRET=
```

Fill them with your own credentials.

---

## 🧪 Demo Credentials

### Email Login

```text
Email: demo@studynook.com
Password: Demo123@
```

### Alternative

Use Google Login.

> Replace the demo credentials with a real account if required.

---

## ✅ Manual Test Cases

### Authentication

* Register a new account
* Login using Email/Password
* Login using Google OAuth
* Logout successfully

### Rooms

* Add a new room listing
* Edit own room listing
* Delete own room listing
* View room details

### Search & Filtering

* Search room by name
* Filter by amenities
* Filter by hourly rate
* Filter by floor

### Booking

* Create booking successfully
* Prevent overlapping bookings
* View personal bookings
* Cancel booking

### Authorization

* Access private routes without login
* Prevent editing/deleting rooms owned by another user

---

## ⚠️ Known Limitations

* No payment gateway integration
* No email notification system
* No room availability calendar view
* Limited admin management features
* Google login requires Firebase configuration

---

## 🚀 Future Improvements

* Admin dashboard
* Stripe payment integration
* Booking approval workflow
* Email notifications
* User reviews and ratings
* Room availability calendar
* Advanced analytics dashboard
* Better Auth migration
* Complete Dark/Light theme support
* Real-time booking updates using WebSockets or Firebase Realtime Database

---

## 📁 Repositories

### Client

https://github.com/Avishek-Pratyay/StudyNook-client-side

### Server

https://github.com/Avishek-Pratyay/StudyNook-server-side

---

## 👨‍💻 Author

**Avishek Chanda Pratyay**

Portfolio: https://avishekp.netlify.app/

LinkedIn: http://www.linkedin.com/in/avishek-chanda

GitHub: https://github.com/Avishek-Pratyay

---

⭐ If you find this project useful, consider giving it a star.
