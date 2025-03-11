import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import Uploadicon from "../assets/svg/Uploadicon";
import CancelIcon from "@mui/icons-material/Cancel";

const BACKENDLESS_URL =
  "https://api.backendless.com/78C4C319-125F-4394-8C37-49107C7D8A98/FAABB6D8-F052-4B82-B98E-15253B1DDBB3/data/Products";
const BACKENDLESS_UPLOAD_URL =
  "https://backendlessappcontent.com/78C4C319-125F-4394-8C37-49107C7D8A98/FAABB6D8-F052-4B82-B98E-15253B1DDBB3/files/upload";

const ManageProducts = ({
  handleSubmit,
  handleChange,
  handleImageUpload,
  handleRemoveImage,
  formData,
  imagePreviews,
}) => (
  <div>
    <Typography variant="h4" gutterBottom>
      Manage Products
    </Typography>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Product Name"
            name="name"
            fullWidth
            required
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Brand"
            name="brand"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Category"
            name="category"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Subcategory"
            name="subcategory"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField label="SKU" name="SKU" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Stock"
            name="stock"
            type="number"
            fullWidth
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
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Currency"
            name="currency"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Colors (comma-separated)"
            name="colorOptions"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Sizes (comma-separated)"
            name="sizeOptions"
            fullWidth
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
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Product
          </Button>
        </Grid>
      </Grid>
    </form>
  </div>
);

const ProductForm = () => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    setFormData({ ...formData, imageUrls: [...formData.imageUrls, ...newImageUrls] });
  };

  const handleRemoveImage = (index) => {
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    const newImageUrls = formData.imageUrls.filter((_, i) => i !== index);
    setImagePreviews(newImagePreviews);
    setFormData({ ...formData, imageUrls: newImageUrls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert comma-separated fields to arrays
    const formattedData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock) || 0,
      discount: parseFloat(formData.discount) || 0,
      colorOptions: formData.colorOptions
        ? formData.colorOptions.split(",").map((c) => c.trim())
        : [],
      sizeOptions: formData.sizeOptions
        ? formData.sizeOptions.split(",").map((s) => s.trim())
        : [],
    };

    try {
      await axios.post(BACKENDLESS_URL, formattedData);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
      alert("Error adding product. Check console for details.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <ManageProducts
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleImageUpload={handleImageUpload}
        handleRemoveImage={handleRemoveImage}
        formData={formData}
        imagePreviews={imagePreviews}
      />
    </div>
  );
};

export default ProductForm;
