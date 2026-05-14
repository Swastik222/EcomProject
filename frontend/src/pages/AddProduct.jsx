import React, { useState } from 'react';
import { addProduct } from '../api';
import './AddProduct.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    price: '',
    category: '',
    releaseDate: '',
    productAvailable: true,
    stockQuantity: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setStatus({ type: 'error', message: 'Please select an image file.' });
      return;
    }
    
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await addProduct(formData, imageFile);
      setStatus({ type: 'success', message: 'Product added successfully!' });
      // Reset form
      setFormData({
        name: '', description: '', brand: '', price: '', category: '',
        releaseDate: '', productAvailable: true, stockQuantity: ''
      });
      setImageFile(null);
      e.target.reset();
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to add product. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in add-product-container">
      <div className="glass-panel form-wrapper">
        <h2 className="text-gradient form-title">Add New Product</h2>
        
        {status.message && (
          <div className={`status-message ${status.type === 'error' ? 'error' : 'success'}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Brand</label>
              <input type="text" name="brand" required value={formData.brand} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input type="text" name="category" required value={formData.category} onChange={handleChange} className="form-input" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (₹)</label>
              <input type="number" step="0.01" name="price" required value={formData.price} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Stock Quantity</label>
              <input type="number" name="stockQuantity" required value={formData.stockQuantity} onChange={handleChange} className="form-input" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Release Date</label>
              <input type="date" name="releaseDate" required value={formData.releaseDate} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" name="productAvailable" checked={formData.productAvailable} onChange={handleChange} />
                Product is Available
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows="4" required value={formData.description} onChange={handleChange} className="form-input"></textarea>
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} required className="form-input file-input" />
          </div>

          <button type="submit" className="btn-primary submit-btn" disabled={loading}>
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
