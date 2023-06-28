import {
  Slot,
  component$,
  useContextProvider,
  useStore,
} from '@builder.io/qwik';

import { type ProductContext, ProductsContext } from './ProductsContext';

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

  const store = useStore<ProductContext>({
    categories,
    isProductsEmpty: false,
  });

  useContextProvider(ProductsContext, store);
  return <Slot />;
});
