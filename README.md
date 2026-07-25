# WE-ALIVE 💚

A simple daily check-in application that helps family, friends, and colleagues know you're okay without requiring constant conversations.

## The Problem

Many people care about each other but don't regularly check in. When someone goes silent for days, loved ones often become worried and start making calls, sending messages, or assuming the worst.

**WE-ALIVE** solves this with a single tap.

Users connect with the people they care about and check in once every 24 hours. A quick tap of the **"I'm Alive"** button lets their connections know they're safe and well.

---

## How It Works

1. Sign up and log in.
2. Connect with family, friends, or colleagues.
3. Open the app and tap the large green **"I'm Alive"** button.
4. Your connected contacts receive a notification that you've checked in.
5. Your 24-hour timer resets.
6. Repeat once a day.

That's it.

No lengthy conversations. No awkward check-ins. Just peace of mind.

---

## Key Features

### 🔐 Authentication

* User registration
* Secure login
* JWT authentication
* Protected routes

### 👥 Connections

* Send connection requests
* Accept or decline requests
* Manage connections
* View connected users

### 💚 Daily Check-In

* One-tap "I'm Alive" button
* 24-hour countdown timer
* Automatic check-in timestamp tracking
* Check-in history

### 🔔 Notifications

* Notify all connected users
* Real-time updates
* Push notifications (future release)
* Email notifications (optional)

### 📊 Status Monitoring

* Last check-in timestamp
* Time since last activity
* Active status indicators
* Overdue check-in indicators

---

## Example User Experience

When a user logs in, they are greeted with a simple dashboard:

```text
💚 WE-ALIVE

Last Check-In:
Today at 08:15

Next Check-In Due:
23h 42m remaining

[ I'M ALIVE ]
```

When the button is pressed:

```text
✓ Check-In Successful

Your connections have been notified.
Next check-in due in 24 hours.
```

Connected users receive a notification:

```text
Amukelani checked in and is safe.

Last Active:
08:15 AM
```

---

## Tech Stack

### Frontend

* Angular CLI 18.2.12
* Angular 18
* TypeScript
* RxJS
* Angular Signals
* Bootstrap or Angular Material

### Backend

* Node.js 22.2.0
* Express.js
* JWT Authentication
* REST API

### Database

* PostgreSQL

### Real-Time Features

* Socket.IO

### Notifications

* Firebase Cloud Messaging (FCM)
* Email Service (optional)

---

## Database Design

### Users

```sql
users
-----
id
first_name
last_name
email
password_hash
profile_picture
created_at
updated_at
```

### Connections

```sql
connections
-----------
id
sender_id
receiver_id
status
created_at
```

Status values:

* pending
* accepted
* declined

### Check-Ins

```sql
check_ins
---------
id
user_id
checked_in_at
```

### Notifications

```sql
notifications
-------------
id
recipient_id
sender_id
message
is_read
created_at
```

---

## Project Structure

```text
we-alive/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── shared/
│   │   ├── features/
│   │   └── core/
│   │
│   └── assets/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── models/
│   └── config/
│
└── database/
    └── migrations/
```

---

## Installation

### Frontend

```bash
cd frontend

npm install

ng serve
```

Runs on:

```text
http://localhost:4200
```

### Backend

```bash
cd backend

npm install

npm run dev
```

Runs on:

```text
http://localhost:3000
```

---

## Future Enhancements

### Version 2

* Push notifications
* Mobile application
* Emergency contacts
* Daily streaks
* Wellness reminders

### Version 3

* Smart inactivity detection
* Location sharing (optional)
* SOS emergency button
* AI-powered wellness insights

---

## Vision

WE-ALIVE isn't a messaging app.

It's a digital heartbeat for the people who care about you.

A single tap every day can eliminate unnecessary worry and reassure your loved ones that you're safe.

**One tap. One notification. Peace of mind. 💚**
