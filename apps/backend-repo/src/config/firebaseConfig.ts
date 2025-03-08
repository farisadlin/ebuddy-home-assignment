import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin SDK
// In a real application, you would use environment variables for these values
// For development, you can place your Firebase service account key in the project root
// and load it as shown below
try {
  // Check if Firebase is already initialized
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      // You can also use a service account key file:
      // credential: admin.credential.cert(require('path/to/serviceAccountKey.json')),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
}

// Export the Firestore instance
export const db = admin.firestore();
export default admin;
