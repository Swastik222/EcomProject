import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts, updateProduct } from '../api';
import './AddProduct.css'; // Reusing the same styles

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchProducts();
        const product = products.find(p => p.id === parseInt(id));
        if (product) {
          setFormData({
            name: product.name,
            description: product.description,
            brand: product.brand,
            price: product.price,
            category: product.category,
            // Format date for input type="date"
            releaseDate: product.releaseDate ? new Date(product.releaseDate).toISOString().split('T')[0] : '',
            productAvailable: product.productAvailable,
            stockQuantity: product.stockQuantity
          });
        } else {
          setStatus({ type: 'error', message: 'Product not found.' });
        }
      } catch (error) {
        setStatus({ type: 'error', message: 'Failed to load product.' });
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

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
    setSaving(true);
    setStatus({ type: '', message: '' });

    try {
      await updateProduct(id, formData, imageFile);
      setStatus({ type: 'success', message: 'Product updated successfully!' });
      setTimeout(() => navigate('/products'), 1500);
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to update product. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="state-container flex items-center justify-center"><p className="state-text">Loading product details...</p></div>;
  }

  return (
    <div className="animate-fade-in add-product-container">
      <div className="glass-panel form-wrapper">
        <h2 className="text-gradient form-title">Update Product</h2>
        
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
            <label>Product Image (Optional)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="form-input file-input" />
            <small className="text-muted" style={{ display: 'block', marginTop: '8px' }}>Leave empty to keep the existing image.</small>
          </div>

          <button type="submit" className="btn-primary submit-btn" disabled={saving}>
            {saving ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
