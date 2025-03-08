import axios from 'axios';
import { User, UserUpdateRequest } from './user';

const API_BASE_URL = 'http://localhost:9090/api/users';

/**
 * API client for user-related operations
 */
export const userApi = {
  /**
   * Fetch all users
   * @returns Promise resolving to an array of users
   */
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  /**
   * Fetch a user by ID
   * @param userId - The user ID to fetch
   * @returns Promise resolving to the user data
   */
  async getUserById(userId: string): Promise<User> {
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Update a user by ID
   * @param userId - The user ID to update
   * @param userData - The user data to update
   * @returns Promise resolving to the updated user data
   */
  async updateUser(userId: string, userData: UserUpdateRequest): Promise<User> {
    try {
      const response = await axios.put(`${API_BASE_URL}/${userId}`, userData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating user ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new user
   * @param userData - The user data to create
   * @returns Promise resolving to the created user data
   */
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    try {
      const response = await axios.post(API_BASE_URL, userData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  /**
   * Delete a user by ID
   * @param userId - The user ID to delete
   * @returns Promise resolving to a boolean indicating success
   */
  async deleteUser(userId: string): Promise<boolean> {
    try {
      await axios.delete(`${API_BASE_URL}/${userId}`);
      return true;
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
      throw error;
    }
  }
};
