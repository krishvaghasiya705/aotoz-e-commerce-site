import React from 'react';
import { useParams } from 'react-router-dom';
import Homecardsdetailsui from '../../components/Homecardsdetailscomponents/Homecardsdetailsui';

export default function Homecardsdetails() {
  const { productId } = useParams();

  return (
    <div>
      <Homecardsdetailsui productId={productId} />
    </div>
  );
}
