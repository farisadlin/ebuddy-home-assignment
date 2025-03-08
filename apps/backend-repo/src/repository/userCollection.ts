import { db } from '../config/firebaseConfig';
import { User, UserUpdateRequest } from '../entities/user';

// Collection reference
const usersCollection = db.collection('USERS');

/**
 * User repository class for interacting with Firestore
 */
export class UserRepository {
  /**
   * Fetch a user by ID
   * @param userId - The user ID to fetch
   * @returns Promise resolving to the user data or null if not found
   */
  async getUserById(userId: string): Promise<User | null> {
    try {
      const userDoc = await usersCollection.doc(userId).get();
      
      if (!userDoc.exists) {
        return null;
      }
      
      const userData = userDoc.data() as Omit<User, 'id'>;
      return {
        id: userDoc.id,
        ...userData
      };
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  /**
   * Fetch all users
   * @returns Promise resolving to an array of users
   */
  async getAllUsers(): Promise<User[]> {
    try {
      const usersSnapshot = await usersCollection.get();
      
      return usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<User, 'id'>)
      }));
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  }

  /**
   * Update a user by ID
   * @param userId - The user ID to update
   * @param userData - The user data to update
   * @returns Promise resolving to the updated user data
   */
  async updateUser(userId: string, userData: UserUpdateRequest): Promise<User> {
    try {
      const updateData = {
        ...userData,
        updatedAt: new Date()
      };
      
      await usersCollection.doc(userId).update(updateData);
      
      // Fetch and return the updated user
      const updatedUser = await this.getUserById(userId);
      if (!updatedUser) {
        throw new Error('User not found after update');
      }
      
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  /**
   * Create a new user
   * @param userData - The user data to create
   * @returns Promise resolving to the created user data
   */
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    try {
      const now = new Date();
      const newUser = {
        ...userData,
        createdAt: now,
        updatedAt: now
      };
      
      const docRef = await usersCollection.add(newUser);
      
      return {
        id: docRef.id,
        ...newUser
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Delete a user by ID
   * @param userId - The user ID to delete
   * @returns Promise resolving to a boolean indicating success
   */
  async deleteUser(userId: string): Promise<boolean> {
    try {
      await usersCollection.doc(userId).delete();
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}
