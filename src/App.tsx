import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import { ToastContainer } from 'react-toastify';
import ProductDetailPage from './pages/ProductDetaiilPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import SellerDashboard from './pages/Seller/SellerDashboard';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header  />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/productsDetail" element={<ProductDetailPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/profile" element={<AdminDashboard />} />
              <Route path="/seller/profile" element={<SellerDashboard />} />
              {/* Thêm route cho các trang đặc thù khác */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/seller" element={<SellerDashboard />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/register-seller" element={<RegisterForm isSeller={true} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <ToastContainer/>
    </AuthProvider>
  );
}

export default App;