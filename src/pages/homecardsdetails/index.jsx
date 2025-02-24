import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Homecardsdetailsui from '../../components/Homecardsdetailscomponents/Homecardsdetailsui';
import axios from 'axios';
import Loader from '../../components/loader';

export default function Homecardsdetails() {
  const { productTitle } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products`);
        const product = response.data.products.find(p => p.title.toLowerCase() === productTitle.toLowerCase());
        setProduct(product);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProduct();
  }, [productTitle]);

  return (
    <div>
      {product ? <Homecardsdetailsui product={product} /> : <Loader />}
    </div>
  );
}
