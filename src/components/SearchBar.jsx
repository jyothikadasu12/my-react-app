export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search laptops, phones, tablets..."
      aria-label="Search products"
      className="w-full rounded-xl border bg-white px-4 py-3 outline-none focus:border-blue-500"
    />
  );
}