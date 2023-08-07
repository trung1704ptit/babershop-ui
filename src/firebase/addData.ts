import { doc, getFirestore, setDoc } from "firebase/firestore";

import firebaseApp from "./config";

const db = getFirestore(firebaseApp as any)

export default async function addData(colllection: any, id: string, data: any) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, colllection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}