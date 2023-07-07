import {
  Slot,
  component$,
  useContextProvider,
  useSignal,
  $,
  useComputed$,
} from '@builder.io/qwik';
import { CartContext } from './CartContext';
import type { Product } from '~/types/Product';

export const CartProvider = component$(() => {
  const items = useSignal<Product[]>([]);

  const MAX_PRODUCT_QUANTITY = 5;

  const addItem = $((newItem: Product) => {
    const existsItem = items.value.some(({ id }) => id === newItem.id);
    if (!existsItem) items.value = [newItem, ...items.value];
  });

  const isEmpty = useComputed$(() => items.value.length === 0);

  const checkProductAvailability = useComputed$(() => {
    return $((product: Product) =>
      product.availability < MAX_PRODUCT_QUANTITY
        ? product.availability
        : MAX_PRODUCT_QUANTITY
    );
  });

  useContextProvider(CartContext, {
    items,
    addItem,
    isEmpty,
    checkProductAvailability,
  });
  return <Slot />;
});
