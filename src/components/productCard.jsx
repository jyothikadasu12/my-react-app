import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export default function ProductCard({ product }) {
  const { dispatch } = useStore();

  function handleAddToCart() {
    dispatch({
      type: "ADD_TO_CART",
      product,
    });
  }

  return (
    <article className="flex flex-col rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link to={`/products/${product.id}`}>
        <div className="flex h-48 items-center justify-center">
          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            loading="lazy"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <h2 className="mt-4 line-clamp-2 min-h-12 font-semibold">
          {product.title}
        </h2>
      </Link>

      <p className="mt-2 text-sm capitalize text-slate-500">
        {product.category?.replaceAll("-", " ")}
      </p>

      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-xl font-bold">
          ${Number(product.price).toFixed(2)}
        </span>

        <span className="text-sm text-amber-600">
          ★ {product.rating ?? "N/A"}
        </span>
      </div>

      <p className="mt-2 text-sm text-slate-500">
        {product.stock > 0
          ? `${product.stock} listed in sample stock`
          : "Out of sample stock"}
      </p>

      <button
        disabled={!product.stock}
        onClick={handleAddToCart}
        className="mt-4 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Add to Cart
      </button>
    </article>
  );
}