import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import { getImageUrl, placeOrder } from '../api';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-state glass-panel animate-fade-in">
        <h2>Your Cart is Empty</h2>
        <p className="text-muted">Looks like you haven't added any premium tech to your cart yet.</p>
        <Link to="/products" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px' }}>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container animate-fade-in">
      <h1 className="text-gradient form-title" style={{ textAlign: 'left', marginBottom: '30px' }}>Your Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.product.id} className="cart-item glass-panel">
              <div className="cart-item-image">
                {item.product.imageName ? (
                  <img src={getImageUrl(item.product.id)} alt={item.product.name} />
                ) : (
                  <div className="product-image-placeholder">No Image</div>
                )}
              </div>
              
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.product.name}</h3>
                <p className="text-muted cart-item-brand">{item.product.brand}</p>
                <div className="cart-item-price">₹{item.product.price}</div>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button className="btn-icon" onClick={() => updateQuantity(item.product.id, -1)}>
                    <Minus size={16} />
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button className="btn-icon" onClick={() => updateQuantity(item.product.id, 1)}>
                    <Plus size={16} />
                  </button>
                </div>
                
                <button className="btn-icon text-danger" onClick={() => removeFromCart(item.product.id)}>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary glass-panel">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total</span>
            <span className="text-gradient">₹{cartTotal.toFixed(2)}</span>
          </div>
          <button className="btn-primary checkout-btn" onClick={async () => {
            try {
              const orderData = {
                items: cartItems.map(item => ({
                  productId: item.product.id,
                  quantity: item.quantity
                }))
              };
              await placeOrder(orderData);
              alert('Order placed successfully with Cash on Delivery!');
              clearCart();
            } catch (error) {
              console.error('Failed to place order:', error);
              alert('Failed to place order. Please try again or login first.');
            }
          }}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
