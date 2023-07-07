import { type Signal, createContextId, type QRL } from '@builder.io/qwik';
import type { Product } from '~/types/Product';

export type CartContextProps = {
  items: Signal<Product[]>;
  isEmpty: Signal<boolean>;

  // methods
  addItem: QRL<(item: Product) => void>;
  checkProductAvailability: Readonly<Signal<QRL<(product: Product) => number>>>;
};

export const CartContext = createContextId<CartContextProps>('cart');
