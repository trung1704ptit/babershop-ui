import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "./config";


export async function getDoument(collection: string, id?: string) {
  let docRef;
  if (id) {
    docRef = doc(db, collection, id);
  } else {
    docRef = doc(db, collection);
  }

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function getDocsByCollection(collectionId: string) {
  const result: any = [];
  let error = null;

  try {
    const querySnapshot = await getDocs(collection(db, collectionId));
    querySnapshot.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });
  } catch (e) {
    error = e
  }

  return { result, error }
} 