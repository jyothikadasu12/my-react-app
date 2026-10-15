import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import useProducts from "../hooks/useProducts";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/productCard";

export default function HomePage() {
  const { products, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") || "";
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    result = [...result];

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (sortBy === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, search, category, sortBy]);

  function handleSearch(value) {
    const next = new URLSearchParams(searchParams);

    if (value.trim()) {
      next.set("q", value);
    } else {
      next.delete("q");
    }

    setSearchParams(next, { replace: true });
  }

  return (
    <section>
      <div className="mb-8 rounded-3xl bg-slate-900 px-6 py-10 text-white md:px-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
          Devices for your everyday life
        </p>

        <h1 className="mt-3 text-3xl font-bold md:text-5xl">
          Find your next device.
        </h1>

        <p className="mt-3 max-w-xl text-slate-300">
          Explore laptops, smartphones, tablets and mobile accessories
          in one place.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <div className="flex-1">
          <SearchBar value={search} onChange={handleSearch} />
        </div>

        <CategoryFilter value={category} onChange={setCategory} />

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          aria-label="Sort products"
          className="rounded-xl border bg-white px-4 py-3"
        >
          <option value="featured">Default order</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
          <option value="rating">Top sample rating</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      {loading && (
        <p className="py-12 text-center">Loading devices...</p>
      )}

      {error && (
        <div role="alert" className="rounded-xl bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Explore devices</h2>
            <span className="text-sm text-slate-500">
              {visibleProducts.length} products
            </span>
          </div>

          {visibleProducts.length === 0 ? (
            <div className="rounded-xl border bg-white p-10 text-center">
              <h3 className="font-semibold">No products found</h3>
              <p className="mt-2 text-slate-500">
                Try another search or category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}