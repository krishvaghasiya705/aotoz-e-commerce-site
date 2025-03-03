import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrowicon from "../../../assets/svg/Arrowicon";
import HeartIcon from "../../../assets/svg/HeartIcon";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-next !hidden" onClick={onClick}>
      <Arrowicon />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-prev !hidden" onClick={onClick}>
      <Arrowicon />
    </div>
  );
}

export default function HomeHerobanner() {
  const [banners, setBanners] = useState([]);
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const products = response.data;
        const banners = products.map((product) => ({
          id: product.id,
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

    const savedLikedItems = localStorage.getItem("likedItems");
    if (savedLikedItems) {
      setLikedItems(JSON.parse(savedLikedItems));
    }
  }, []);

  const handleLike = (banner) => {
    let updatedLikedItems;
    if (likedItems.some((item) => item.id === banner.id)) {
      updatedLikedItems = likedItems.filter((item) => item.id !== banner.id);
    } else {
      updatedLikedItems = [...likedItems, banner];
    }
    setLikedItems(updatedLikedItems);
    localStorage.setItem("likedItems", JSON.stringify(updatedLikedItems));
    window.dispatchEvent(new Event("likeChange"));
  };

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
    pauseOnHover: false,
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
                          <button
                            className="p-2.5 border-[1px] border-black rounded-[6px]"
                            onClick={() => handleLike(banner)}
                          >
                            <div className="w-[26px] h-[26px]">
                              <HeartIcon
                                iconred={likedItems.some(
                                  (item) => item.id === banner.id
                                )}
                                iconblack={
                                  !likedItems.some(
                                    (item) => item.id === banner.id
                                  )
                                }
                              />
                            </div>
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
