import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Logo } from './Logo';

export const MainNav = component$(() => {
  return (
    <header class="px-10 py-5 bg-gray-800 flex justify-between absolute top-0 w-full z-10 items-center">
      <div>
        <Logo />
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
