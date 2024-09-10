import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const getAllCollections = async (collectionName: string) => {
  try {
    const colRef = collection(db, collectionName);
    const snaphsot = await getDocs(colRef);
    const data = snaphsot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      info: doc.data().info,
    }));
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
