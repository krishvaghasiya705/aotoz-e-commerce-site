import React, { useEffect, useState } from 'react';
import { Button, IconButton, Pagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Likesection() {
  const [likedItems, setLikedItems] = useState(() => {
    const savedLikedItems = localStorage.getItem('likedItems');
    return savedLikedItems ? JSON.parse(savedLikedItems) : [];
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [backupLikedItems, setBackupLikedItems] = useState([]);
  const [showUndo, setShowUndo] = useState(false);

  useEffect(() => {
    const fetchLikedItems = async () => {
      try {
        const savedLikedItems = localStorage.getItem('likedItems');
        if (savedLikedItems) {
          setLikedItems(JSON.parse(savedLikedItems));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching liked items:', error);
        setLoading(false);
      }
    };
    fetchLikedItems();
  }, []);

  useEffect(() => {
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
    window.dispatchEvent(new Event('likeChange'));
  }, [likedItems]);

  const handleDeleteItem = (productId) => {
    setLikedItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    window.dispatchEvent(new Event('likeChange'));
  };

  const handleClearAll = () => {
    setBackupLikedItems(likedItems);
    setLikedItems([]);
    setShowUndo(true);
    window.dispatchEvent(new Event('likeChange'));

    setTimeout(() => {
      setShowUndo(false);
    }, 10000);
  };

  const handleUndoClearAll = () => {
    setLikedItems(backupLikedItems);
    setBackupLikedItems([]);
    setShowUndo(false);
    window.dispatchEvent(new Event('likeChange'));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedItems = likedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="py-[120px]">
      <div className="container">
        <div className='flex justify-between items-center'>
          <h2 className="text-[24px] leading-[32px] font-semibold font-roboto text-black mb-4">
            Liked Items
          </h2>
          {likedItems.length > 0 && !showUndo && (
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
            {likedItems.length === 0 ? (
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
                            ${item.price ? item.price.toFixed(2) : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
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
                {likedItems.length > 0 && (
                  <Pagination
                    count={Math.ceil(likedItems.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    className="mt-4 flex justify-center"
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
