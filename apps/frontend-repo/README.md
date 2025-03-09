# E-Buddy Frontend Repository

A modern web application built with Next.js, Redux, and Material UI that provides user authentication and profile management features.

## Features

- Next.js 14 with App Router for optimized routing and server components
- Redux Toolkit for efficient state management
- Material UI for a responsive and accessible user interface
- JWT-based authentication system
- User registration and login flows
- User profile management
- Responsive design for all device sizes

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
frontend-repo/
├── app/                  # Next.js App Router pages and layouts
│   ├── login/           # Login page
│   ├── register/        # Registration page
│   ├── layout.tsx       # Root layout with providers
│   └── page.tsx         # Home/dashboard page
├── apis/                # API client functions
│   └── userApi.ts       # User-related API calls
├── components/          # Reusable UI components
├── store/               # Redux store configuration
│   ├── authSlice.ts     # Authentication state management
│   └── store.ts         # Redux store setup
├── theme/               # Material UI theme customization
└── public/              # Static assets
```

## Authentication Flow

### Registration
1. User submits registration form with name, email, and password
2. Frontend validates the input data
3. Registration request is sent to the backend API
4. Upon successful registration:
   - The backend returns user data and a JWT token
   - The token is stored in localStorage
   - User is redirected to the dashboard
   - User data is stored in Redux state

### Login
1. User submits login form with email and password
2. Frontend validates the input data
3. Login request is sent to the backend API
4. Upon successful login:
   - The backend returns user data and a JWT token
   - The token is stored in localStorage
   - User is redirected to the dashboard

### Authentication State Management
- Redux is used to manage authentication state across the application
- The `authSlice.ts` handles login, registration, and user profile actions
- JWT token is stored in localStorage for persistent sessions
- Protected routes redirect unauthenticated users to the login page

## API Integration

The application communicates with the backend through the API client in `apis/userApi.ts`, which provides methods for:

- User registration
- User login
- Fetching user profile
- Updating user information

## State Management

Redux Toolkit is used for state management with the following slices:

- `authSlice`: Manages authentication state, user data, and related operations

## Styling and UI

- Material UI components are used throughout the application
- Custom theme configuration in the `theme` directory
- Responsive design adapts to different screen sizes
- Geist font is used for typography

## Development

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:5001/api  # Backend API URL
```

## Deployment

The application can be deployed to Vercel or any other hosting platform that supports Next.js applications.

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```
