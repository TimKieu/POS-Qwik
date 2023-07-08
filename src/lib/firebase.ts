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

const firebaseConfig =  {
  apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.PUBLIC_FIREBASE_APP_ID
}

// My Server methods
export const firebaseApp = initializeApp(firebaseConfig)

export const getFirebaseStorage = async () => getStorage(firebaseApp)

export const getDB = async () => getFirestore(firebaseApp)

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

