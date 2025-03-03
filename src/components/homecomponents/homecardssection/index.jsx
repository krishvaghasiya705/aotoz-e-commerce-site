import {
  Grid,
  Rating,
  Pagination,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import HeartIcon from "../../../assets/svg/HeartIcon";
import CartIcon from "../../../assets/svg/CartIcon";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

export default function HomeCardSection() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [productType, setProductType] = useState("");
  const [noDataFound, setNoDataFound] = useState(false);
  const [productTypes, setProductTypes] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const itemsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const responses = await Promise.all([
          axios.get(`https://dummyjson.com/products?limit=1000`),
        ]);
        const allProducts = responses.flatMap(
          (response) => response.data.products
        );
        const filteredProducts = allProducts.filter(
          (product) =>
            (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
              )) &&
            (productType ? product.tags.includes(productType) : true)
        );
        setProducts(
          filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        );
        setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
        setNoDataFound(filteredProducts.length === 0);

        // Extract unique product types
        const uniqueProductTypes = [
          ...new Set(allProducts.flatMap((product) => product.tags)),
        ];
        setProductTypes(uniqueProductTypes);

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
  }, [page, searchQuery, productType]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleProductTypeChange = (event) => {
    setProductType(event.target.value);
    setPage(1);
  };

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
        const response = await axios.get(
          `https://dummyjson.com/products/${productId}`
        );
        const product = response.data;
        cartItems.push({ ...product, quantity: 1 });
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

  return (
    <div className="py-[120px]">
      <div className="container">
        <div className="mb-4 flex justify-end gap-4">
          <div className="w-full max-w-[338px]">
            <TextField
              label="Search Products"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <SearchIcon style={{ marginRight: "8px" }} />,
              }}
            />
          </div>
          <FormControl variant="outlined" className="w-full max-w-[200px]">
            <InputLabel>
              {productType
                ? productType.charAt(0).toUpperCase() + productType.slice(1)
                : "Product Type"}
            </InputLabel>
            <Select
              value={productType}
              onChange={handleProductTypeChange}
              label={
                productType
                  ? productType.charAt(0).toUpperCase() + productType.slice(1)
                  : "Product Type"
              }
              autoSelect
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {productTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {loading ? (
            Array.from(new Array(itemsPerPage)).map((_, index) => (
              <div
                key={index}
                className="rounded-[16px] p-5 shadow-md border-[1px] border-[#00000014] animate-pulse"
              >
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton width="60%" />
                <Skeleton width="80%" />
                <Skeleton width="40%" />
              </div>
            ))
          ) : noDataFound ? (
            <div className="col-span-4 flex justify-center items-center py-10">
              <div className="rounded-[16px] p-5 shadow-md border-[1px] border-[#00000014] text-center">
                <h2 className="text-[18px] leading-[28px] font-semibold font-roboto text-black">
                  No Data Found
                </h2>
              </div>
            </div>
          ) : (
            products.map((product) => (
              <Link
                to={`/productcardsdetails/${product.id}/${product.title}`}
                key={product.id}
              >
                <div className="rounded-[16px] p-5 shadow-md border-[1px] border-[#00000014] grid grid-rows-[400px_1fr]">
                  <div className="relative group">
                    <div className="absolute top-[50%] translate-y-[-50%] right-2.5 z-[10] opacity-0 transition-all duration-500 group-hover:opacity-[1]">
                      <div
                        className="bg-[#000000b5] rounded-full w-[40px] h-[40px] cursor-pointer flex justify-center items-center"
                        onClick={() => handleLike(product)}
                      >
                        <div className="w-[25px] h-[25px]">
                          <HeartIcon
                            iconred={likedItems.some(
                              (item) => item.id === product.id
                            )}
                            iconwhite={
                              !likedItems.some((item) => item.id === product.id)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="absolute w-full h-full before:opacity-[1] before:z-[9] before:contents before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black"></div>
                    <div
                      className="bg-gray-200 w-full h-full rounded-[12px] bg-center bg-no-repeat bg-contain mix-blend-multiply"
                      style={{ backgroundImage: `url("${product.thumbnail}")` }}
                    ></div>
                  </div>
                  <div className="pt-2.5 flex flex-col justify-between gap-5">
                    <div>
                      <h2 className="text-[18px] leading-[28px] font-semibold font-roboto text-black line-clamp-1">
                        {product.title}
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
                            defaultValue={product.rating}
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
                                {product.discountPercentage}%
                              </span>
                            </button>
                          </div>
                          <h3 className="text-[28px] leading-[30px] font-roboto text-black font-semibold">
                            ${product.price}
                          </h3>
                        </div>
                        <button
                          className="border-none rounded-[8px] bg-blue-600 cursor-pointer p-2.5 flex justify-center items-center"
                          onClick={() => addToCart(product.id)}
                        >
                          <div className="w-[30px] h-[30px]">
                            <CartIcon iconwhite />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
