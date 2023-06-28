import { Slot, component$ } from '@builder.io/qwik';

export const Label = component$(() => {
  return (
    <label for="" class="label">
      <span class="label-text font-semibold text-lg">
        <Slot></Slot>
      </span>
    </label>
  );
});
