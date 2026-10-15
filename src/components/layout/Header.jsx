import { Link, NavLink } from "react-router-dom";
import { useStore } from "../../context/StoreContext";

export default function Header() {
  const { cartCount, user, dispatch } = useStore();

  const navClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium ${
      isActive
        ? "bg-blue-100 text-blue-700"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          TECHStore
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>

          <NavLink to="/cart" className={navClass}>
            Cart ({cartCount})
          </NavLink>
            
          {user ? (
            <>
              <span className="px-2 text-sm">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg px-3 py-2 text-sm hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className={navClass}>
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}