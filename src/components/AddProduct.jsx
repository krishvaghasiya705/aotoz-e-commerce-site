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

const BACKENDLESS_URL =
  "https://api.backendless.com/78C4C319-125F-4394-8C37-49107C7D8A98/FAABB6D8-F052-4B82-B98E-15253B1DDBB3/data/Products";

const ProductForm = () => {
  const [products, setProducts] = useState([]);
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
    imageUrls: "",
    discount: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(BACKENDLESS_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      imageUrls: formData.imageUrls
        ? formData.imageUrls.split(",").map((url) => url.trim())
        : [],
    };

    try {
      await axios.post(BACKENDLESS_URL, formattedData);
      fetchProducts();
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
      alert("Error adding product. Check console for details.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
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
            <TextField
              label="SKU"
              name="SKU"
              fullWidth
              onChange={handleChange}
            />
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
            <TextField
              label="Image URLs (comma-separated)"
              name="imageUrls"
              fullWidth
              onChange={handleChange}
            />
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

      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Product List
      </Typography>
      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        {products.map((product) => (
          <Grid item xs={4} key={product.objectId}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="body2">
                  Price: ${product.price} {product.currency}
                </Typography>
                <Typography variant="body2">Stock: {product.stock}</Typography>
                <Typography variant="body2">Brand: {product.brand}</Typography>
                <Typography variant="body2">Category: {product.category}</Typography>
                <Typography variant="body2">Subcategory: {product.subcategory}</Typography>
                <Typography variant="body2">SKU: {product.SKU}</Typography>
                <Typography variant="body2">Discount: {product.discount}%</Typography>
                <Typography variant="body2">Colors: {product.colorOptions.join(", ")}</Typography>
                <Typography variant="body2">Sizes: {product.sizeOptions.join(", ")}</Typography>
                <Typography variant="body2">Images: {product.imageUrls.join(", ")}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductForm;
