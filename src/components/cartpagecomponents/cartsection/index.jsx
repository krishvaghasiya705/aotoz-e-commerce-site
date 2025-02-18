import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, IconButton, Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartSection() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [gst, setGst] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [backupCartItems, setBackupCartItems] = useState([]);
  const [showUndo, setShowUndo] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
          setCartItems(JSON.parse(savedCartItems));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalPrice(total);
      setGst(total * 0.18); // Assuming 18% GST
    };
    calculateTotal();
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartChange'));
  }, [cartItems]);

  const handleIncreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    window.dispatchEvent(new Event('cartChange')); // Notify cart change
  };

  const handleDecreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    window.dispatchEvent(new Event('cartChange')); // Notify cart change
  };

  const handleDeleteItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    window.dispatchEvent(new Event('cartChange')); // Notify cart change
  };

  const handleClearAll = () => {
    setBackupCartItems(cartItems);
    setCartItems([]);
    setShowUndo(true);
    window.dispatchEvent(new Event('cartChange')); // Notify cart change

    setTimeout(() => {
      setShowUndo(false);
    }, 10000); // Hide undo button after 10 seconds
  };

  const handleUndoClearAll = () => {
    setCartItems(backupCartItems);
    setBackupCartItems([]);
    setShowUndo(false);
    window.dispatchEvent(new Event('cartChange')); // Notify cart change
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedItems = cartItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="py-[120px]">
      <div className="container">
        <div className='flex justify-between items-center'>
          <h2 className="text-[24px] leading-[32px] font-semibold font-roboto text-black mb-4">
            Cart Items
          </h2>
          {cartItems.length > 0 && !showUndo && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClearAll}
            >
              Clear All
            </Button>
          )}
          {showUndo && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleUndoClearAll}
            >
              Undo
            </Button>
          )}
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {cartItems.length === 0 ? (
              <div className="rounded-[16px] p-5 shadow-md border-[1px] border-[#00000014] flex justify-center items-center">
                <h3 className="text-[18px] leading-[28px] font-semibold font-roboto text-black">
                  No Data Found
                </h3>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4">
                  {paginatedItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-[16px] p-5 shadow-md border-[1px] border-[#00000014] flex justify-between items-center"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.thumbnail || item.imageUrl || item.image}
                          alt={item.title}
                          className="w-[100px] h-[100px] object-scale-down rounded-[12px]"
                        />
                        <div>
                          <h3 className="text-[18px] leading-[28px] font-semibold font-roboto text-black">
                            {item.title}
                          </h3>
                          <p className="text-[14px] leading-[24px] font-roboto text-black">
                            ${item.price} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconButton
                          color="primary"
                          onClick={() => handleDecreaseQuantity(item.id)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <span>{item.quantity}</span>
                        <IconButton
                          color="primary"
                          onClick={() => handleIncreaseQuantity(item.id)}
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
                {cartItems.length > 0 && (
                  <Pagination
                    count={Math.ceil(cartItems.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    className="mt-4 flex justify-center"
                  />
                )}
                <div className="mt-8 p-5 rounded-[16px] shadow-lg border-[1px] border-[#00000014] bg-white">
                  <h3 className="text-[24px] leading-[32px] font-semibold font-roboto text-black mb-4">
                    Order Summary
                  </h3>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[16px] leading-[24px] font-roboto text-black">
                      Total Price:
                    </p>
                    <p className="text-[16px] leading-[24px] font-roboto text-black">
                      ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[16px] leading-[24px] font-roboto text-black">
                      GST (18%):
                    </p>
                    <p className="text-[16px] leading-[24px] font-roboto text-black">
                      ${gst.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-[16px] leading-[24px] font-roboto text-black font-bold">
                      Grand Total:
                    </p>
                    <p className="text-[16px] leading-[24px] font-roboto text-black font-bold">
                      ${(totalPrice + gst).toFixed(2)}
                    </p>
                  </div>
                  <Button variant="contained" color="primary" className="w-full py-2">
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
