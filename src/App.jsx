import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { initializeSecurity } from './utils/security';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Store from './pages/Store';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import RepairBooking from './pages/RepairBooking';
import TrackStatus from './pages/TrackStatus';
import ContactUs from './pages/ContactUs';
import Products from './pages/Products';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Protected Route Component
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  useEffect(() => {
    // Initialize security measures on app load
    initializeSecurity();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-black text-white">
            <Navbar />
            
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/store" element={<Store />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/repair-booking" element={<RepairBooking />} />
                <Route path="/track" element={<TrackStatus />} />
                <Route path="/contact" element={<ContactUs />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin" element={<AdminLogin />} />
              </Routes>
            </main>
            
            <Footer />
            <WhatsAppButton />
            
            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1e293b',
                  color: '#fff',
                  border: '1px solid #475569',
                },
                success: {
                  className: 'toast-success',
                },
                error: {
                  className: 'toast-error',
                },
              }}
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;