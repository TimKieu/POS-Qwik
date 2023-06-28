import { component$ } from '@builder.io/qwik';
import { Form, Link, globalAction$, z, zod$ } from '@builder.io/qwik-city';
import { formatCurrency } from '~/helpers';
import { deleteProduct } from '~/helpers/products';
import type { Product as IProduct } from '~/types/Product';

interface Props {
  product: IProduct;
}

export const useDeleteProduct = globalAction$((values) => {
  return deleteProduct(values.id);
}, zod$({ id: z.string() }));

export const Product = component$<Props>(({ product }) => {
  console.log({ product });

  const deleteProduct = useDeleteProduct();
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

      <section class="flex items-center gap-3">
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

        <Form action={deleteProduct}>
          <button name="id" type="submit" value={product.id}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-red-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </Form>
      </section>
    </li>
  );
});
