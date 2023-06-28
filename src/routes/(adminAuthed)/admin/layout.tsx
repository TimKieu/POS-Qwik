import { Slot, component$ } from '@builder.io/qwik';
import { AdminNav } from '~/components/ui/AdminNav';

export default component$(() => {
  return (
    <>
      <AdminNav />
      <div class="pt-32 container mx-auto lg:min-h-screen">
        <Slot />
      </div>
    </>
  );
});
