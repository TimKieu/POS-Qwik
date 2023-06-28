import { Slot, component$ } from '@builder.io/qwik';
import { ProductsProvider } from '~/context/product/ProductsProvider';

export default component$(() => {
  return (
    <ProductsProvider>
      <Slot />
    </ProductsProvider>
  );
});
