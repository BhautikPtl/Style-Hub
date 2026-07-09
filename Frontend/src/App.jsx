import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Shop from './pages/Shop'
import Orders from './pages/Orders'
import Wishlist from './pages/Wishlist'
import Review from './pages/Review'
import Cart from './pages/Cart'
import Admindashboard from './pages/AdminDashboard'
import ProtectedRoute from './Private/ProtectedRoute';



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <Dashboard />
        } />
        <Route path="/admindashboard" element={
          <ProtectedRoute url="admindashboard">
            <Admindashboard />
          </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/review" element={<Review />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App