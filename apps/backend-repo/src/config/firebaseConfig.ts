import * as admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Define types for our Firebase implementation
export type FirestoreImplementation = admin.firestore.Firestore;
export type AuthImplementation = admin.auth.Auth;
export type StorageImplementation = any; // Using 'any' to avoid type conflicts between different versions

// Initialize Firebase Admin with service account
let firebaseApp;
let db: FirestoreImplementation;
let auth: AuthImplementation;
let storage: StorageImplementation;

// Check for service account file paths
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 
  path.join(process.cwd(), 'serviceAccount.json');

// Function to initialize Firebase with service account
const initializeFirebaseWithServiceAccount = () => {
  try {
    // Check if service account file exists
    if (fs.existsSync(serviceAccountPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      
      if (!admin.apps.length) {
        firebaseApp = admin.initializeApp({
          credential: cert(serviceAccount),
          databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
          storageBucket: `${serviceAccount.project_id}.appspot.com`
        });
      } else {
        firebaseApp = admin.app();
      }
    } else {
      // Try to initialize with environment variables
      const projectId = process.env.FIREBASE_PROJECT_ID;
      
      if (!projectId) {
        throw new Error('Firebase project ID not found. Please set FIREBASE_PROJECT_ID environment variable or provide a service account file.');
      }
      
      if (!admin.apps.length) {
        firebaseApp = admin.initializeApp({
          projectId: projectId
        });
      } else {
        firebaseApp = admin.app();
      }
    }
    
    // Initialize Firebase services
    db = getFirestore(firebaseApp);
    auth = getAuth(firebaseApp);
    storage = getStorage(firebaseApp) as StorageImplementation;
    
    return true;
  } catch (error) {
    return false;
  }
};

// Initialize Firebase
const isInitialized = initializeFirebaseWithServiceAccount();

if (!isInitialized) {
  process.exit(1);
}

// Export Firebase Admin and services
export default admin;
export { firebaseApp, db, auth, storage };
