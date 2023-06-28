import { createContextId, type QRL } from '@builder.io/qwik';
import type { DocumentData, DocumentReference } from 'firebase/firestore';
import type { Product } from '~/types/Product';

type Category = {
  id: number;
  name: string;
};
export type ProductContext = {
  categories: Category[];
  products: Product[];
  isProductsEmpty: boolean;

  // methods
  getProducts: QRL<() => Promise<Product[]>>;
  createProduct: QRL<(product: Product) => Promise<void>>;
  updateProduct: QRL<
    (
      docRef: DocumentReference<DocumentData>,
      product: Omit<Product, 'id'>
    ) => Promise<void>
  >;
};

export const ProductsContext = createContextId<ProductContext>('products');
