import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { formatCurrency } from '~/helpers';
import type { Product as IProduct } from '~/types/Product';

interface Props {
  product: IProduct;
}

export const Product = component$<Props>(({ product }) => {
  console.log(product);
  return (
    <li class="flex  items-center space-x-6 border border-gray-200 p-6 bg-white shadow">
      <figure>
        <img src={product.image} alt={product.name} width={150} height={150} />
      </figure>

      <section class="space-y-2 flex-auto">
        <h3 class="text-gray-800">{product.name}</h3>
        <p class="font-bold">{formatCurrency(product.price)}</p>
        <p>{product.availability} En existencia</p>
      </section>

      <section>
        <Link href={`edit/${product.id}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-gray-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </Link>
      </section>
    </li>
  );
});
