import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { getCollection, getDB, getFirebaseStorage } from '~/lib/firebase';
import type { Product } from '~/types/Product';

const collectionRef = async () => collection(await getDB(), 'products');

const getDocProductRef = async (id: string) =>
  doc(await getDB(), 'product', id);

export const getProductById = async (id: string) => {
  const docRef = await getDocProductRef(id);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as Product;
};

export const getProducts = async () => {
  const q = query(await collectionRef(), orderBy('availability', 'asc'));
  return await getCollection(q);
};

export const getProductsByCategory = async (categoryId: number) => {
  const q = query(await collectionRef(), where('category', '==', categoryId));
  return await getCollection(q);
};

export const createProduct = async (product: Omit<Product, 'id'>) => {
  await addDoc(await collectionRef(), product);
};

export const updateProductById = async (
  id: string,
  product: Omit<Product, 'id'>
) => {
  const { image, ...values } = product;

  const docRef = await getDocProductRef(id);
  if (image !== '') {
    console.log({
      msg: 'Imagen actualizada con exito',
    });
    await updateDoc(docRef, {
      ...values,
      image,
    });
    return;
  }
  console.log({
    msg: 'Imagen no actualizada',
  });
  await updateDoc(docRef, values);
};

export const deleteProduct = async (id: string) => {
  const docRef = await getDocProductRef(id);
  const docSnap = await getDoc(docRef);
  const { image } = docSnap.data() as Omit<Product, 'id'>;

  const imgRef = ref(await getFirebaseStorage(), image);
  await Promise.all([deleteDoc(docRef), deleteObject(imgRef)]);
};
