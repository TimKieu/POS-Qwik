import {
  Slot,
  component$,
  useComputed$,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';

import { type Category, ProductsContext } from './ProductsContext';

export const ProductsProvider = component$(() => {
  const categories = useSignal<Category[]>([
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
  ]);
  const categorySelected = useSignal(1);

  const isProductsEmpty = useComputed$(() => categories.value.length === 0);

  useContextProvider(ProductsContext, {
    categories,
    categorySelected,
    isProductsEmpty,
  });
  return <Slot />;
});
