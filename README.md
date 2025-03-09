# E-Buddy Home Assignment

A full-stack web application featuring user authentication, profile management, and a clean architecture. This monorepo contains both frontend and backend applications.

## Project Overview

This project demonstrates a modern web application with:

- **JWT-based Authentication**: Secure user registration and login flows
- **User Profile Management**: View and update user information
- **Clean Architecture**: Separation of concerns between frontend and backend
- **Modern Tech Stack**: Next.js, Redux, Express, Firebase, and TypeScript

## Repository Structure

```
ebuddy-home-assignment/
├── apps/
│   ├── backend-repo/      # Express.js backend API
│   └── frontend-repo/     # Next.js frontend application
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm/yarn
- Firebase account (for backend)

### Installation and Setup

1. Clone the repository
2. Install dependencies for both applications:

```bash
# Install dependencies for both applications
cd apps/backend-repo
pnpm install
cd ../frontend-repo
pnpm install
```

3. Set up environment variables:

**Backend (.env file in apps/backend-repo)**
```
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
JWT_SECRET=your_jwt_secret_key
```

**Frontend (.env.local file in apps/frontend-repo)**
```
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

4. Start both applications:

```bash
# Start backend (from apps/backend-repo)
pnpm dev

# Start frontend (from apps/frontend-repo)
pnpm dev
```

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001/api

## Key Features

### Authentication Flow

1. **Registration**:
   - User submits registration form with name, email, and password
   - Backend validates the input, creates a new user, and generates a JWT token
   - Frontend stores the token and user data, redirecting to the dashboard

2. **Login**:
   - User submits login credentials
   - Backend validates credentials and generates a JWT token
   - Frontend stores the token and redirects to the dashboard

3. **Protected Routes**:
   - Backend uses middleware to verify JWT tokens for protected endpoints
   - Frontend redirects unauthenticated users to the login page

### Frontend (Next.js + Redux)

- **App Router**: Modern Next.js routing system
- **Redux Toolkit**: State management for authentication and user data
- **Material UI**: Responsive and accessible user interface components
- **TypeScript**: Type safety throughout the application

### Backend (Express + Firebase)

- **Express.js**: RESTful API endpoints
- **Firebase Firestore**: Scalable database for user data
- **JWT Authentication**: Secure token-based authentication
- **TypeScript**: Type safety for better developer experience

## API Endpoints

### Authentication
- `POST /api/users/login` - User login (returns JWT token)
- `POST /api/users/create` - User registration (returns user data and JWT token)

### User Management
- `GET /api/fetch-user-data` - Fetch current user profile (requires authentication)
- `PUT /api/update-user-data/:id` - Update user data (requires authentication)

## Recent Enhancements

### User Registration Flow Improvement

The registration flow has been enhanced to eliminate redundant API calls:

1. When a user successfully registers, the backend now returns both the user data and a JWT token in a single response
2. The frontend stores this information directly, avoiding an additional API call to fetch user data
3. This optimization improves performance and user experience during the registration process

## Development

### Backend

```bash
cd apps/backend-repo

# Run development server
pnpm dev

# Build for production
pnpm build
```

### Frontend

```bash
cd apps/frontend-repo

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Security Considerations

- Passwords are never returned in API responses
- JWT tokens are signed with a secure algorithm (HS256)
- Tokens have a defined expiration time (1 day by default)
- Environment variables are used for sensitive configuration

## Deployment

Both applications can be deployed separately:

- **Frontend**: Deploy to Vercel, Netlify, or any other Next.js-compatible hosting
- **Backend**: Deploy to Cloud Functions, Heroku, or any Node.js hosting service

## License

[MIT](LICENSE)
