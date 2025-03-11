import React from "react";
import HomeCardSection from "../../components/homecomponents/homecardssection";
import HomeHerobanner from "../../components/homecomponents/homeherobanner";
import HomeSliderSection from "../../components/homecomponents/homeslidersection";
import ProductForm from "../../components/AddProduct";
import ProductList from "../../components/ProductList";

const Home = () => {
  return (
    <>
      <HomeHerobanner />
      <HomeCardSection />
      <HomeSliderSection />

      <ProductList />
      <ProductForm />
    </>
  );
};

export default Home;
