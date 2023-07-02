import { component$, useContext } from '@builder.io/qwik';
import { Form, Link, routeAction$, z, zod$ } from '@builder.io/qwik-city';
import { Label } from '~/components/ui/Label';
import { ProductsContext } from '~/context/product/ProductsContext';
import { createProduct } from '~/helpers/products';
import { useImage } from '~/hooks/useImage';

export const useCreateProduct = routeAction$(
  async (values, { redirect }) => {
    await createProduct({
      availability: Number(values.availability),
      category: Number(values.category),
      image: values.image,
      name: values.name,
      price: Number(values.price),
    });
    throw redirect(302, '/admin/products');
  },
  zod$({
    name: z.string(),
    image: z.any(),
    category: z.string(),
    price: z.string(),
    availability: z.string(),
  })
);

export default component$(() => {
  const { onFileChange, imgUrl, isImgUploaded } = useImage();

  const { productsStore } = useContext(ProductsContext);
  const createProduct = useCreateProduct();

  return (
    <>
      <Link
        class="rounded bg-green-400 hover:bg-green-500 font-bold py-2 px-10"
        href="/admin/products/"
      >
        Volver
      </Link>
      <h1 class="text-4xl font-black my-10">New Product</h1>

      <div class="flex justify-center bg-white shadow">
        <div class="mt-10 p-10 w-full 2xl:w-2/4">
          <Form
            action={createProduct}
            class="flex flex-col"
            preventdefault:submit
          >
            <Label>Nombre</Label>
            <input
              type="text"
              name="name"
              placeholder="Nombre de Producto"
              class="input bg-base-200"
            />

            <Label>Imagen del producto</Label>
            <input type="hidden" name="image" value={imgUrl.value} />
            <input
              type="file"
              accept=".jpg"
              class="file-input file-input-bordered file-input-md w-full max-w-xs"
              onChange$={onFileChange}
            />
            {isImgUploaded.value && (
              <figure class="">
                <p class="font-black">Imagen del Producto</p>
                <img src={imgUrl.value} alt="" width={200} height={200} />
              </figure>
            )}

            <Label>Categoria</Label>
            <select class="select w-full max-w-xs bg-base-200" name="category">
              {productsStore.categories.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>

            <Label>Precio</Label>
            <input
              type="number"
              name="price"
              placeholder="Precio de producto"
              min={1}
              class="input bg-base-200"
            />

            <Label>Cantidad</Label>
            <input
              type="number"
              name="availability"
              placeholder="Cantidad disponible"
              min={1}
              class="input bg-base-200"
            />

            <button type="submit" class="btn btn-success my-2">
              Agregar Producto
            </button>
          </Form>
        </div>
      </div>
    </>
  );
});
