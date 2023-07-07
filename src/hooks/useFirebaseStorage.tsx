import {
  type NoSerialize,
  noSerialize,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';
import { type FirebaseStorage, getStorage } from 'firebase/storage';
import { firebaseApp } from '~/lib/firebase';

// this  returns a storage
export const useFirebaseStorage = () => {
  const store = useStore<{ storageInstance: NoSerialize<FirebaseStorage> }>({
    storageInstance: undefined,
  });

  useVisibleTask$(async () => {
    // This works only in the browser
    const storage = getStorage(await firebaseApp());
    store.storageInstance = noSerialize(storage);
  });

  return store.storageInstance;
};
