import axios from "axios";
import { User, UserUpdateRequest, LoginRequest, LoginResponse } from "./user";

// Base URL for API calls
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

// Configure axios defaults
axios.defaults.headers.common["Content-Type"] = "application/json";

// Add auth token to requests if available
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * API client for user-related operations
 */
export const userApi = {
  /**
   * Login with email and password
   * @param credentials - The login credentials
   * @returns Promise resolving to the login response with user data and token
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/login`,
        credentials
      );
      // Store the token in localStorage for future requests
      if (response.data.data?.token) {
        localStorage.setItem("authToken", response.data.data.token);
      }
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },
  /**
   * Fetch all users
   * @returns Promise resolving to an array of users
   */
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/fetch-user-data`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching users:", error);
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
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
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
      const response = await axios.put(
        `${API_BASE_URL}/update-user-data/${userId}`,
        userData
      );
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
  async createUser(
    userData: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<User> {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, userData);
      return response.data.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  /**
   * Logout the current user
   * @returns Promise resolving to a boolean indicating success
   */
  async logout(): Promise<boolean> {
    try {
      // Clear the token from localStorage
      localStorage.removeItem("authToken");
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  },
};
