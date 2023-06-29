import { Form, Link, routeAction$ } from '@builder.io/qwik-city';
import { $, component$ } from '@builder.io/qwik';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { getDB, getFirebaseStorage } from '~/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { products } from '~/data/products';
import { useSignal } from '@builder.io/qwik';

export const useSeedProducts = routeAction$(async () => {
  const productsCollection = collection(await getDB(), 'products');
  for (let i = 1; i < products.length; i++) {
    const url = await getDownloadURL(
      ref(await getFirebaseStorage(), `products/producto${i}.jpg`)
    );
    await addDoc(productsCollection, {
      name: products[i - 1].name,
      price: products[i - 1].price,
      availability: products[i - 1].availability,
      category: products[i - 1].category,
      image: url,
    })
      .then(() => {
        console.log('Producto Agregado...');
      })
      .catch((error) => {
        console.error(error);
      });
    if (i === products.length - 1) {
      return {
        msg: 'Se subieron los Productos',
      };
    }
  }
});

export default component$(() => {
  const multipleFiles = useSignal<Element | undefined>(undefined);

  const handleSubmit = $(() => {
    const urls = [];
    const inputFiles = multipleFiles.value as HTMLInputElement;

    if (!inputFiles.files) return;

    const images = Object.values(inputFiles.files);
    images.forEach(async (fileItem) => {
      const storageRef = ref(await getFirebaseStorage(), '/products');

      // Upload the file to Firebase Storage
      const uploadTask = uploadBytesResumable(
        ref(storageRef, fileItem.name),
        fileItem
      );
      // Monitor the upload progress and retrieve the download URL
      uploadTask.on(
        'state_changed',
        () => {
          // Upload progress can be monitored here
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Upload is complete, get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            urls.push(downloadURL);
            if (urls.length === images.length) {
              alert('Se subieron las imágenes');
            }
          });
        }
      );
    });
  });
  const seedProducts = useSeedProducts();
  return (
    <>
      <div class="mt-10">
        <Link href="/admin/products/">Volver</Link>

        <h1 class="text-4xl my-10 font-extrabold">Seeder</h1>

        <div class="flex justify-center bg-white shadow">
          <div class="mx-auto mt-10 p-10 w-full 2xl:w-2/4">
            <form
              class="flex flex-col gap-4"
              onSubmit$={handleSubmit}
              preventdefault:submit
            >
              <input
                type="file"
                accept=".jpg"
                class="file-input file-input-bordered file-input-md w-full max-w-xs"
                name="images"
                ref={multipleFiles}
                multiple
              />
              <button type="submit" class="btn btn-success">
                Agregar Imagen
              </button>
            </form>
            <Form class="mt-8 flex" action={seedProducts}>
              <button type="submit" class="btn btn-success w-full">
                Agregar Productos
              </button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
});
