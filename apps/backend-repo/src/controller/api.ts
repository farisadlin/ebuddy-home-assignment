import { Request, Response } from 'express';
import { UserRepository } from '../repository/userCollection';
import { UserUpdateRequest } from '../entities/user';

// Initialize the user repository
const userRepository = new UserRepository();

/**
 * Controller for user-related API endpoints
 */
export class UserController {
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
            message: 'User not found',
            data: null
          });
          return;
        }
        
        res.status(200).json({
          success: true,
          data: user,
          message: 'User fetched successfully'
        });
      } else {
        // Fetch all users
        const users = await userRepository.getAllUsers();
        
        res.status(200).json({
          success: true,
          data: users,
          message: 'Users fetched successfully'
        });
      }
    } catch (error) {
      console.error('Error in fetchUserData:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch user data',
        message: error instanceof Error ? error.message : 'Unknown error'
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
          message: 'User ID is required',
          data: null
        });
        return;
      }

      // Validate that the user exists
      const existingUser = await userRepository.getUserById(userId);
      
      if (!existingUser) {
        res.status(404).json({
          success: false,
          message: 'User not found',
          data: null
        });
        return;
      }

      // Extract update data from request body
      const updateData: UserUpdateRequest = req.body;
      
      // Update the user
      const updatedUser = await userRepository.updateUser(userId, updateData);
      
      res.status(200).json({
        success: true,
        data: updatedUser,
        message: 'User updated successfully'
      });
    } catch (error) {
      console.error('Error in updateUserData:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update user data',
        message: error instanceof Error ? error.message : 'Unknown error'
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
      
      if (!userData.name || !userData.email) {
        res.status(400).json({
          success: false,
          message: 'Name and email are required',
          data: null
        });
        return;
      }

      // Create the user
      const newUser = await userRepository.createUser(userData);
      
      res.status(201).json({
        success: true,
        data: newUser,
        message: 'User created successfully'
      });
    } catch (error) {
      console.error('Error in createUser:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create user',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Delete a user by ID
   * @param req - Express request object
   * @param res - Express response object
   */
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      
      if (!userId) {
        res.status(400).json({
          success: false,
          message: 'User ID is required',
          data: null
        });
        return;
      }

      // Check if the user exists
      const existingUser = await userRepository.getUserById(userId);
      
      if (!existingUser) {
        res.status(404).json({
          success: false,
          message: 'User not found',
          data: null
        });
        return;
      }

      // Delete the user
      await userRepository.deleteUser(userId);
      
      res.status(200).json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      console.error('Error in deleteUser:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete user',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}
