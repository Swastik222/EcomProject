import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api')
  .replace(/\/$/, '');

/* ─── Public Axios instance ─────────────────────────────────────── */
const publicAxios = axios.create({ baseURL: API_BASE_URL });

/* ─── Authenticated Axios instance ─────────────────────────────── */
const authAxios = axios.create({ baseURL: API_BASE_URL });

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ─── Product API (public read) ─────────────────────────────────── */

export const fetchProducts = async () => {
  try {
    const response = await publicAxios.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products', error);
    return [];
  }
};

export const getImageUrl = (productId) => {
  return `${API_BASE_URL}/product/${productId}/image`;
};

/* ─── Product API (admin-only, auth required) ─────────────────── */

export const addProduct = async (productData, imageFile) => {
  const formData = new FormData();
  formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
  formData.append('imageFile', imageFile);

  try {
    const response = await authAxios.post('/product', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product', error);
    throw error;
  }
};

export const updateProduct = async (id, productData, imageFile) => {
  const formData = new FormData();
  formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
  if (imageFile) {
    formData.append('imageFile', imageFile);
  }

  const response = await authAxios.put(`/product/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await authAxios.delete(`/product/${id}`);
  return response.data;
};

/* ─── Auth API ───────────────────────────────────────────────────── */

export const loginUser = async (username, password) => {
  const response = await publicAxios.post('/auth/login', { username, password });
  return response.data; // { token, role, username }
};

export const registerUser = async (username, password) => {
  const response = await publicAxios.post('/auth/register', { username, password });
  return response.data;
};
