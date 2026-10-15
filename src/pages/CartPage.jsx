import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export default function CartPage() {
  const { cart, cartTotal, dispatch } = useStore();

  if (cart.length === 0) {
    return (
      <section className="rounded-2xl border bg-white p-10 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-slate-500">
          Find a device you like and add it to your cart.
        </p>

        <Link
          to="/"
          className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 text-white"
        >
          Browse products
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">Your cart</h1>

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {cart.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border bg-white p-4 sm:flex-row sm:items-center"
            >
              <img
                src={item.thumbnail || item.images?.[0]}
                alt={item.title}
                className="h-24 w-24 object-contain"
              />

              <div className="flex-1">
                <Link
                  to={`/products/${item.id}`}
                  className="font-semibold hover:text-blue-700"
                >
                  {item.title}
                </Link>

                <p className="mt-1 text-slate-500">
                  ${Number(item.price).toFixed(2)} each
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  aria-label={`Decrease quantity of ${item.title}`}
                  onClick={() =>
                    dispatch({
                      type: "DECREASE_QUANTITY",
                      id: item.id,
                    })
                  }
                  className="rounded-lg border px-3 py-2"
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  aria-label={`Increase quantity of ${item.title}`}
                  onClick={() =>
                    dispatch({
                      type: "INCREASE_QUANTITY",
                      id: item.id,
                    })
                  }
                  className="rounded-lg border px-3 py-2"
                >
                  +
                </button>
              </div>

              <button
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    id: item.id,
                  })
                }
                className="text-sm text-red-600 underline"
              >
                Remove
              </button>
            </article>
          ))}
        </div>

        <aside className="rounded-2xl border bg-white p-5">
          <h2 className="text-xl font-bold">Order summary</h2>

          <div className="mt-4 flex justify-between">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Sample prices. Taxes and shipping are not included.
          </p>

          <Link
            to="/checkout"
            className="mt-6 block rounded-xl bg-blue-600 px-4 py-3 text-center font-semibold text-white"
          >
            Proceed to Checkout
          </Link>

          <button
            onClick={() => dispatch({ type: "CLEAR_CART" })}
            className="mt-3 w-full text-sm text-red-600 underline"
          >
            Clear cart
          </button>
        </aside>
      </div>
    </section>
  );
}