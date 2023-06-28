import {
  $,
  Slot,
  component$,
  useContextProvider,
  useStore,
  useTask$,
} from '@builder.io/qwik';
import { getCollection, getDB } from '~/config/firebase';
import {
  type DocumentData,
  type DocumentReference,
  addDoc,
  collection,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { ProductContext, ProductsContext } from './ProductsContext';
import type { Product } from '~/types/Product';

export const ProductsProvider = component$(() => {
  const categories = [
    {
      id: 1,
      name: 'Sudaderas',
    },
    {
      id: 2,
      name: 'Tenis',
    },
    {
      id: 3,
      name: 'Lentes',
    },
  ];

  const getProducts = $(async () => {
    const collectionRef = collection(await getDB(), 'product');
    const q = query(collectionRef, orderBy('availability', 'asc'));
    return await getCollection(q);
  });

  // const db = useFirestore();

  const createProduct = $(async (product: Product) => {
    const collectionRef = collection(await getDB(), 'product');

    // change to: useFirestore() -> db
    await addDoc(collectionRef, product);
  });

  const updateProduct = $(
    async (
      docRef: DocumentReference<DocumentData>,
      product: Omit<Product, 'id'>
    ) => {
      const { image, ...values } = product;
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
    }
  );

  const store = useStore<ProductContext>({
    categories,
    products: [] as Product[],
    isProductsEmpty: false,

    // methods
    createProduct,
    updateProduct,
    getProducts,
  });

  useTask$(async ({ track }) => {
    track(() => [store.products]);

    store.products = await getProducts();

    if (store.products.length === 0) store.isProductsEmpty = true;
  });

  useContextProvider(ProductsContext, store);
  return <Slot />;
});
