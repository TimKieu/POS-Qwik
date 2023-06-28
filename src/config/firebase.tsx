import {
  useStore,
  type NoSerialize,
  useVisibleTask$,
  noSerialize,
  useTask$,
} from '@builder.io/qwik';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  getDocs,
  type Query,
  type DocumentData,
  type DocumentReference,
  getDoc,
  type Firestore,
} from 'firebase/firestore';
import { type FirebaseStorage, getStorage } from 'firebase/storage';
import type { Product } from '~/types/Product';
import { $ } from '@builder.io/qwik';
import type { Product as IProduct } from '~/types/Product';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);

// this  returns a storage
export const useFireBaseStorage = () => {
  const store = useStore<{ storageInstance: NoSerialize<FirebaseStorage> }>({
    storageInstance: undefined,
  });

  useVisibleTask$(() => {
    // This works only in the browser
    const storage = getStorage(firebaseApp);
    store.storageInstance = noSerialize(storage);
  });

  return store.storageInstance;
};

/**
 * Retrieves the Firestore instance.
 *
 * @returns the Firestore instance
 */
export const useFirestore = () => {
  const store = useStore<{ firestoreInstance: NoSerialize<Firestore> }>({
    firestoreInstance: undefined,
  });

  useTask$(async ({ track }) => {
    track(() => store.firestoreInstance);

    const getDB = $(() => getFirestore(firebaseApp));

    store.firestoreInstance = noSerialize(await getDB());
  });

  return store.firestoreInstance;
};

export const getDB = $(() => getFirestore(firebaseApp));

export const getCollection = $(async (q: Query<DocumentData>) => {
  const productSnapshot = await getDocs(q);

  const productList = productSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Product[];

  return productList;
});

export const getDocument = $(
  async (docRef: DocumentReference<DocumentData>) => {
    const docSnapshot = await getDoc(docRef);
    return {
      ...docSnapshot.data(),
      id: docSnapshot.id,
    } as IProduct;
  }
);
