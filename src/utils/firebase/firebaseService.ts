import { collection, getDocs, query, where } from 'firebase/firestore';
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

export const getDocumentsByTags = async (tags: string[]) => {
  // The names of the collections to query
  const collections = [
    'databases',
    'backendFrameworks',
    'frontendFrameworks',
    'languages',
    'apis',
    'cloudservices',
  ];
  // Initialize an empty array to store the documents
  const docs: CollectionData[] = [];
  // Looping throigh the collections
  for (const collName of collections) {
    // Creating query to search for documents with the given tags
    const q = query(
      collection(db, collName),
      where('tags', 'array-contains-any', tags)
    );
    // Get all documents that match the query
    const snapshot = await getDocs(q);
    // Looping through the documents
    snapshot.forEach((doc) => {
      // Adding the document to the array
      docs.push({ id: doc.id, name: doc.data().name } as CollectionData);
    });
  }
  return docs;
};
