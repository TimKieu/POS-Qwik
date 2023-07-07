import { component$, useContext } from '@builder.io/qwik';
import { CartContext } from '~/context/cart/CartContext';
import { ShoppingCartItem } from './ShoppingCartItem';

export interface ShoppingCartProps {}

export const ShoppingCart = component$<ShoppingCartProps>(() => {
  const { items, isEmpty } = useContext(CartContext);

  return (
    <>
      {isEmpty.value ? (
        <p class="text-xl text-center text-gray-900">El carrito esta vacio</p>
      ) : (
        <div>
          <p class="text-4xl font-bold text-gray-900">Resumen de venta</p>
          <ul role="list" class="mt-6 divide-y divide-gray-200">
            {items.value.map((product) => {
              return <ShoppingCartItem key={product.id} product={product} />;
            })}
          </ul>
        </div>
      )}
    </>
  );
});
