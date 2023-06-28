import { component$ } from '@builder.io/qwik';

export const Logo = component$(() => {
  return (
    <>
      <h1 class="text-3xl font-bold text-white">
        eStore <span class="text-green-400">Connect</span>
      </h1>
    </>
  );
});
