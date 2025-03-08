import { auth } from '../config/firebaseConfig';

/**
 * Sign in with email and password to get a Firebase ID token
 * @param email - User's email
 * @param password - User's password
 */
async function signInWithEmailPassword(email: string, password: string) {
  try {
    // For Firebase Admin SDK, we need to use getUserByEmail first
    console.log(`Attempting to find user with email: ${email}`);
    
    try {
      const userRecord = await auth.getUserByEmail(email);
      console.log('User found:', userRecord.uid);
      
      // Generate a custom token for this user
      const customToken = await auth.createCustomToken(userRecord.uid);
      
      console.log('\n=== FIREBASE CUSTOM TOKEN ===');
      console.log(customToken);
      console.log('\nThis token can be exchanged for an ID token using the Firebase Client SDK.');
      console.log('\nFor API testing, use this token in the Authorization header:');
      console.log(`Bearer ${customToken}`);
      
      return customToken;
    } catch (error) {
      console.error('Error finding user:', error);
      throw new Error(`User with email ${email} not found in Firebase Authentication.`);
    }
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
}

// Execute the script with the test user credentials
async function main() {
  const email = 'test@example.com';
  const password = '123456'; // Note: Password is not used directly with Admin SDK
  
  try {
    await signInWithEmailPassword(email, password);
  } catch (error) {
    console.error('Failed to sign in:', error);
    process.exit(1);
  }
}

main();
