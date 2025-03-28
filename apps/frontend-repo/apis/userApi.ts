import {
  User,
  UserUpdateRequest,
  LoginRequest,
  LoginResponse,
} from "../../../types/user";

// Registration request interface
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Base URL for API calls
// Check if we should use local development server
const useLocalDev = process.env.NEXT_PUBLIC_USE_LOCAL_DEV === "true";

// Check if we should use Firebase emulator
const useFirebaseEmulator =
  process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true";

// Set the API base URL based on environment
let API_BASE_URL: string;

if (useFirebaseEmulator) {
  // Use the Firebase Functions emulator running on port 5001
  const emulatorHost =
    process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST || "localhost";
  const emulatorPort = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_PORT || "5001";
  API_BASE_URL = `http://${emulatorHost}:${emulatorPort}/ebuddy-home-assignment/us-central1`;
} else if (useLocalDev) {
  // Use the local Express server running on port 9090
  const localHost = process.env.NEXT_PUBLIC_LOCAL_DEV_HOST || "localhost";
  const localPort = process.env.NEXT_PUBLIC_LOCAL_DEV_PORT || "9090";
  API_BASE_URL = `http://${localHost}:${localPort}/api`;
} else {
  // Use the configured API base URL
  API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;
}

// Helper function to handle fetch requests
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  // Default headers
  const headers = new Headers({
    "Content-Type": "application/json",
    ...options.headers,
  });

  // Add auth token if available
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }
  }

  // Merge options with headers
  const fetchOptions: RequestInit = {
    ...options,
    headers,
  };

  // Execute fetch
  const response = await fetch(url, fetchOptions);

  // Check if the response is ok
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Request failed with status ${response.status}`
    );
  }

  return response.json();
};

/**
 * API client for user-related operations
 */
export const userApi = {
  /**
   * Register a new user
   * @param userData - The user registration data
   * @returns Promise resolving to the login response with user data and token
   */
  async register(userData: RegisterRequest): Promise<LoginResponse> {
    try {
      const data = await fetchWithAuth(`${API_BASE_URL}/users/create`, {
        method: "POST",
        body: JSON.stringify(userData),
      });

      // Store the token in localStorage for future requests
      if (data.data?.token) {
        localStorage.setItem("authToken", data.data.token);
        console.log("User registered successfully and token stored for authorization");
      } else {
        console.warn("Registration successful but no token received from server");
      }

      return data;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },

  /**
   * Login with email and password
   * @param credentials - The login credentials
   * @returns Promise resolving to the login response with user data and token
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const data = await fetchWithAuth(`${API_BASE_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      // Store the token in localStorage for future requests
      if (data.data?.token) {
        localStorage.setItem("authToken", data.data.token);
      }

      return data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },
  /**
   * Fetch the current user's profile
   * @returns Promise resolving to the user data
   */
  async getProfile(): Promise<User> {
    try {
      const data = await fetchWithAuth(`${API_BASE_URL}/fetch-user-data`);
      return data.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
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
      const data = await fetchWithAuth(`${API_BASE_URL}/users/${userId}`);
      return data.data;
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
    // Validate inputs
    if (!userId) {
      throw new Error("User ID is required for updating a user");
    }

    if (!userData || Object.keys(userData).length === 0) {
      throw new Error("No update data provided");
    }

    try {
      // Log the update attempt
      console.log(
        `Attempting to update user ${userId} with data:`,
        JSON.stringify(userData, null, 2)
      );

      // Send the update request
      const response = await fetchWithAuth(
        `${API_BASE_URL}/update-user-data/${userId}`,
        {
          method: "PUT",
          body: JSON.stringify(userData),
        }
      );

      // Process the response
      if (!response.success) {
        throw new Error(response.message || "Failed to update user");
      }

      console.log(`User ${userId} updated successfully`);
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${userId}:`, error);
      // Rethrow with more context
      if (error instanceof Error) {
        throw new Error(`Failed to update user: ${error.message}`);
      }
      throw new Error("An unknown error occurred while updating user");
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
      const data = await fetchWithAuth(`${API_BASE_URL}/users/create`, {
        method: "POST",
        body: JSON.stringify(userData),
      });
      return data.data;
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
