import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrowicon from "../../../assets/svg/Arrowicon";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-next" onClick={onClick}>
      <Arrowicon />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      <Arrowicon />
    </div>
  );
}

export default function HomeHerobanner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/search?q=phone")
      .then((response) => {
        const products = response.data.products;
        console.log("Fetched products:", products);
        const banners = products.map((product) => ({
          imageUrl: product.thumbnail,
          altText: product.title,
          title: product.title,
          description: product.description,
        }));
        setBanners(banners);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: "linear",
  };

  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index}>
            <div
              className="relative h-[600px] bg-gray-300 bg-center bg-no-repeat bg-contain mix-blend-multiply"
              style={{ backgroundImage: `url(${banner.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 text-white p-4">
                <div className="container h-full">
                  <div className="flex flex-col justify-center items-center h-full text-center">
                    <h2 className="text-4xl font-bold mb-2 font-roboto">
                      {banner.title}
                    </h2>
                    <p className="text-lg font-roboto">{banner.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
