import { useState } from "react";
import { updateProduct } from "../api/backendless.js";

const UpdateProduct = () => {
  const [productId, setProductId] = useState("");
  const [updatedData, setUpdatedData] = useState({ price: "" });

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(productId, updatedData);
    alert("Product Updated!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Update Product</h2>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="p-2 border mb-2 w-full"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="New Price"
        value={updatedData.price}
        onChange={handleChange}
        className="p-2 border mb-2 w-full"
        required
      />
      <button type="submit" className="p-2 bg-green-500 text-white">
        Update Product
      </button>
    </form>
  );
};

export default UpdateProduct;
