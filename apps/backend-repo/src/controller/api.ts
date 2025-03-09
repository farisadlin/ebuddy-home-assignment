import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { UserRepository } from "../repository/userCollection";
import { UserUpdateRequest } from "../entities/user";
import jwt from "jsonwebtoken";

// Initialize the user repository
const userRepository = new UserRepository();

/**
 * Controller for user-related API endpoints
 */
export class UserController {
  /**
   * Login with existing user credentials
   * @param req - Express request object
   * @param res - Express response object
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "Email and password are required",
          data: null,
        });
        return;
      }

      // Find user by email
      const users = await userRepository.getAllUsers();
      const user = users.find((u) => u.email === email);

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
          data: null,
        });
        return;
      }

      // Verify password (plain text comparison)
      if (password !== user.password) {
        res.status(401).json({
          success: false,
          message: "Invalid password",
          data: null,
        });
        return;
      }

      // Generate JWT token
      const jwtSecret = process.env.JWT_SECRET || "your-jwt-secret";
      const token = jwt.sign(
        {
          uid: user.id,
          email: user.email,
          role: user.role || "user",
        },
        jwtSecret,
        { expiresIn: "1d", algorithm: "HS256" }
      );

      // Remove password from user object before sending response
      const { password: _, ...userWithoutPassword } = user;

      res.status(200).json({
        success: true,
        data: {
          user: userWithoutPassword,
          token,
        },
        message: "Login successful",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Login failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  /**
   * Fetch user data by ID or all users if no ID is provided
   * @param req - Express request object
   * @param res - Express response object
   */
  async fetchUserData(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (userId) {
        // Fetch a specific user by ID
        const user = await userRepository.getUserById(userId);

        if (!user) {
          res.status(404).json({
            success: false,
            message: "User not found",
            data: null,
          });
          return;
        }

        res.status(200).json({
          success: true,
          data: user,
          message: "User fetched successfully",
        });
      } else {
        // Fetch all users
        const users = await userRepository.getAllUsers();

        res.status(200).json({
          success: true,
          data: users,
          message: "Users fetched successfully",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch user data",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  /**
   * Update user data by ID
   * @param req - Express request object
   * @param res - Express response object
   */
  async updateUserData(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (!userId) {
        res.status(400).json({
          success: false,
          message: "User ID is required",
          data: null,
        });
        return;
      }

      // Extract update data from request body
      const updateData: UserUpdateRequest = req.body;

      // Validate update data
      if (!updateData || Object.keys(updateData).length === 0) {
        res.status(400).json({
          success: false,
          message: "No update data provided",
          data: null,
        });
        return;
      }

      // Validate that the user exists
      const existingUser = await userRepository.getUserById(userId);

      if (!existingUser) {
        res.status(404).json({
          success: false,
          message: "User not found",
          data: null,
        });
        return;
      }

      // Validate email uniqueness if email is being updated
      if (updateData.email && updateData.email !== existingUser.email) {
        const users = await userRepository.getAllUsers();
        const emailExists = users.some(
          (u) => u.id !== userId && u.email === updateData.email
        );

        if (emailExists) {
          res.status(409).json({
            success: false,
            message: "Email already in use by another user",
            data: null,
          });
          return;
        }
      }

      // Update the user
      const updatedUser = await userRepository.updateUser(userId, updateData);

      // Remove password from response
      const { password: _, ...userWithoutPassword } = updatedUser;

      res.status(200).json({
        success: true,
        data: userWithoutPassword,
        message: "User updated successfully",
      });
    } catch (error) {
      console.error(`Error updating user:`, error);
      res.status(500).json({
        success: false,
        error: "Failed to update user data",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  /**
   * Create a new user
   * @param req - Express request object
   * @param res - Express response object
   */
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;

      if (!userData.name || !userData.email || !userData.password) {
        res.status(400).json({
          success: false,
          message: "Name, email, and password are required",
          data: null,
        });
        return;
      }

      // Create the user with plain text password
      const newUser = await userRepository.createUser(userData);

      // Generate JWT token - same as login endpoint
      const jwtSecret = process.env.JWT_SECRET || "your-jwt-secret";
      const token = jwt.sign(
        {
          uid: newUser.id,
          email: newUser.email,
          role: newUser.role || "user",
        },
        jwtSecret,
        { expiresIn: "1d", algorithm: "HS256" }
      );

      // Remove password from response
      const { password: _, ...newUserWithoutPassword } = newUser;

      // Return response in the same format as login endpoint
      res.status(201).json({
        success: true,
        data: {
          user: newUserWithoutPassword,
          token,
        },
        message: "User created successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to create user",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  /**
   * Get user profile - Returns the profile of the authenticated user
   * @param req - Express request object with user data from auth middleware
   * @param res - Express response object
   */
  async getUserProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      // The auth middleware adds the user ID to the request object
      const userId = req.user?.uid;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Authentication required",
          data: null,
        });
        return;
      }

      // Fetch the user by ID
      const user = await userRepository.getUserById(userId);

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User profile not found",
          data: null,
        });
        return;
      }

      // Remove sensitive information before sending the response
      const { password, ...userProfile } = user;

      res.status(200).json({
        success: true,
        data: userProfile,
        message: "User profile fetched successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch user profile",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
