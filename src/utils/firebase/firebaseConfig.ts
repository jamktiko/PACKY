import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// Export environment variables for configuration
export const API_KEY = process.env.FIREBASE_API_KEY;
export const AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN;
export const PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
export const STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET;
export const MESSAGING_SENDER_ID = process.env.FIREBASE_MESSAGING_SENDER_ID;
export const APP_ID = process.env.FIREBASE_APP_ID;

// Checking for missing Firebase credentials
if (
  !API_KEY ||
  !AUTH_DOMAIN ||
  !PROJECT_ID ||
  !STORAGE_BUCKET ||
  !MESSAGING_SENDER_ID ||
  !APP_ID
) {
  throw new Error('Missing Firebase credentials');
}

// Creating firebaseConfig object for firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize the Firebase app if it hasn't been initialized already
export let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Exporting firestore
export const db = getFirestore(firebase_app);

// Exporting auth
export const auth = getAuth(firebase_app);
