import React from 'react';
import { ShoppingCart, Edit, Trash2 } from 'lucide-react';
import { getImageUrl, deleteProduct } from '../api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAdmin } = useAuth();
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setMessage('Deleting...');
    
    try {
      await deleteProduct(product.id);
      setMessage('Deleted!');
      setTimeout(() => window.location.reload(), 500); 
    } catch (err) {
      console.error('Delete failed:', err);
      setMessage('Failed to delete');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/edit-product/${product.id}`);
  };

  return (
    <div className="product-card glass-panel animate-fade-in">
      {message && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.8)', color: 'white', padding: '10px', textAlign: 'center', zIndex: 2000 }}>
          {message}
        </div>
      )}
      <div className="product-image-container">
        {product.imageName ? (
          <img 
            src={getImageUrl(product.id)} 
            alt={product.name} 
            className="product-image"
          />
        ) : (
          <div className="product-image-placeholder">No Image</div>
        )}
        <div className="product-category-badge badge badge-category">
          {product.category}
        </div>
      </div>
      
      <div className="product-info">
        <p className="product-brand text-muted">{product.brand}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc text-muted">{product.description}</p>
        
        <div className="product-footer flex items-center justify-between">
          <div className="product-price">
            ₹{product.price}
          </div>
          <div className="flex gap-2" style={{ position: 'relative', zIndex: 999 }}>
            {isAdmin() && (
              <>
                <button 
                  className="btn-icon edit-btn" 
                  style={{ position: 'relative', zIndex: 1000, pointerEvents: 'auto' }}
                  onClick={handleEdit}
                >
                  <Edit size={18} style={{ pointerEvents: 'none' }} />
                </button>
                <button 
                  className="btn-icon delete-btn" 
                  style={{ position: 'relative', zIndex: 1000, pointerEvents: 'auto' }}
                  onClick={handleDelete}
                >
                  <Trash2 size={18} style={{ pointerEvents: 'none' }} />
                </button>
              </>
            )}
            <button 
              className="btn-icon add-to-cart-btn" 
              style={{ position: 'relative', zIndex: 1000, pointerEvents: 'auto' }}
              aria-label="Add to cart"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart size={18} style={{ pointerEvents: 'none' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
