import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Header from "./common/header";
import Footer from "./common/footer";
import './App.css';
import Cart from "./pages/cart";

const App = () => {
  return (
    <div className="font-jaro">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;