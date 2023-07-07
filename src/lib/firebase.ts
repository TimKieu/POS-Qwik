import { server$ } from '@builder.io/qwik-city';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  getDocs,
  type Query,
  type DocumentData,
  type DocumentReference,
  getDoc,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import type { Product } from '~/types/Product';
import type { Product as IProduct } from '~/types/Product';

const firebaseConfig = server$(() => {
  return {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}
})

// My Server methods
export const firebaseApp = server$(async () => {
  return initializeApp(await firebaseConfig())
})

export const getFirebaseStorage = async () => getStorage(await firebaseApp())

export const getDB = async () => getFirestore(await firebaseApp())

export const getCollection = async  (q: Query<DocumentData>) => {
    const productSnapshot = await getDocs(q);

  const productList = productSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Product[];

  return productList;
}


export const getDocument = async (docRef: DocumentReference<DocumentData>) => {
  const docSnapshot = await getDoc(docRef);
  return {
    ...docSnapshot.data(),
    id: docSnapshot.id,
  } as IProduct;
}

