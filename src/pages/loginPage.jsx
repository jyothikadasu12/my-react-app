import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { dispatch } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const destination = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Enter both email and password.");
      return;
    }

    dispatch({
      type: "LOGIN",
      user: {
        name: email.split("@")[0],
        email,
      },
    });

    navigate(destination, { replace: true });
  }

  return (
    <section className="mx-auto max-w-md rounded-2xl border bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-bold">Welcome back</h1>

      <p className="mt-2 text-slate-500">
        Sign in to continue to checkout.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>

          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>

          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white"
        >
          Demo Login
        </button>
      </form>

      <p className="mt-4 text-xs text-slate-500">
        This is a frontend demo; it does not verify credentials.
      </p>

      <Link to="/" className="mt-4 inline-block text-blue-700 underline">
        Back to store
      </Link>
    </section>
  );
}