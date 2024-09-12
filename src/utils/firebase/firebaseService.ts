import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { CollectionData } from '@/utils/collectionData';

// this function retrieves data from frameworks collection in Firebase
export const getFrameworks = async (collectionName: string) => {
  try {
    // Get a reference to the specific collection
    const colRef = collection(db, collectionName);
    // Fetching all documents from the referenced Firestore collcetions
    const snapshot = await getDocs(colRef);
    // Mapping through each document, to extract the name, info and tags
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      info: doc.data().info,
      tags: doc.data().tags,
    }));
    //Return the resulting array of objects
    // Each object contains the document's id, name, info, and tags
    return data;
  } catch (error) {
    console.error(`Error retrieving frameworks: ${error}`);
    throw error;
  }
};

// this function retrieves data from databases collection in Firebase
export const getDatabases = async (collectionName: string) => {
  try {
    // Get a reference to the specific collection
    const collRef = collection(db, collectionName);
    // Fetching all documents from the referenced Firestore collcetions
    const snapshot = await getDocs(collRef);
    // Mapping through each document, to extract the name, info and tags
    const data = snapshot.docs.map((doc) => ({
      id: doc.data().id,
      name: doc.data().name,
      info: doc.data().info,
      tags: doc.data().tags,
    }));
    //Return the resulting array of objects
    // Each object contains the document's id, name, info, and tags
    return data;
  } catch (error) {
    console.error(`Error retrieving frameworks: ${error}`);
    throw error;
  }
};

export const getLanguages = async (collectionName: string) => {
  try {
    // Get a reference to the specific collection
    const collRef = collection(db, collectionName);
    // Fetching all documents from the referenced Firestore collcetions
    const snapshot = await getDocs(collRef);
    // Mapping through each document, to extract the name, info and tags
    const data = snapshot.docs.map((doc) => ({
      id: doc.data().id,
      name: doc.data().name,
      info: doc.data().info,
      tags: doc.data().tags,
    }));
    return data;
  } catch (error) {
    console.error(`Error retrieving frameworks: ${error}`);
    throw error;
  }
};
