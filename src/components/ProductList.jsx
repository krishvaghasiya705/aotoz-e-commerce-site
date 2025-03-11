import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

const BACKENDLESS_URL =
  "https://api.backendless.com/78C4C319-125F-4394-8C37-49107C7D8A98/FAABB6D8-F052-4B82-B98E-15253B1DDBB3/data/Products";

const ProductList = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div>
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
                <Typography variant="body2">
                  Stock: {product.stock}
                </Typography>
                <Typography variant="body2">
                  Brand: {product.brand}
                </Typography>
                <Typography variant="body2">
                  Category: {product.category}
                </Typography>
                <Typography variant="body2">
                  Subcategory: {product.subcategory}
                </Typography>
                <Typography variant="body2">SKU: {product.SKU}</Typography>
                <Typography variant="body2">
                  Discount: {product.discount}%
                </Typography>
                <Typography variant="body2">
                  Colors: {product.colorOptions.join(", ")}
                </Typography>
                <Typography variant="body2">
                  Sizes: {product.sizeOptions.join(", ")}
                </Typography>
                <Typography variant="body2">
                  Images: {product.imageUrls.join(", ")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
