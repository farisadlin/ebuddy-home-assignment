/**
 * Re-export shared types from the root types directory
 * 
 * This file imports and re-exports all the shared types from the root types directory.
 * This approach allows us to maintain type consistency across the codebase while
 * still respecting TypeScript module resolution rules.
 */

import {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserUpdateRequest,
  UserResponse
} from '@shared/user';

// Re-export all shared types
export {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserUpdateRequest,
  UserResponse
};

// Add any backend-specific types here

/**
 * Extended user interface with backend-specific properties
 * This is an example of how to extend shared types with backend-specific properties
 */
export interface BackendUser extends User {
  // Add backend-specific properties here if needed
  lastLoginAt?: Date | string;
  passwordResetToken?: string;
  passwordResetExpires?: Date | string;
}
