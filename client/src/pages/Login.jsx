import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        { username, password }
      );
      if (response.data.message) {
        setNotification({ type: "error", message: response.data.message });
      } else {
        setCookie("token", response.data.token, { path: "/" });
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/");
      }
    } catch (err) {
      setNotification({ type: "error", message: "Invalid credentials." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e2f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-black bg-opacity-50 backdrop-blur-md rounded-2xl p-8 shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-bold text-indigo-400">
          Sign in to Recipe Book
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-t-xl relative block w-full px-3 py-2 bg-[#2a2a3a] border border-gray-700 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-b-xl relative block w-full px-3 py-2 bg-[#2a2a3a] border border-gray-700 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
          {notification && (
            <div
              className={`text-center px-4 py-2 rounded-xl ${
                notification.type === "error"
                  ? "bg-red-600 text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              {notification.message}
            </div>
          )}

          <div className="text-sm text-center text-gray-400">
            Not a user?{' '}
            <NavLink to="/register" className="text-indigo-400 hover:text-indigo-300">
              Register now
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}