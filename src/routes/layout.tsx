import { Slot, component$ } from '@builder.io/qwik';
import { CartProvider } from '~/context/cart/CartProvider';
import { ProductsProvider } from '~/context/product/ProductsProvider';

export default component$(() => {
  return (
    <ProductsProvider>
      <CartProvider>
        <Slot />
      </CartProvider>
    </ProductsProvider>
  );
});
