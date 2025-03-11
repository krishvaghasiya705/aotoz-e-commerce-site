import { useState, useEffect } from "react";
import { updateProduct, getProductById } from "../api/backendless.js";

const UpdateProduct = () => {
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        const data = await getProductById(productId);
        setProductData(data);
      };
      fetchProduct();
    }
  }, [productId]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(productId, productData);
    alert("Product Updated!");
    setIsEditable(false);
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Update Product</h2>
      <input
        type="text"
        placeholder="Enter Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="p-2 border mb-2 w-full"
      />
      {productData && (
        <div>
          <div className="mb-2">
            <h3 className="text-md font-bold">Product Preview:</h3>
            <p><strong>Name:</strong> {productData.name}</p>
            <p><strong>Description:</strong> {productData.description}</p>
            <p><strong>Price:</strong> ${productData.price}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block font-bold">Product Name:</label>
              {isEditable ? (
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  className="p-2 border w-full"
                />
              ) : (
                <p onClick={() => setIsEditable(true)}>{productData.name}</p>
              )}
            </div>
            <div className="mb-2">
              <label className="block font-bold">Description:</label>
              {isEditable ? (
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  className="p-2 border w-full"
                />
              ) : (
                <p onClick={() => setIsEditable(true)}>{productData.description}</p>
              )}
            </div>
            <div className="mb-2">
              <label className="block font-bold">Price:</label>
              {isEditable ? (
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  className="p-2 border w-full"
                />
              ) : (
                <p onClick={() => setIsEditable(true)}>{productData.price}</p>
              )}
            </div>
            {/* Add more fields similarly */}
            {isEditable && (
              <button type="submit" className="p-2 bg-green-500 text-white">
                Save Changes
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
