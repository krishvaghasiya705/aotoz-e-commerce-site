import React from "react";
import HomeCardSection from "../../components/homecomponents/homecardssection";
import HomeHerobanner from "../../components/homecomponents/homeherobanner";
import HomeSliderSection from "../../components/homecomponents/homeslidersection";

const Home = () => {

  return (
    <>
      <HomeHerobanner />
      <HomeCardSection />
      <HomeSliderSection />
    </>
  );
};

export default Home;
