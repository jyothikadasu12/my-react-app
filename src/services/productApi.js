const BASE_URL = "https://dummyjson.com/products";

const ELECTRONICS_CATEGORIES = [
  "laptops",
  "smartphones",
  "tablets",
  "mobile-accessories",
];

// Fetch products from one category.
async function fetchCategory(category, signal) {
  const response = await fetch(
    `${BASE_URL}/category/${category}?limit=100`,
    { signal }
  );

  if (!response.ok) {
    throw new Error(`Failed to load ${category}`);
  }

  const data = await response.json();
  return data.products;
}

// Fetch and combine all selected electronics categories.
export async function getElectronicsProducts(signal) {
  const results = await Promise.all(
    ELECTRONICS_CATEGORIES.map((category) =>
      fetchCategory(category, signal)
    )
  );

  return results.flat();
}

// Fetch one product for the product details page.
export async function getProductById(id, signal) {
  const response = await fetch(`${BASE_URL}/${id}`, { signal });

  if (!response.ok) {
    throw new Error("Product not found");
  }

  return response.json();
}