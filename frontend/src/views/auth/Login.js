import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "../../Axios";
import sofac from "../../assets/img/sofac.png";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { Login, user, token } = useAuth();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [formData, setFormData] = useState({ username: "", password: "" });

  if (token && user) {
    return <Redirect to="/admin/dashboard" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("login", formData);
      Login(response.data);
      setMessage("Logged in successfully!");
      setMessageType("success");
      setTimeout(() => (window.location.href = "/admin/dashboard"), 1500);
    } catch (error) {
      setMessage(error.response?.data || "Login failed. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 space-y-6">
        <div className="text-center">
          <img src={sofac} alt="Logo" className="mx-auto h-16 w-auto" />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Sign in to your account
          </h2>
        </div>

        {message && (
          <div
            className={`text-center py-2 rounded ${
              messageType === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-500 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
