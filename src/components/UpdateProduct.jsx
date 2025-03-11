import { useState, useEffect } from "react";
import { updateProduct, getProductById } from "../api/backendless.js";
import {
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import Uploadicon from "../assets/svg/Uploadicon";
import CancelIcon from "@mui/icons-material/Cancel";

const UpdateProduct = () => {
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    currency: "USD",
    brand: "",
    category: "",
    subcategory: "",
    SKU: "",
    stock: "",
    colorOptions: "",
    sizeOptions: "",
    imageUrls: [],
    discount: "",
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        const data = await getProductById(productId);
        setProductData(data);
        setImagePreviews(data.imageUrls || []);
      };
      fetchProduct();
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imagePreviews.length > 10) {
      alert("You can upload a maximum of 10 images.");
      return;
    }

    const newImagePreviews = [];
    const newImageUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(BACKENDLESS_UPLOAD_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const imageUrl = response.data.fileURL;
        newImagePreviews.push(imageUrl);
        newImageUrls.push(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Check console for details.");
      }
    }

    setImagePreviews([...imagePreviews, ...newImagePreviews]);
    setProductData({ ...productData, imageUrls: [...productData.imageUrls, ...newImageUrls] });
  };

  const handleRemoveImage = (index) => {
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    const newImageUrls = productData.imageUrls.filter((_, i) => i !== index);
    setImagePreviews(newImagePreviews);
    setProductData({ ...productData, imageUrls: newImageUrls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert comma-separated fields to arrays
    const formattedData = {
      ...productData,
      price: parseFloat(productData.price) || 0,
      stock: parseInt(productData.stock) || 0,
      discount: parseFloat(productData.discount) || 0,
      colorOptions: productData.colorOptions
        ? productData.colorOptions.split(",").map((c) => c.trim())
        : [],
      sizeOptions: productData.sizeOptions
        ? productData.sizeOptions.split(",").map((s) => s.trim())
        : [],
    };

    try {
      await updateProduct(productId, formattedData);
      alert("Product Updated!");
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error);
      alert("Error updating product. Check console for details.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Update Product
      </Typography>
      <TextField
        label="Enter Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        fullWidth
        className="mb-2"
      />
      {productData && (
        <form onSubmit={handleSubmit} className="mt-[20px]">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Product Name"
                name="name"
                fullWidth
                required
                value={productData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Brand"
                name="brand"
                fullWidth
                value={productData.brand}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Category"
                name="category"
                fullWidth
                value={productData.category}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Subcategory"
                name="subcategory"
                fullWidth
                value={productData.subcategory}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="SKU"
                name="SKU"
                fullWidth
                value={productData.SKU}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Stock"
                name="stock"
                type="number"
                fullWidth
                value={productData.stock}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                name="price"
                type="number"
                fullWidth
                required
                value={productData.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Currency"
                name="currency"
                fullWidth
                value={productData.currency}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Colors (comma-separated)"
                name="colorOptions"
                fullWidth
                value={productData.colorOptions}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Sizes (comma-separated)"
                name="sizeOptions"
                fullWidth
                value={productData.sizeOptions}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="grid grid-cols-5 gap-[10px]">
                <div className="relative w-full h-[200px] cursor-pointer border-2 rounded-[6px] border-black border-dashed flex justify-center items-center flex-col">
                  <div className="w-[50px] h-[50px]">
                    <Uploadicon />
                  </div>
                  <span>Upload Images</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                {imagePreviews.map((src, index) => (
                  <div
                    key={index}
                    className="relative border border-black rounded-[6px] w-full h-[200px] p-[10px]"
                  >
                    <CancelIcon
                      className="absolute top-0 right-0 cursor-pointer"
                      onClick={() => handleRemoveImage(index)}
                    />
                    <img
                      src={src}
                      alt={`Image-preview-${index}`}
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Discount %"
                name="discount"
                type="number"
                fullWidth
                value={productData.discount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={3}
                value={productData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update Product
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
};

export default UpdateProduct;
