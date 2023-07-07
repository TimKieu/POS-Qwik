import {
  component$,
  useComputed$,
  useContext,
  useVisibleTask$,
} from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import { ProductCard } from '~/components/product/ProductCard';
import { ShoppingCart } from '~/components/product/ShoppingCart';
import { ProductsContext } from '~/context/product/ProductsContext';
import { getProductsByCategory } from '~/helpers/products';

export const useProductsLoader = routeLoader$(({ query }) => {
  const categoryId = query.get('category');

  console.log({
    categoryId,
  });
  // by default, show products from category 1
  if (!categoryId) return getProductsByCategory(2);

  return getProductsByCategory(Number(categoryId));
});

export default component$(() => {
  const products = useProductsLoader();
  const isResultsEmpty = useComputed$(() => products.value.length === 0);
  const { categorySelected } = useContext(ProductsContext);
  const loc = useLocation();

  useVisibleTask$(() => {
    const category = Number(loc.url.searchParams.get('category'));
    categorySelected.value = category;
  });

  return (
    <main class="pt-10 lg:flex lg:h-screen lg:overflow-y-hidden">
      <section class="lg:w-2/3 lg:h-screen lg:overflow-y-scroll py-24 px-10">
        {isResultsEmpty.value ? (
          <p class="text-center text-4xl">No hay productos</p>
        ) : (
          <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
            {products.value.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        )}
      </section>
      <aside class="lg:w-1/3 lg:h-screen lg:overflow-y-scroll py-24 px-10">
        <ShoppingCart />
      </aside>
    </main>
  );
});
