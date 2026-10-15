import { useEffect, useState } from "react";
import { getElectronicsProducts } from "../services/productApi";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getElectronicsProducts(
          controller.signal
        );

        setProducts(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load products");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, []);

  return { products, loading, error };
}




