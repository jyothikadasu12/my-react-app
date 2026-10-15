import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export default function CheckoutPage() {
  const { cart, cartTotal, dispatch, user } = useStore();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.name || "");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  if (cart.length === 0) {
    return (
      <section className="rounded-2xl border bg-white p-8">
        <h1 className="text-2xl font-bold">Nothing to check out</h1>
        <p className="mt-2 text-slate-500">
          Add a product before proceeding to checkout.
        </p>
        <Link to="/" className="mt-4 inline-block text-blue-700 underline">
          Browse devices
        </Link>
      </section>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!fullName.trim() || !address.trim()) {
      setMessage("Please complete all fields.");
      return;
    }

    // Demo only: no order is sent to a backend or payment provider.
    dispatch({ type: "CLEAR_CART" });
    navigate("/", { replace: true });
    window.alert("Demo order completed. No real purchase was made.");
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
      <div className="rounded-2xl border bg-white p-6">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="fullName" className="mb-1 block text-sm font-medium">
              Full name
            </label>

            <input
              id="fullName"
              required
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label htmlFor="address" className="mb-1 block text-sm font-medium">
              Delivery address
            </label>

            <textarea
              id="address"
              required
              rows={3}
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="w-full rounded-xl border px-4 py-3"
            />
          </div>

          {message && (
            <p role="alert" className="text-sm text-red-600">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white"
          >
            Place Demo Order
          </button>
        </form>
      </div>

      <aside className="h-fit rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-bold">Order summary</h2>

        {cart.map((item) => (
          <div key={item.id} className="mt-4 flex justify-between gap-4 text-sm">
            <span>{item.title} × {item.quantity}</span>
            <span>
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}

        <div className="mt-5 flex justify-between border-t pt-4 font-bold">
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Demo checkout only. No payment is collected and no order is stored.
        </p>
      </aside>
    </section>
  );
}