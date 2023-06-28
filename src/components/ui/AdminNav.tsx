import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Logo } from './Logo';

export const AdminNav = component$(() => {
  return (
    <header class="px-10 py-5 bg-gray-800 flex justify-between absolute top-0 w-full z-10 items-center">
      <div>
        <Logo />
      </div>

      <nav>
        <Link class="rounded text-white font-bold p-2" href="/admin/products/">
          Productos
        </Link>

        <Link class="rounded text-white font-bold p-2" href="/admin/sales/">
          Ventas
        </Link>

        <Link
          class="rounded bg-green-400 hover:bg-green-500 font-bold py-2 px-10"
          href="/"
        >
          Ir a tienda
        </Link>
      </nav>
    </header>
  );
});
