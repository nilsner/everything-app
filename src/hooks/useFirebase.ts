// src/hooks/useFirebase.ts
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const useFirebase = () => {
  const getCollection = async (collectionName: string) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  const addDocument = async (collectionName: string, data: any) => {
    await addDoc(collection(db, collectionName), data);
  };

  const updateDocument = async (collectionName: string, id: string, data: any) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
  };

  const deleteDocument = async (collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  };

  return { getCollection, addDocument, updateDocument, deleteDocument };
};
