# E-Buddy Backend Repository

A robust backend service built with Express.js and Firebase for user data management and authentication.

## Features

- Express.js framework with TypeScript for type safety and better developer experience
- Firebase Firestore integration for scalable and reliable data storage
- JWT-based authentication system for secure user sessions
- RESTful API endpoints for comprehensive user management
- Middleware for authentication and request validation
- Structured project organization following clean architecture principles

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

### Authentication

- `POST /api/users/login` - User login (returns JWT token)
- `POST /api/users/create` - User registration (returns user data and JWT token)

### User Management

- `GET /api/fetch-user-data` - Fetch current user profile (requires authentication)
- `PUT /api/update-user-data/:id` - Update user data (requires authentication)

## Setup

1. Install dependencies:

   ```
   pnpm install
   ```

2. Create a `.env` file based on `.env.example` and add your Firebase credentials and JWT secret:

   ```
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   FIREBASE_APP_ID=your_firebase_app_id
   JWT_SECRET=your_jwt_secret_key
   ```

3. Run the development server:
   ```
   pnpm dev
   ```

## Authentication Flow

1. **Registration**: When a user registers, the system:

   - Validates the input data
   - Creates a new user in the database
   - Generates a JWT token containing the user's ID, email, and role
   - Returns both the user data and token in the response

2. **Login**: When a user logs in, the system:

   - Validates credentials against the database
   - Generates a JWT token if authentication is successful
   - Returns both the user data and token in the response

3. **Protected Routes**: For protected endpoints:
   - The `authMiddleware` verifies the JWT token from the request headers
   - If valid, the request proceeds with the user's context
   - If invalid, a 401 Unauthorized response is returned

## Error Handling

The API implements consistent error handling with appropriate HTTP status codes and descriptive error messages for better client-side debugging.

## Security Considerations

- Passwords are never returned in API responses
- JWT tokens are signed with a secure algorithm (HS256)
- Tokens have a defined expiration time (1 day by default)
- Environment variables are used for sensitive configuration

## Development

To run the tests:

```
pnpm test
```

To build for production:

```
pnpm build
```

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
