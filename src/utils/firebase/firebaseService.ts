import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { CollectionData } from '@/utils/collectionData';

export const getAllCollections = async (collectionName: string) => {
  try {
    // Reference to the specific collection
    const collectionReference = collection(db, collectionName);
    // Get all documents from the collection
    const snapshot = await getDocs(collectionReference);
    // Map the documents to an array of CollectionData objects
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // Returning the data
    return data as CollectionData[];
  } catch (error) {
    console.error(`Error retrieving data from ${collectionName}: ${error}`);
    throw error;
  }
};
