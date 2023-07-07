import { component$, useContext } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Logo } from './Logo';
import { ProductsContext } from '../../context/product/ProductsContext';

export const MainNav = component$(() => {
  const { categories, categorySelected } = useContext(ProductsContext);

  return (
    <header class="px-10 py-5 bg-gray-800 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between absolute top-0 w-full z-10 items-center">
      <div>
        <Logo />
        <div class="flex gap-5 text-white">
          <h2 class="text-lg font-extrabold">Filtros:</h2>
          {categories.value.map(({ id, name }) => {
            return (
              <Link
                class="flex items-center gap-2"
                key={id}
                href={`/?category=${id}`}
                onClick$={() => {
                  categorySelected.value = id;
                }}
              >
                <input
                  type="radio"
                  name="category"
                  value={id}
                  class="radio radio-primary bg-white"
                  checked={categorySelected.value === id}
                />
                <label class="text-gray-100">{name}</label>
              </Link>
            );
          })}
        </div>
      </div>

      <nav>
        <Link
          class="rounded bg-green-400 hover:bg-green-500 font-bold py-2 px-10"
          href="/admin/"
        >
          Admistrar
        </Link>
      </nav>
    </header>
  );
});
