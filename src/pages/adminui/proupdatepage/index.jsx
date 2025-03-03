import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function Produpdate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [rating, setRating] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://dummyjson.com/products/add', {
        title,
        description,
        price,
        thumbnail,
        category,
        brand,
        rating,
      });
      setMessage('Product added successfully!');
      console.log('Product added:', response.data);
    } catch (error) {
      setMessage('Error adding product.');
      console.error('Error adding product:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          margin="normal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          label="Thumbnail URL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="fashion">Fashion</MenuItem>
            <MenuItem value="home">Home</MenuItem>
            {/* Add more categories as needed */}
          </Select>
        </FormControl>
        <TextField
          label="Brand"
          variant="outlined"
          fullWidth
          margin="normal"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <TextField
          label="Rating"
          variant="outlined"
          fullWidth
          margin="normal"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </form>
      {message && <Typography variant="body1">{message}</Typography>}
    </Container>
  );
}
