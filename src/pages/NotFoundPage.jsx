import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="rounded-2xl border bg-white p-10 text-center">
      <p className="text-sm font-semibold text-blue-700">404</p>

      <h1 className="mt-2 text-3xl font-bold">Page not found</h1>

      <p className="mt-3 text-slate-500">
        The page you requested does not exist.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 text-white"
      >
        Return to TECHStore
      </Link>
    </section>
  );
}