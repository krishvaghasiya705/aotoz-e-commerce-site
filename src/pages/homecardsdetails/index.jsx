import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Homecardsdetailsui from '../../components/Homecardsdetailscomponents/Homecardsdetailsui';
import axios from 'axios';
import Loader from '../../components/loader';

export default function Homecardsdetails() {
  const { productId, productTitle } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  return (
    <div>
      {product ? <Homecardsdetailsui product={product} /> : <Loader />}
    </div>
  );
}
