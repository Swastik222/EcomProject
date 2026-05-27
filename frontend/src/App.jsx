import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <main className="container">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Admin-only routes */}
          <Route
            path="/add-product"
            element={
              <PrivateRoute role="ROLE_ADMIN">
                <AddProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-product/:id"
            element={
              <PrivateRoute role="ROLE_ADMIN">
                <UpdateProduct />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
