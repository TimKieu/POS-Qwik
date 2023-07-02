import { type Signal, createContextId } from '@builder.io/qwik';

type Category = {
  id: number;
  name: string;
};

export type ProductsStore = {
  categories: Category[];
  isProductsEmpty: boolean;
};

export type ProductContext = {
  productsStore: ProductsStore;
  categorySelected: Signal<number>;
};

export const ProductsContext = createContextId<ProductContext>('products');
