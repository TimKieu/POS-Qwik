import { component$, useContext } from '@builder.io/qwik';
import {
  Form,
  Link,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from '@builder.io/qwik-city';
import { Label } from '~/components/ui/Label';
import { ProductsContext } from '~/context/product/ProductsContext';
import { getProductById, updateProductById } from '~/helpers/products';
import { useImage } from '~/hooks/useImage';

export const useUpdateProduct = routeAction$(
  async (values, { params, redirect }) => {
    const id = params.id;

    if (!id)
      return {
        error: 'No se encontro el producto',
      };

    await updateProductById(id, {
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
    image: z.string(),
    category: z.string(),
    price: z.string(),
    availability: z.string(),
  })
);

export const useProduct = routeLoader$(({ params }) => {
  const id = params.id;
  return getProductById(id);
});

export default component$(() => {
  const { categories } = useContext(ProductsContext);
  const { onFileChange, imgUrl, isImgUploaded } = useImage();
  const product = useProduct();
  const updateProduct = useUpdateProduct();

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
            class="flex flex-col"
            action={updateProduct}
            preventdefault:submit
          >
            <Label>Nombre</Label>
            <input
              type="text"
              name="name"
              placeholder="Nombre de Producto"
              class="input bg-base-200"
              value={product.value.name}
            />

            <Label>Imagen del producto</Label>
            <input type="hidden" name="image" value={imgUrl.value} />
            <input
              type="file"
              accept=".jpg"
              class="file-input file-input-bordered file-input-md w-full max-w-xs"
              onChange$={onFileChange}
            />
            {!isImgUploaded.value ? (
              <figure class="">
                <p class="font-black">Imagen del Producto</p>
                <img
                  src={product.value.image}
                  alt=""
                  width={200}
                  height={200}
                />
              </figure>
            ) : (
              <figure class="">
                <p class="font-black">Imagen del Producto</p>
                <img src={imgUrl.value} alt="" width={200} height={200} />
              </figure>
            )}

            <Label>Categoria</Label>
            <select
              class="select w-full max-w-xs bg-base-200"
              name="category"
              value={product.value.category}
            >
              {categories.value.map(({ id, name }) => (
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
              value={product.value.price}
            />

            <Label>Cantidad</Label>
            <input
              type="number"
              name="availability"
              placeholder="Cantidad disponible"
              min={1}
              class="input bg-base-200"
              value={product.value.availability}
            />

            <button type="submit" class="btn btn-success my-2">
              Editar Producto
            </button>
          </Form>
        </div>
      </div>
    </>
  );
});
