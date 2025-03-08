import { db, FirestoreImplementation } from "../config/firebaseConfig";
import { User, UserUpdateRequest } from "../entities/user";

// Collection reference
const USERS_COLLECTION = "USERS";
const usersCollection = (db as FirestoreImplementation).collection(
  USERS_COLLECTION
);

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

      const userData = userDoc.data() as Omit<User, "id">;
      return {
        id: userDoc.id,
        ...userData,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetch all users
   * @returns Promise resolving to an array of users
   */
  async getAllUsers(): Promise<User[]> {
    try {
      const snapshot = await usersCollection.get();

      const users = snapshot.docs.map((doc) => {
        const data = doc.data() || {};
        return {
          id: doc.id,
          ...(data as Omit<User, "id">),
        };
      });

      return users;
    } catch (error) {
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
        updatedAt: new Date(),
      };

      await usersCollection.doc(userId).update(updateData);

      // Fetch and return the updated user
      const updatedUser = await this.getUserById(userId);
      if (!updatedUser) {
        throw new Error("User not found after update");
      }

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create a new user
   * @param userData - The user data to create
   * @returns Promise resolving to the created user data
   */
  async createUser(
    userData: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<User> {
    try {
      const timestamp = new Date();
      const newUser = {
        ...userData,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      const docRef = await usersCollection.add(newUser);

      return {
        id: docRef.id,
        ...userData,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
    } catch (error) {
      throw error;
    }
  }
}
