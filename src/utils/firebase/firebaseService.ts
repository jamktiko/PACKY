import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const getAllCollections = async (collectionName: string) => {
  try {
    // Reference to the specific collection, not the whole database
    // using the collcetion method from firebase
    const colRef = collection(db, collectionName);
    // Get all documents from the collection
    const snaphsot = await getDocs(colRef);
    // Mapping the data to a new array of objects,
    // extracting the id, name, and info fields from each document.
    const data = snaphsot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      info: doc.data().info,
    }));
    // and finally returning the data
    return data;
  } catch (error) {
    console.log(error);
  }
};
