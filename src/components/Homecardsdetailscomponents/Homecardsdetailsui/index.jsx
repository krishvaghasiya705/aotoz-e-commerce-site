import React, { useState, useMemo, useCallback } from "react";
import { Rating } from "@mui/material";
import GlassImage from "../../../assets/images/glass.gif";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function Homecardsdetailsui({ product }) {
  const [magnifyStyle, setMagnifyStyle] = useState({ display: "none" });
  const [magnifyStyle2, setMagnifyStyle2] = useState({ display: "none" });
  const [mainImage, setMainImage] = useState(
    product.thumbnail || product.image || (product.images && product.images[0])
  );

  const ratingPercentages = useMemo(() => {
    const totalRatings = product.reviews.length;
    return [5, 4, 3, 2, 1].map((rating) => ({
      rating,
      percentage: Math.round(
        (product.reviews.filter((review) => review.rating === rating).length /
          totalRatings) *
          100
      ),
    }));
  }, [product.reviews]);

  const productImages = useMemo(() => {
    if (!product.images) return [product.thumbnail];
    return Array.isArray(product.images) ? product.images : [product.thumbnail];
  }, [product]);

  const handleMouseMove = useCallback((e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;

    const newLeft = Math.max(0, Math.min(x - 50, width - 100, 301));
    const newTop = Math.max(0, Math.min(y - 50, height - 100, 400));

    const imageX = (x / width) * 100;
    const imageY = (y / height) * 100;

    setMagnifyStyle({
      display: "block",
      left: `${newLeft}px`,
      top: `${newTop}px`,
    });

    setMagnifyStyle2({
      display: "block",
      transform: 'scale(1)',
      transformOrigin: `${imageX}% ${imageY}%`,
    });
  }, []);

  const handleMouseLeave = () => {
    setMagnifyStyle({ display: "none" });
    setMagnifyStyle2({ display: "none" });
  };

  const handleImageChange = (image) => {
    setMainImage(image);
  };

  const calculateRatingPercentage = (rating) => {
    const totalRatings = product.reviews.length;
    const ratingCount = product.reviews.filter(
      (review) => review.rating === rating
    ).length;
    return Math.round((ratingCount / totalRatings) * 100);
  };

  const handleAddToCart = useCallback(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartChange"));
  }, [product]);

  const RatingBar = ({ rating, percentage }) => (
    <div className="flex items-center gap-2.5">
      <span className="text-sm leading-6 font-roboto text-[#2162A1] font-sembold">
        {rating} Star
      </span>
      <div className="border border-black rounded-md w-full max-w-[190px] h-5 overflow-hidden">
        <div
          className="w-full h-full bg-[#faaf00]"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="text-sm leading-6 font-roboto text-[#2162A1] font-sembold">
        {percentage}%
      </span>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="border shadow-lg mb-5 rounded-lg bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-6">
          <div className="w-full grid grid-cols-[50px_1fr] gap-2.5">
            <div>
              <div className="flex flex-col gap-2.5 sticky top-[80px] left-0">
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    className={`w-[40px] h-[40px] rounded-lg border cursor-pointer ${
                      mainImage === image
                        ? "border-blue-500"
                        : "border-gray-300"
                    } bg-gray-200`}
                    onMouseEnter={() => handleImageChange(image)}
                    onClick={() => handleImageChange(image)}
                  >
                    <img
                      src={image}
                      alt={`Product view ${index + 1}`}
                      className="h-full w-full object-contain mix-blend-multiply"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full relative mb-6 md:mb-0 h-[400px] md:h-[600px] rounded-lg shadow-lg border bg-gray-200 cursor-pointer">
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-full object-contain rounded-lg mix-blend-multiply"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
              <div
                className="absolute w-full h-full max-w-[300px] max-h-[200px] pointer-events-none z-10 !bg-center rounded-lg cursor-pointer"
                style={{
                  ...magnifyStyle,
                  backgroundImage: `url(${GlassImage})`,
                }}
              />
            </div>
          </div>
          <div className="w-full h-full relative">
            <div className="w-full pl-0 md:pl-6 sticky top-[80px] left-0 font-roboto">
              <h1 className="text-3xl font-bold mb-2 text-gray-800">
                {product.title}
              </h1>
              <p className="text-lg mb-4 font-roboto text-gray-600">
                {product.description}
              </p>
              <div className="flex items-end gap-2.5 mb-4 font-roboto border-t pt-5">
                <span className="text-[20px] text-red-600 font-semibold">
                  -<del>{product.discountPercentage}</del>%
                </span>
                <span className="text-2xl text-black font-bold">
                  ${product.price}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="font-bold text-gray-700">Category :</span>
                  {product.category}
                </div>
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="font-bold text-gray-700">Stock :</span>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div>
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className="font-bold text-gray-700">Tags :</span>
                    <div className="flex items-center gap-1">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-white bg-gray-500 px-2 rounded-lg cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <Rating
                      name="half-rating"
                      defaultValue={product.rating}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-gray-700 text-[16px]">
                      Rating :
                    </span>
                    <span className="font-normal text-gray-700 text-[16px]">
                      {product.rating} / 5
                    </span>
                  </div>
                  <div>
                    <p className="font-normal text-gray-700 text-[16px]">
                      {product.returnPolicy}
                    </p>
                  </div>
                </div>
              </div>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg transition duration-300"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
            <div
              className="absolute top-0 left-0 w-full h-full max-w-[600px] max-h-[600px] border overflow-hidden bg-gray-200 rounded-xl"
              style={{ ...magnifyStyle2 }}
            >
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-full object-cover rounded-lg mix-blend-multiply !scale-[1.5]"
                style={{
                  transition: 'transform 0.1s ease-out',
                  transform: magnifyStyle2.transform || 'none',
                  transformOrigin: magnifyStyle2.transformOrigin || 'center',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] py-5 gap-6 border shadow-lg rounded-lg bg-white">
        <div>
          <div className="px-5 sticky top-[73px] left-0">
            <h2 className="text-[21px] leading-[32px] font-bold font-roboto">
              Customer reviews
            </h2>
            <div className="flex items-center gap-5">
              <Rating
                name="half-rating"
                defaultValue={product.rating}
                precision={0.5}
                readOnly
              />
              <span className="text-[18px] font-semibold leading-[22px] font-roboto">
                {product.rating} out of 5
              </span>
            </div>
            <p>{product?.reviews.length} global ratings</p>
            <div className="flex flex-col gap-5 mt-5">
              {ratingPercentages.map(({ rating, percentage }) => (
                <RatingBar
                  key={rating}
                  rating={rating}
                  percentage={percentage}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="pr-5">
          <h3 className="text-lg leading-6 font-semibold font-roboto py-6">
            Top reviews from India
          </h3>
          <div className="flex flex-col gap-5">
            {product.reviews.map((review, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <p className="text-sm leading-6 font-semibold font-roboto">
                  {review.reviewerName}
                </p>
                <div className="flex items-center gap-2.5">
                  <Rating
                    name="half-rating"
                    defaultValue={review.rating}
                    precision={0.5}
                    readOnly
                  />
                  <span className="text-sm leading-6 font-bold font-roboto">
                    {review.reviewerEmail}
                  </span>
                </div>
                <span className="text-sm leading-6 font-normal font-roboto">
                  Reviewed in India on {formatDate(review.date)}
                </span>
                <p className="text-sm leading-6 font-normal font-roboto">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
