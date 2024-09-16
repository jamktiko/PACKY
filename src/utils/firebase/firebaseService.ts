import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { CollectionData } from '@/utils/collectionData';

export const getAllCollections = async (collectionName: string) => {
  try {
    const collectionReference = collection(db, collectionName);
    const snapshot = await getDocs(collectionReference);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data as CollectionData[];
  } catch (error) {
    console.error(`Error retrieving data from ${collectionName}: ${error}`);

    throw error;
  }
};
