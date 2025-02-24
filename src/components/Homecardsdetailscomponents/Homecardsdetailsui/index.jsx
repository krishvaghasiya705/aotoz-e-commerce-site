import React, { useState } from 'react';
import { Rating } from "@mui/material";

export default function Homecardsdetailsui({ product }) {
  const [magnifyStyle, setMagnifyStyle] = useState({ display: 'none' });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    const backgroundX = (x / width) * 100;
    const backgroundY = (y / height) * 100;
    setMagnifyStyle({
      display: 'block',
      backgroundPosition: `${backgroundX}% ${backgroundY}%`,
      left: `${x - 50}px`,
      top: `${y - 50}px`
    });
  };

  const handleMouseLeave = () => {
    setMagnifyStyle({ display: 'none' });
  };

  return (
    <div className="flex flex-col md:flex-row border p-6 m-6 shadow-lg rounded-lg bg-white">
      <div className="w-full md:w-1/3 relative mb-6 md:mb-0 h-[600px] rounded-[20px] shadow-lg border">
        <img
          src={product.image || product.thumbnail}
          alt={product.title}
          className="max-w-full rounded-lg"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        <div
          className="absolute w-[100px] h-[100px] border-2 border-gray-300 pointer-events-none z-10"
          style={{
            ...magnifyStyle,
            backgroundImage: `url(${product.image || product.thumbnail})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '700%',
            transform: 'scale(2)',
            transformOrigin: 'center'
          }}
        />
      </div>
      <div className="w-full md:w-2/3 pl-0 md:pl-6">
        <h1 className="text-3xl font-bold mb-2 font-playfair text-gray-800">{product.title}</h1>
        <p className="text-lg mb-4 font-roboto text-gray-600">{product.description}</p>
        <div className="text-2xl text-red-600 font-semibold mb-4">${product.price}</div>
        <div className="mb-4">
          <span className="font-bold text-gray-700">Category:</span> {product.category}
        </div>
        <div className="mb-4">
          <span className="font-bold text-gray-700">Rating:</span> {product.rating} / 5
        </div>
        <div className="mb-4">
          <Rating
            name="half-rating"
            defaultValue={product.rating}
            precision={0.5}
            readOnly
          />
        </div>
        <div className="mb-4">
          <span className="font-bold text-gray-700">Stock:</span> {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </div>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg transition duration-300">Add to Cart</button>
      </div>
    </div>
  );
}
