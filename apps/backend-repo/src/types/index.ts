/**
 * IMPORTANT: This file contains a copy of the shared types from /types/user.ts
 * If you make changes to the shared types, make sure to update both files.
 *
 * This approach is used to work around TypeScript's rootDir constraint while
 * still allowing shared types between frontend and backend.
 */

/**
 * User interface representing the structure of user data
 */
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  // Password is only used on the backend
  password?: string;
  // Additional user properties
  profilePicture?: string;
  role?: string;
  isActive?: boolean;
}

/**
 * Login request interface for authentication
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Login response interface for authentication
 */
export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  } | null;
  error?: string;
}

/**
 * User request interface for updating user data
 */
export interface UserUpdateRequest {
  name?: string;
  email?: string;
  password?: string;
  profilePicture?: string;
  role?: string;
  isActive?: boolean;
  // Add any additional fields that can be updated
}

/**
 * User response interface for API responses
 */
export interface UserResponse {
  success: boolean;
  data?: User | User[] | null;
  message?: string;
  error?: string;
}
