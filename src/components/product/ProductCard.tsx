import { component$, useContext } from '@builder.io/qwik';
import { CartContext } from '~/context/cart/CartContext';
import { formatCurrency } from '~/helpers';
import type { Product } from '~/types/Product';

export interface ProductCardProps {
  product: Product;
}

export const ProductCard = component$<ProductCardProps>(({ product }) => {
  const { addItem } = useContext(CartContext);
  return (
    <div class="rounded bg-white shadow relative">
      <figure>
        <img
          src={product.image}
          alt={product.image}
          width={300}
          height={300}
          class="mx-auto"
        />
      </figure>

      <section class="p-3 space-y-2">
        <h3 class="text-xl font-black text-gray-500">{product.name}</h3>
        <p class="text-gray-500">Disponibles: {product.availability}</p>
        <p class="text-2xl font-extrabold text-gray-900">
          {formatCurrency(product.price)}
        </p>
      </section>

      <button
        type="button"
        class="absolute top-5 -right-4"
        onClick$={() => {
          addItem(product);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8 bg-indigo-500 rounded-full text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
});
