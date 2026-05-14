import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, LogIn, LogOut, UserCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { itemCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-nav">
      <div className="container flex justify-between items-center nav-content">
        <div className="nav-brand">
          <Link to="/" className="flex items-center" style={{ gap: '12px', textDecoration: 'none' }}>
            <img src="/swastiktech_logo.svg" alt="SwastikTech Logo" width="48" height="48" style={{ objectFit: 'contain' }} />
            <h2 style={{ margin: 0, fontWeight: 800, letterSpacing: '-0.5px', fontSize: '24px' }}>
              <span className="text-gradient">SwastikTech</span>
            </h2>
          </Link>
        </div>
        
        <div className="nav-links flex items-center gap-4">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          {/* Only show Add Product link to admins */}
          {isAdmin() && (
            <Link to="/add-product" className="nav-link" id="nav-add-product">Add Product</Link>
          )}
          <Link to="/about" className="nav-link">About</Link>
        </div>

        <div className="nav-actions flex items-center gap-4">
          <form onSubmit={handleSearch} className="search-form">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn-icon search-btn">
              <Search size={18} />
            </button>
          </form>

          <Link to="/cart" className="btn-icon cart-btn">
            <ShoppingCart size={20} />
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>

          {user ? (
            /* Logged-in user info + logout */
            <div className="nav-user flex items-center gap-3">
              <div className="user-info">
                <UserCircle size={18} className="user-icon" />
                <span className="user-name" id="nav-username">{user.username}</span>
                <span className={`role-badge ${isAdmin() ? 'role-admin' : 'role-customer'}`}>
                  {isAdmin() ? 'Admin' : 'Customer'}
                </span>
              </div>
              <button
                id="nav-logout-btn"
                className="btn-icon logout-btn"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            /* Login button */
            <Link to="/login" className="nav-login-btn" id="nav-login-btn">
              <LogIn size={16} />
              Login
            </Link>
          )}

          <button className="btn-icon mobile-menu">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
