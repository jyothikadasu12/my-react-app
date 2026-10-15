import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function StoreLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t bg-white px-4 py-6 text-center text-sm text-slate-500">
        TECHStore — Demo electronics shopping experience
      </footer>
    </div>
  );
}