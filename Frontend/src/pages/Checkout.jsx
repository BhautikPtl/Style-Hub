import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Componet/Navbar";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [user, setUser] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });

      setUser(data.details);

      if (data.details.addresses?.length > 0) {
        setSelectedAddress(data.details.addresses[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const subtotal =
    user?.cart?.reduce(
      (total, item) => total + item.productId?.productPrice * item.quantity,
      0,
    ) || 0;

  const isGujarat = selectedAddress?.state?.toLowerCase() === "gujarat";

  const sgst = isGujarat ? subtotal * 0.09 : 0;

  const cgst = isGujarat ? subtotal * 0.09 : 0;

  const igst = !isGujarat ? subtotal * 0.18 : 0;

  const shippingCharge = isGujarat ? 0 : 100;

  const grandTotal = subtotal + sgst + cgst + igst + shippingCharge;

  const placeOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/place-order",
        {
          address: selectedAddress,
          paymentMethod,
        },
        {
          withCredentials: true,
        },
      );
      setLoading(false);

      navigate("/cart");
    } catch (error) {
      setLoading(false);
      console.log(error);
      console.log(error.response.data.message);
    }
  };

  {
    /* loading screen */
  }
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-lg">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl px-10 py-8 border border-white">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 border-[3px] border-gray-200 border-t-black rounded-full animate-spin"></div>

            <h2 className="text-lg font-semibold text-gray-900">Loading...</h2>

            <p className="text-sm text-gray-500">Please wait a moment</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} isLogged={true} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Address */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Delivery Address</h2>

              {user?.addresses?.length > 0 ? (
                <div className="space-y-4">
                  {user.addresses.map((address, index) => (
                    <label
                      key={index}
                      className={`block border rounded-2xl p-4 cursor-pointer ${
                        selectedAddress === address ? "border-black" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        className="mr-3"
                        checked={selectedAddress === address}
                        onChange={() => setSelectedAddress(address)}
                      />

                      <div>
                        <h3 className="font-semibold">{address.fullName}</h3>

                        <p>{address.mobile}</p>

                        <p>{address.addressLine1}</p>

                        <p>
                          {address.city},{address.state}
                        </p>

                        <p>{address.pincode}</p>
                        <p>{address.country}</p>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <p>No address found.</p>
              )}
            </div>

            {/* Payment */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 border p-4 rounded-xl cursor-pointer">
                  <input
                    type="radio"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Cash On Delivery
                </label>

                <label className="flex items-center gap-3 border p-4 rounded-xl cursor-pointer">
                  <input
                    type="radio"
                    value="RAZORPAY"
                    checked={paymentMethod === "RAZORPAY"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Razorpay
                </label>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Order Items</h2>

              <div className="space-y-4">
                {user?.cart?.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 items-center border-b pb-4"
                  >
                    <img
                      src={`http://localhost:5000/uploads/${item.productId?.productImage}`}
                      alt=""
                      className="w-20 h-20 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {item.productId?.productName}
                      </h3>

                      <p>Qty :{item.quantity}</p>
                    </div>

                    <div>₹{item.productId?.productPrice * item.quantity}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div className="bg-white rounded-3xl p-6 shadow-sm sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>

                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                {isGujarat ? (
                  <>
                    <div className="flex justify-between">
                      <span>SGST (9%)</span>

                      <span>₹{sgst.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>CGST (9%)</span>

                      <span>₹{cgst.toFixed(2)}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between">
                    <span>IGST (18%)</span>

                    <span>₹{igst.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>

                  <span>
                    {shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}
                  </span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>

                  <span>₹{grandTotal.toFixed(0)}</span>
                </div>

                <button
                  onClick={placeOrder}
                  className="w-full mt-4 bg-black text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
