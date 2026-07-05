import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Shop from './pages/Shop'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import Wishlist from './pages/Wishlist'
import Review from './pages/Review'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/review" element={<Review/>} />
      </Routes>
    </div>
  )
}

export default App