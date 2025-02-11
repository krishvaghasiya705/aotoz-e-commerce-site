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
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const products = response.data;
        console.log("Fetched products:", products);
        const banners = products.map((product) => ({
          imageUrl: product.image,
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
    <section className="overflow-hidden">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index}>
            <div className="bg-gray-300">
              <div
                className="relative h-[100vh] bg-right bg-no-repeat bg-auto mix-blend-multiply"
                style={{ backgroundImage: `url(${banner.imageUrl})` }}
              >
                <div className="absolute top-0 left-0 h-full flex flex-col justify-center w-full">
                  <div className="container">
                    <div className="grid grid-cols-2">
                      <div>
                        <h1 className="text-[48px] leading-[60px] font-bold font-playfair capitalize max-w-[700px] mb-[30px] line-clamp-2">
                          {banner.title}
                        </h1>
                        <p className="text-[20px] leading-[28px] font-semibold font-roboto max-w-[700px] line-clamp-3">
                          {banner.description}
                        </p>
                        <div className="flex gap-5 items-center mt-5">
                          <button className="py-2.5 px-10 border-[1px] border-black rounded-[6px] text-[18px] leading-[26px] font-semibold font-roboto text-white capitalize bg-black hover:bg-white hover:text-black trab">
                            shop now
                          </button>
                          <button className="py-2.5 px-10 border-[1px] border-black rounded-[6px] text-[18px] leading-[26px] font-semibold font-roboto text-black capitalize hover:bg-black hover:text-white">
                            new items
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
