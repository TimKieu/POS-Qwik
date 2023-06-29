import {
  $,
  useSignal,
  type QwikChangeEvent,
  useComputed$,
} from '@builder.io/qwik';
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { nanoid } from 'nanoid';
import { useFirebaseStorage } from './useFirebaseStorage';

export const useImage = () => {
  const storage = useFirebaseStorage();
  const imgUrl = useSignal('');

  const onFileChange = $((e: QwikChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 1 && storage) {
      const file = e.target.files[0];
      const fileName = nanoid();
      const sRef = storageRef(storage, `/products/${fileName}`);

      //  Upload file to firebase storage
      const uploadTask = uploadBytesResumable(sRef, file);

      uploadTask.on(
        'state_changed',
        () => {},
        (err) => console.log(err),
        () => {
          // la imagen se subio correctamente
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            console.log(downloadUrl);
            imgUrl.value = downloadUrl;
          });
        }
      );
    }
  });

  const isImgUploaded = useComputed$(() => {
    return imgUrl.value !== '';
  });

  return {
    onFileChange,
    imgUrl,
    isImgUploaded,
  };
};
