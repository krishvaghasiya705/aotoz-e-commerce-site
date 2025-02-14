import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Rating } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Carousel from 'react-material-ui-carousel';

export default function Homecardsdetailsui({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching product details for productId:', productId); // Debug log
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);
        console.log('Fetched product data:', response.data); // Debug log
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error.message); // Detailed error log
        if (error.response) {
          console.error('Error response data:', error.response.data); // Detailed error log
          console.error('Error response status:', error.response.status); // Detailed error log
          console.error('Error response headers:', error.response.headers); // Detailed error log
        } else if (error.request) {
          console.error('Error request:', error.request); // Detailed error log
        } else {
          console.error('Error message:', error.message); // Detailed error log
        }
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="p-5">
        <Skeleton variant="rectangular" width="100%" height={400} />
        <Skeleton width="60%" />
        <Skeleton width="80%" />
        <Skeleton width="40%" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Carousel>
            {product && product.images && Array.isArray(product.images) && product.images.map((image, index) => (
              <img key={index} src={image} alt={product.title} className="w-full h-auto rounded-lg" />
            ))}
          </Carousel>
        </div>
        <div>
          {product && <h1 className="text-3xl font-bold mb-4">{product.title}</h1>}
          <Rating value={product?.rating} readOnly precision={0.5} />
          <p className="text-lg mt-4">{product?.description}</p>
          <div className="flex items-center gap-4 mt-4">
            <del className="text-xl opacity-50">${parseFloat(product?.price + 20).toFixed(2)}</del>
            <span className="text-2xl font-bold">${product?.price}</span>
          </div>
          <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
