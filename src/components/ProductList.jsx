import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid, Rating } from "@mui/material";
import CartIcon from "../assets/svg/CartIcon";
import HeartIcon from "../assets/svg/HeartIcon";

const BACKENDLESS_URL =
  "https://api.backendless.com/78C4C319-125F-4394-8C37-49107C7D8A98/FAABB6D8-F052-4B82-B98E-15253B1DDBB3/data/Products";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(BACKENDLESS_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error);
    }
  };

  return (
    <div className="my-[50px]">
      <div className="container font-roboto">
        <h1 className="text-[30px] font-semibold text-black leading-[40px] mb-5">
          All Products
        </h1>
        <div className="grid grid-cols-4 gap-[20px]">
          {products.map((product) => (
            <div className="rounded-[16px] p-5 shadow-md border-[1px] border-[#00000014] grid grid-rows-[400px_1fr]">
              <div className="relative group">
                <div className="absolute top-[50%] translate-y-[-50%] right-2.5 z-[10] opacity-0 transition-all duration-500 group-hover:opacity-[1]">
                  <div
                    className="bg-[#000000b5] rounded-full w-[40px] h-[40px] cursor-pointer flex justify-center items-center"
                    onClick={() => handleLike(product)}
                  >
                    <div className="w-[25px] h-[25px]">
                      <HeartIcon iconwhite />
                    </div>
                  </div>
                </div>

                <div className="absolute w-full h-full before:opacity-[1] before:z-[9] before:contents before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black"></div>
                <div className="w-full h-full bg-gray-200 rounded-[12px]">
                  <div
                    className="w-full h-full bg-center bg-no-repeat bg-contain mix-blend-multiply"
                    style={{
                      backgroundImage: `url("${product.imageUrls[0]}")`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="pt-2.5 flex flex-col justify-between gap-5">
                <div>
                  <h2 className="text-[18px] leading-[28px] font-semibold font-roboto text-black line-clamp-1">
                    {product.name}
                  </h2>
                  <p className="text-[14px] leading-[24px] font-semibold font-roboto text-black line-clamp-3">
                    {product.description}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-5 mb-2.5">
                    <div className="cards-rating">
                      <Rating
                        name="half-rating"
                        defaultValue={product.ratings}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-[30px]">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <del className="text-[16px] font-semibold font-roboto opacity-50">
                          ${parseFloat(product.price + 20).toFixed(2)}
                        </del>
                        <button className="border-none rounded-[3px] bg-blue-200 p-[3px]">
                          <span className="text-blue-600 text-[12px] font-semibold font-roboto block">
                            {product.discount}%
                          </span>
                        </button>
                      </div>
                      <h3 className="text-[28px] leading-[30px] font-roboto text-black font-semibold">
                        ${product.price}
                      </h3>
                    </div>
                    <button className="border-none rounded-[8px] bg-blue-600 cursor-pointer p-2.5 flex justify-center items-center">
                      <div className="w-[30px] h-[30px]">
                        <CartIcon iconwhite />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
