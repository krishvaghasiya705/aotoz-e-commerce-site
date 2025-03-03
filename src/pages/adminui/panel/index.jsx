import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/config";
import Produpdate from "../proupdatepage";

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8 font-roboto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Admin Dashboard
          </h1>
          {!isAuthenticated ? (
            <div className="bg-white shadow rounded-lg p-6">
              <form onSubmit={handleLogin}>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full"
                    required
                  />
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Login
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-gray-600">Welcome to the admin panel!</p>
              <Produpdate />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
