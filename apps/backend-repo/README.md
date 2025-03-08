# Backend Repository

A backend service built with Express.js and Firebase for user data management.

## Features

- Express.js framework with TypeScript
- Firebase Firestore integration
- Authentication middleware
- RESTful API endpoints for user management
- Structured project organization

## Directory Structure

```
backend-repo/
├── config/
│   └── firebaseConfig.ts - Firebase initialization
├── controller/
│   └── api.ts - API request handlers
├── core/
│   └── app.ts - Express application setup
├── entities/
│   └── user.ts - User data interfaces
├── middleware/
│   └── authMiddleware.ts - Authentication middleware
├── repository/
│   └── userCollection.ts - Firestore data access
├── routes/
│   └── userRoutes.ts - API route definitions
└── package.json - Project dependencies
```

## API Endpoints

- `GET /api/users` - Fetch all users
- `GET /api/users/:id` - Fetch user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user data
- `DELETE /api/users/:id` - Delete a user

## Setup

1. Install dependencies:
   ```
   pnpm install
   ```

2. Create a `.env` file based on `.env.example` and add your Firebase credentials.

3. Run the development server:
   ```
   pnpm dev
   ```

4. For production build:
   ```
   pnpm build
   pnpm start
   ```

## Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Set up Firestore database
3. Generate a service account key from Project Settings > Service Accounts
4. Save the key file securely and reference it in your application

## Authentication

All API endpoints are protected with Firebase authentication. Include an authorization header with a valid Firebase ID token:

```
Authorization: Bearer <your-firebase-id-token>
```
