import axios from 'axios';

const API_URL = 'http://localhost:5000/api/sellProduct';

// Fetch all products or filtered/sorted products
export const fetchProducts = async (query = {}) => {
  const response = await axios.get(API_URL, { params: query });
  return response.data;
};

// Create a new product
export const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

// Update a product's sold price
export const updateProduct = async (id, soldPrice) => {
  const response = await axios.patch(`${API_URL}/${id}`, { soldPrice });
  return response.data;
};

// Delete a product
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};