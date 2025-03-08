/**
 * User interface representing the structure of user data in Firestore
 */
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  // Add any additional user properties as needed
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
