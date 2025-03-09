/* eslint-disable object-curly-spacing */
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Enable CORS for all endpoints
import cors from "cors";
const corsHandler = cors({ origin: true });

// Mock user data for testing
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Helper function to wrap responses
const wrapResponse = (success: boolean, data: unknown, message?: string) => {
  return {
    success,
    data,
    message: message || (success ? "Operation successful" : "Operation failed"),
  };
};

// Test endpoint to verify the API is working
export const helloWorld = onRequest((request, response) => {
  corsHandler(request, response, () => {
    logger.info("Hello logs!", { structuredData: true });
    response.json(
      wrapResponse(true, { message: "Hello from Firebase Functions!" })
    );
  });
});

// User login endpoint
export const login = onRequest((request, response) => {
  corsHandler(request, response, () => {
    try {
      if (request.method !== "POST") {
        response
          .status(405)
          .json(wrapResponse(false, null, "Method not allowed"));
        return;
      }

      const { email, password } = request.body;
      // Simple mock authentication
      if (email === "john@example.com" && password === "password") {
        const user = mockUsers.find((u) => u.email === email);
        const token = "mock-jwt-token-" + Date.now();
        response.json(
          wrapResponse(true, {
            user,
            token,
          })
        );
      } else {
        response
          .status(401)
          .json(wrapResponse(false, null, "Invalid credentials"));
      }
    } catch (error) {
      logger.error("Error in login:", error);
      response.status(500).json(wrapResponse(false, null, "Server error"));
    }
  });
});

// Get user profile endpoint
export const fetchUserData = onRequest((request, response) => {
  corsHandler(request, response, () => {
    try {
      // In a real app, you would verify the auth token and get the user ID
      // For this mock, we'll just return the first user
      response.json(wrapResponse(true, mockUsers[0]));
    } catch (error) {
      logger.error("Error fetching user data:", error);
      response.status(500).json(wrapResponse(false, null, "Server error"));
    }
  });
});

// Get user by ID endpoint
export const getUserById = onRequest((request, response) => {
  corsHandler(request, response, () => {
    try {
      const userId = request.path.split("/").pop();
      const user = mockUsers.find((u) => u.id === userId);
      if (user) {
        response.json(wrapResponse(true, user));
      } else {
        response.status(404).json(wrapResponse(false, null, "User not found"));
      }
    } catch (error) {
      logger.error("Error getting user by ID:", error);
      response.status(500).json(wrapResponse(false, null, "Server error"));
    }
  });
});

// Update user endpoint
export const updateUserData = onRequest((request, response) => {
  corsHandler(request, response, () => {
    try {
      if (request.method !== "PUT") {
        response
          .status(405)
          .json(wrapResponse(false, null, "Method not allowed"));
        return;
      }
      const userId = request.path.split("/").pop();
      const userData = request.body;
      const userIndex = mockUsers.findIndex((u) => u.id === userId);
      if (userIndex >= 0) {
        // Update the user data
        mockUsers[userIndex] = {
          ...mockUsers[userIndex],
          ...userData,
          updatedAt: new Date().toISOString(),
        };
        response.json(wrapResponse(true, mockUsers[userIndex]));
      } else {
        response.status(404).json(wrapResponse(false, null, "User not found"));
      }
    } catch (error) {
      logger.error("Error updating user data:", error);
      response.status(500).json(wrapResponse(false, null, "Server error"));
    }
  });
});

// Create user endpoint
export const createUser = onRequest((request, response) => {
  corsHandler(request, response, () => {
    try {
      if (request.method !== "POST") {
        response
          .status(405)
          .json(wrapResponse(false, null, "Method not allowed"));
        return;
      }

      const userData = request.body;

      // Create a new user
      const newUser = {
        id: (mockUsers.length + 1).toString(),
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockUsers.push(newUser);
      response.status(201).json(wrapResponse(true, newUser));
    } catch (error) {
      logger.error("Error creating user:", error);
      response.status(500).json(wrapResponse(false, null, "Server error"));
    }
  });
});
