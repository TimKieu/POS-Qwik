import { createContextId } from '@builder.io/qwik';

type Category = {
  id: number;
  name: string;
};
export type ProductContext = {
  categories: Category[];
  isProductsEmpty: boolean;
};

export const ProductsContext = createContextId<ProductContext>('products');
