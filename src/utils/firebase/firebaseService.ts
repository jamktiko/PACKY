import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { getDoc } from 'firebase/firestore/lite';

// export const getAllCollections = async (collectionName: string) => {
//   try {
//     // Reference to the specific collection, not the whole database
//     // using the collcetion method from firebase
//     const colRef = collection(db, collectionName);
//     // Get all documents from the collection
//     const snaphsot = await getDocs(colRef);
//     // Mapping the data to a new array of objects,
//     // extracting the id, name, and info fields from each document.
//     const data = snaphsot.docs.map((doc) => ({
//       id: doc.id,
//       name: doc.data().name,
//       info: doc.data().info,
//       tags: doc.data().tags,
//     }));
//     // and finally returning the data
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getFrameworks = async (collectionName: string) => {
  try {
    // Reference to the specific collection
    const colRef = collection(db, collectionName);
    // Get all documents from the collection
    const snapshot = await getDocs(colRef);
    // Mapping the data to a new array of objects,
    // extracting the id, name, and info fields from each document.
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      info: doc.data().info,
      tags: doc.data().tags,
    }));
    // and finally returning the data, where is name,info and tags
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getDatabases = async (collectionName: string) => {
  try {
    const collRef = collection(db, collectionName);
    const snapshot = await getDocs(collRef);
    const data = snapshot.docs.map((doc) => ({
      id: doc.data().id,
      name: doc.data().name,
      info: doc.data().info,
      tags: doc.data().tags,
    }));
    return data;
  } catch (error) {
    console.log(error);
  }
};
