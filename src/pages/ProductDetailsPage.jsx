import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getProductById } from "../services/productApi";
import { useStore } from "../context/StoreContext";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const { dispatch } = useStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      setLoading(true);
      setError("");
      setProduct(null);

      try {
        const data = await getProductById(
          productId,
          controller.signal
        );

        setProduct(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Could not load this product.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => controller.abort();
  }, [productId]);

  if (loading) return <p>Loading product...</p>;

  if (error || !product) {
    return (
      <div>
        <p>{error || "Product not found."}</p>
        <Link to="/">Back to store</Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 rounded-2xl border bg-white p-6 md:grid-cols-2">
      <div className="flex min-h-72 items-center justify-center">
        <img
          src={product.images?.[0] || product.thumbnail}
          alt={product.title}
          className="max-h-96 max-w-full object-contain"
        />
      </div>

      <div>
        <p className="text-sm capitalize text-slate-500">
          {product.category}
        </p>

        <h1 className="mt-2 text-3xl font-bold">{product.title}</h1>

        <p className="mt-4 text-slate-600">{product.description}</p>

        <p className="mt-5 text-3xl font-bold">
          ${Number(product.price).toFixed(2)}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Sample rating: {product.rating ?? "N/A"}
        </p>

        <button
          disabled={!product.stock}
          onClick={() =>
            dispatch({ type: "ADD_TO_CART", product })
          }
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300"
        >
          Add to Cart
        </button>

        <div>
          <Link
            to="/cart"
            className="mt-4 inline-block text-blue-700 underline"
          >
            View cart
          </Link>
        </div>
      </div>
    </div>
  );
}