import {
  Slot,
  component$,
  useContextProvider,
  useSignal,
  useStore,
} from '@builder.io/qwik';

import { ProductsContext, type ProductsStore } from './ProductsContext';

export const ProductsProvider = component$(() => {
  const productsStore = useStore<ProductsStore>({
    categories: [
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
    ],
    isProductsEmpty: false,
  });
  const categorySelected = useSignal(1);

  useContextProvider(ProductsContext, {
    productsStore,
    categorySelected,
  });
  return <Slot />;
});
