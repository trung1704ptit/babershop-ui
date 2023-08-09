import { doc, setDoc } from "firebase/firestore";

import { db } from "./config";


export default async function addData(colllection: string, id: string, data: any) {
  let result = null;
  let error = null;

  try {
    if (colllection && id && data) {
      result = await setDoc(doc(db, colllection, id), data, {
        merge: true,
      });
    } else if (!id) {
      result = await setDoc(doc(db, colllection), data, {
        merge: true,
      });
    }
  } catch (e) {
    error = e;
    console.log(e)
  }

  return { result, error };
}