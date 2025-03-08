import { generateTokenForTestUser } from '../utils/generateFirebaseToken';

// Generate and display a Firebase token for the test user
async function main() {
  try {
    await generateTokenForTestUser();
    console.log('');
    console.log('IMPORTANT: To use this token with a real Firebase project:');
    console.log('1. Make sure you have a valid serviceAccount.json file in the project root');
    console.log('2. Set the FIREBASE_PROJECT_ID environment variable to your Firebase project ID');
    console.log('3. Use this token in the Authorization header: Bearer <token>');
  } catch (error) {
    console.error('Failed to generate token:', error);
    process.exit(1);
  }
}

main();
