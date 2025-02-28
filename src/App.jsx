import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import Home from "./pages/home";
import Header from "./common/header";
import Footer from "./common/footer";
import "./App.css";
import Cart from "./pages/cart";
import Formpage from "./pages/form";
import Liked from "./pages/like";
import Homecardsdetails from "./pages/homecardsdetails";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";

// Layout for authenticated users
const MainLayout = ({ children }) => (
  <div className="font-jaro">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

// Layout for non-authenticated users
const AuthLayout = () => (
  <div className="font-jaro">
    <main className="auth-layout">
      <Outlet />
    </main>
  </div>
);

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
      }
      setIsValidating(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [navigate]);

  if (isValidating) {
    return <div>Loading...</div>; // Or your loading component
  }

  return isAuthenticated ? <MainLayout>{children}</MainLayout> : null;
};

const App = () => {
  // useEffect(() => {
  //   var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
  //   (function(){
  //     var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
  //     s1.async = true;
  //     s1.src = 'https://embed.tawk.to/67b4212d167f1f1900573b77/1ikcffqg1';
  //     s1.charset = 'UTF-8';
  //     s1.setAttribute('crossorigin', '*');
  //     s0.parentNode.insertBefore(s1, s0);
  //   })();
  // }, []);

  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/liked"
        element={
          <ProtectedRoute>
            <Liked />
          </ProtectedRoute>
        }
      />
      <Route
        path="/formpage"
        element={
          <ProtectedRoute>
            <Formpage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/productcardsdetails/:productId/:productTitle"
        element={
          <ProtectedRoute>
            <Homecardsdetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
