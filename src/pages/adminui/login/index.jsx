import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../../firebase/config";
import Adminui from "../main";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Check for admin credentials
    if (email === "admin@gmail.com" && password === "7874982802") {
      try {
        await setPersistence(auth, browserLocalPersistence);
        await signInWithEmailAndPassword(auth, email, password);
        setIsLoggedIn(true);
        console.log("Logged in successfully");
        navigate("/adminpanel", { replace: true });
      } catch (error) {
        console.error("Login error:", error);
        setError("Authentication failed. Please try again.");
      }
    } else {
      setError("Invalid admin credentials");
    }
    setLoading(false);
  };

  // Show loading spinner while checking auth state
  if (!authChecked) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-blue-500 text-lg text-center animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (isLoggedIn) {
    return <Adminui />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white text-base transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
