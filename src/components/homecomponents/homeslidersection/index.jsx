import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrowicon from "../../../assets/svg/Arrowicon";
import { Rating } from "@mui/material";
import axios from "axios";
import HeartIcon from "../../../assets/svg/HeartIcon";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow slick-next !flex items-center justify-center !w-10 !h-10 !bg-white !rounded-full !shadow-lg hover:!bg-gray-50 transition-all"
      onClick={onClick}
    >
      <Arrowicon />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow slick-prev !flex items-center justify-center !w-10 !h-10 !bg-white !rounded-full !shadow-lg hover:!bg-gray-50 transition-all"
      onClick={onClick}
    >
      <Arrowicon className="rotate-180" />
    </div>
  );
}

export default function HomeSliderSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noDataFound, setNoDataFound] = useState(false);
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const allProducts = response.data;
        setProducts(allProducts);
        setNoDataFound(allProducts.length === 0);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
    const savedLikedItems = localStorage.getItem("likedItems");
    if (savedLikedItems) {
      setLikedItems(JSON.parse(savedLikedItems));
    }
  }, []);

  const addToCart = async (productId) => {
    try {
      const savedCartItems = localStorage.getItem("cartItems");
      const cartItems = savedCartItems ? JSON.parse(savedCartItems) : [];
      const existingProductIndex = cartItems.findIndex(
        (item) => item.id === productId
      );

      if (existingProductIndex !== -1) {
        cartItems[existingProductIndex].quantity += 1;
      } else {
        const product = products.find((item) => item.id === productId);
        if (product) {
          cartItems.push({ ...product, quantity: 1 });
        }
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      window.dispatchEvent(new Event("cartChange"));
      console.log("Product added to cart:", cartItems);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleLike = (product) => {
    let updatedLikedItems;
    if (likedItems.some((item) => item.id === product.id)) {
      updatedLikedItems = likedItems.filter((item) => item.id !== product.id);
    } else {
      updatedLikedItems = [...likedItems, product];
    }
    setLikedItems(updatedLikedItems);
    localStorage.setItem("likedItems", JSON.stringify(updatedLikedItems));
    window.dispatchEvent(new Event("likeChange"));
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-12 px-4 bg-gray-50 font-jaro">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 font-playfair">
          Featured Products
        </h2>
        {loading ? (
          <div>Loading...</div>
        ) : noDataFound ? (
          <div>No Data Found</div>
        ) : (
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id}>
                <div className="p-4 mx-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 font-roboto">
                  <div className="relative group">
                    <div className="h-[250px] w-full bg-gray-50 rounded-lg overflow-hidden">
                      <div
                        className="w-full h-full bg-center bg-no-repeat bg-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                        style={{
                          backgroundImage: `url(${product.image})`,
                        }}
                      ></div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                        onClick={() => handleLike(product)}
                      >
                        <div className="h-5 w-5">
                          <HeartIcon
                            iconred={likedItems.some(
                              (item) => item.id === product.id
                            )}
                            iconblack={
                              !likedItems.some((item) => item.id === product.id)
                            }
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900 line-clamp-2 h-14">
                      {product.title}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </p>
                      <div className="flex items-center">
                        <Rating
                          name="half-rating"
                          defaultValue={product.rating.rate}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                      </div>
                    </div>
                    <button
                      className="mt-4 w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors"
                      onClick={() => addToCart(product.id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}
