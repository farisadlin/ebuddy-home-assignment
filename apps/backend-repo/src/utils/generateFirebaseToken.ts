import { auth } from '../config/firebaseConfig';

/**
 * Generate a Firebase ID token for a user
 * @param uid - The Firebase user ID
 * @returns Promise resolving to the Firebase ID token
 */
export const generateFirebaseIdToken = async (uid: string): Promise<string> => {
  try {
    // Create a custom token using Firebase Admin SDK
    const customToken = await auth.createCustomToken(uid);
    
    console.log('=== FIREBASE CUSTOM TOKEN ===');
    console.log(customToken);
    console.log('');
    console.log('This is a custom token that can be exchanged for an ID token.');
    console.log(`User ID: ${uid}`);
    console.log('');
    
    return customToken;
  } catch (error) {
    console.error('Error generating Firebase token:', error);
    throw error;
  }
};

/**
 * Generate a Firebase ID token for a specific test user
 * This is useful for quickly getting a token for testing
 */
export const generateTokenForTestUser = async (): Promise<string> => {
  // Use the test user credentials
  const userId = 'test-user-123';
  
  try {
    const token = await generateFirebaseIdToken(userId);
    
    console.log('=== TEST USER FIREBASE TOKEN ===');
    console.log(token);
    console.log('');
    console.log('Use this token to authenticate your test user.');
    console.log(`User ID: ${userId}`);
    console.log('Email: test@example.com (simulated)');
    console.log('');
    
    return token;
  } catch (error) {
    console.error('Error generating test user token:', error);
    throw error;
  }
};
