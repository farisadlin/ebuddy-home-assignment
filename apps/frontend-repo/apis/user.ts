/**
 * User interface representing the structure of user data
 */
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  // Additional user properties
  profilePicture?: string;
  role?: string;
  isActive?: boolean;
}

/**
 * User request interface for updating user data
 */
export interface UserUpdateRequest {
  name?: string;
  email?: string;
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
