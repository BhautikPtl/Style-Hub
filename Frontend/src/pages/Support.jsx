import React from "react";
import Navbar from "../Componet/Navbar";

function Support() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Hero Section */}
        <div className="bg-white border rounded-3xl p-8 md:p-12 shadow-sm text-center">
          <div className="w-20 h-20 bg-black text-white rounded-3xl flex items-center justify-center text-4xl mx-auto">
            🎧
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mt-5">
            Customer Support
          </h1>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Need help with your order, payment, returns, or account? Our support
            team is here to assist you.
          </p>
        </div>

        {/* Support Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-3xl border p-6 shadow-sm">
            <div className="text-4xl">📧</div>

            <h2 className="text-xl font-bold mt-4">Email Support</h2>

            <p className="text-gray-500 mt-2">Contact us anytime via email.</p>

            <p className="font-semibold mt-4">support@stylehub.com</p>
          </div>

          <div className="bg-white rounded-3xl border p-6 shadow-sm">
            <div className="text-4xl">📞</div>

            <h2 className="text-xl font-bold mt-4">Phone Support</h2>

            <p className="text-gray-500 mt-2">Available Monday - Saturday.</p>

            <p className="font-semibold mt-4">+91 98765 43210</p>
          </div>

          <div className="bg-white rounded-3xl border p-6 shadow-sm">
            <div className="text-4xl">💬</div>

            <h2 className="text-xl font-bold mt-4">Live Chat</h2>

            <p className="text-gray-500 mt-2">
              Chat with our support team instantly.
            </p>

            <p className="font-semibold mt-4">9:00 AM - 9:00 PM</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl border shadow-sm p-8 mt-10">
          <h2 className="text-3xl font-bold">Contact Us</h2>

          <p className="text-gray-500 mt-2">
            Submit your issue and we'll get back to you shortly.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="font-medium">Full Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full mt-2 border rounded-2xl px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="font-medium">Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2 border rounded-2xl px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="font-medium">Subject</label>

              <input
                type="text"
                placeholder="Issue Subject"
                className="w-full mt-2 border rounded-2xl px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="font-medium">Message</label>

              <textarea
                rows="5"
                placeholder="Describe your issue..."
                className="w-full mt-2 border rounded-2xl px-4 py-3 outline-none resize-none focus:border-black"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-2xl hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Support Topics */}
        <div className="mt-10 bg-white rounded-3xl border shadow-sm p-8">
          <h2 className="text-3xl font-bold mb-6">Popular Support Topics</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-2xl p-5">📦 Order Tracking</div>

            <div className="border rounded-2xl p-5">🔄 Return & Refund</div>

            <div className="border rounded-2xl p-5">💳 Payment Issues</div>

            <div className="border rounded-2xl p-5">👤 Account Help</div>

            <div className="border rounded-2xl p-5">❤️ Wishlist & Cart</div>

            <div className="border rounded-2xl p-5">
              🚚 Shipping Information
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
