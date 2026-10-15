const categories = [
  { value: "all", label: "All devices" },
  { value: "laptops", label: "Laptops" },
  { value: "smartphones", label: "Smartphones" },
  { value: "tablets", label: "Tablets" },
  { value: "mobile-accessories", label: "Accessories" },
];

export default function CategoryFilter({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Filter by category"
      className="rounded-xl border bg-white px-4 py-3"
    >
      {categories.map((category) => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  );
}