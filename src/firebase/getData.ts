import { doc, getDoc, getFirestore } from "firebase/firestore";

import firebase_app from "./config";

const db = getFirestore(firebase_app as any)
export default async function getDoument(collection: any, id: string) {
  const docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}