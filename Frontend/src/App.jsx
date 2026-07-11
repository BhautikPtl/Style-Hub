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
import ForgetPassword from './pages/ForgetPassword';
import SetPassword from './pages/SetPassword';
import AddProduct from './pages/AddProduct';
import ShowProduct from './pages/ShowProduct';
// import EditProduct from './pages/EditProduct';



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
        <Route path="/addproduct" element={
          <ProtectedRoute url="addproduct">
            <AddProduct />
          </ProtectedRoute>} />
        <Route path="/showproduct" element={
          <ProtectedRoute url="showproduct">
            <ShowProduct />
          </ProtectedRoute>} />
        {/* <Route path="/editproduct/:id" element={
          <ProtectedRoute url="editproduct">
            <EditProduct />
          </ProtectedRoute>} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/set-password/:token" element={<SetPassword />} />
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