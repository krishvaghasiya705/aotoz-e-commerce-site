import { useEffect, useState } from "react";
import { getAllProducts } from "../api/backendless";
import ProductForm from "./AddProduct";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <button
        onClick={() => setSelectedProduct(null)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Add New Product
      </button>
      {selectedProduct && (
        <ProductForm product={selectedProduct} isEditing={true} onSuccess={fetchProducts} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.objectId} className="p-4 border rounded shadow-lg">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <button
              onClick={() => setSelectedProduct(product)}
              className="bg-yellow-500 text-white px-3 py-1 rounded mt-2"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
