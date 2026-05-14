import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { fetchProducts } from '../api';
import { Loader2 } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = ({ limit, hideFilters }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="state-container flex items-center justify-center">
        <Loader2 className="spinner" size={40} />
        <p className="state-text">Loading premium products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-container flex items-center justify-center">
        <p className="state-text text-danger">{error}</p>
      </div>
    );
  }

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const productsToDisplay = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  if (filteredProducts.length === 0 && products.length > 0) {
    return (
      <div className="product-list-wrapper">
        {!hideFilters && <CategoryTabs categories={categories} selectedCategory={selectedCategory} onSelect={setSelectedCategory} />}
        <div className="state-container flex items-center justify-center">
          <p className="state-text">No products match your search or category filter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-wrapper">
      {!hideFilters && (
        <div className="section-header">
          <h2 className="section-title">Explore Catalog</h2>
        </div>
      )}
      
      {!hideFilters && <CategoryTabs categories={categories} selectedCategory={selectedCategory} onSelect={setSelectedCategory} />}

      <div className="products-grid">
        {productsToDisplay.map((product, index) => (
          <div key={product.id} className={`delay-${(index % 3 + 1) * 100}`}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      {limit && products.length > limit && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/products" className="btn-primary">View All Products</Link>
        </div>
      )}
    </div>
  );
};

const CategoryTabs = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="category-tabs">
      {categories.map(cat => (
        <button
          key={cat}
          className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default ProductList;
