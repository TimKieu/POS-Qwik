import {
  type QwikSubmitEvent,
  component$,
  $,
  useContext,
  useTask$,
  useSignal,
} from '@builder.io/qwik';
import { Link, useLocation, useNavigate } from '@builder.io/qwik-city';
import { doc } from 'firebase/firestore';
import { Label } from '~/components/ui/Label';
import { getDB, getDocument } from '~/config/firebase';
import { ProductsContext } from '~/context/product/ProductsContext';
import { parseFormData } from '~/helpers';
import { useImage } from '~/hooks/useImage';
import type { Product as IProduct } from '~/types/Product';

export default component$(() => {
  const { categories, updateProduct } = useContext(ProductsContext);
  const { onFileChange, imgUrl, isImgUploaded } = useImage();

  const nav = useNavigate();
  const location = useLocation();

  // const db = useFirestore();

  const product = useSignal({} as IProduct);
  // const docRef = doc(db, 'product', location.params.id);

  const getDocProductRef = $(async () =>
    doc(await getDB(), 'product', location.params.id)
  );

  useTask$(async () => {
    const productFound = await getDocument(await getDocProductRef());

    if (!productFound) await nav('/admin/products/');

    product.value = productFound as IProduct;
  });

  const handleSubmit = $(async (e: QwikSubmitEvent<HTMLFormElement>) => {
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const payload = parseFormData(formData);

    const values = {
      ...payload,
      image: imgUrl.value,
    } satisfies Omit<IProduct, 'id'>;

    try {
      await updateProduct(await getDocProductRef(), values);

      // await rereadCurrentProducts();
      await nav('/admin/products/', true);
    } catch (error) {
      console.log(error);
    }
  });
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
          <form
            class="flex flex-col"
            onSubmit$={handleSubmit}
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
            <input
              type="file"
              name="image"
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
              {categories.map(({ id, name }) => (
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
          </form>
        </div>
      </div>
    </>
  );
});
