import {
  Resource,
  component$,
  useContext,
  useResource$,
} from '@builder.io/qwik';
import type { Product } from '~/types/Product';
import { formatCurrency } from '../../helpers/index';
import { CartContext } from '~/context/cart/CartContext';

export interface ShoppingCartItemProps {
  product: Product;
}

export const ShoppingCartItem = component$<ShoppingCartItemProps>(
  ({ product }) => {
    const { checkProductAvailability } = useContext(CartContext);

    const quantityResource = useResource$(async () => {
      return [...Array(await checkProductAvailability.value(product)).keys()];
    });

    return (
      <li class="flex space-x-6 py-6">
        <figure class="flex">
          <img
            src={product.image}
            alt=""
            width={150}
            height={150}
            class="flex-none rounded-md"
          />
        </figure>

        <div class="flex-auto space-y-2">
          <h3 class="text-gray-900">{product.name}</h3>
          {/* <p>Cantidad: {product.}</p> */}
          <p>{formatCurrency(product.price)}</p>

          <select class="select w-full max-w-xs">
            <option disabled selected>
              Selecciona la cantidad
            </option>
            <Resource
              value={quantityResource}
              onResolved={(arrOfQuantities) => {
                return (
                  <>
                    {arrOfQuantities.map((n) => {
                      return <option value={n} key={n}>{`${n + 1}`}</option>;
                    })}
                  </>
                );
              }}
            />
          </select>
        </div>
      </li>
    );
  }
);
