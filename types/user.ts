/**
 * Shared type definitions for the E-Buddy application
 * 
 * This file contains all the shared types used by both frontend and backend.
 * Import these types in your application code to ensure consistency across the codebase.
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
 * Registration request interface
 */
export interface RegisterRequest {
  name: string;
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

/**
 * User response interface for API responses
 */
export interface UserResponse {
  success: boolean;
  data?: User | User[] | null;
  message?: string;
  error?: string;
}
