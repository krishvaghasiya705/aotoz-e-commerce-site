import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Header from "./common/header";
import Footer from "./common/footer";
import './App.css';
import Cart from "./pages/cart";
import Formpage from "./pages/form";
import Liked from "./pages/like";

const App = () => {
  useEffect(() => {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function(){
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/67b4212d167f1f1900573b77/1ikbq37ed';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  return (
    <div className="font-jaro">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/formpage" element={<Formpage />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;