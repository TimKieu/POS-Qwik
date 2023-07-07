import { type Signal, createContextId } from '@builder.io/qwik';

export type Category = {
  id: number;
  name: string;
};

export type ProductContext = {
  categories: Signal<Category[]>;
  categorySelected: Signal<number>;
  isProductsEmpty: Signal<boolean>;
};

export const ProductsContext = createContextId<ProductContext>('products');
