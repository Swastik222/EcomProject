import React from 'react';
import ProductList from '../components/ProductList';

const Products = () => {
  return (
    <div className="animate-fade-in" style={{ paddingTop: '20px' }}>
      <div className="glass-panel" style={{ padding: '30px', marginBottom: '30px' }}>
        <h1 className="text-gradient" style={{ fontSize: '36px', marginBottom: '10px' }}>
          Full Catalog
        </h1>
        <p className="text-muted" style={{ fontSize: '16px' }}>
          Browse our complete selection of premium smartphones, laptops, tablets, and accessories.
        </p>
      </div>
      <ProductList />
    </div>
  );
};

export default Products;
