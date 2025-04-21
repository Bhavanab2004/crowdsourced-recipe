import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://crowdsourced-recipe.onrender.com/auth/register", {
        email,
        username,
        password,
      });
      setNotification({ type: response.data.color === "red" ? "error" : "success", message: response.data.message });
      if (response.data.color !== "red") {
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", message: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e2f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-black bg-opacity-50 backdrop-blur-md rounded-2xl p-8 shadow-lg">
        <h2 className="text-center text-3xl font-bold text-indigo-400 mb-4">
          Register for Recipe Book
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-xl bg-[#2a2a3a] border border-gray-700 py-2 px-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-200">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-xl bg-[#2a2a3a] border border-gray-700 py-2 px-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-xl bg-[#2a2a3a] border border-gray-700 py-2 px-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Minimum 6 characters"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
          {notification && (
            <div className={`text-center px-4 py-2 rounded-xl ${
              notification.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
            }`}>
              {notification.message}
            </div>
          )}
          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <NavLink to="/login" className="text-indigo-400 hover:text-indigo-300">
              Sign In
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}