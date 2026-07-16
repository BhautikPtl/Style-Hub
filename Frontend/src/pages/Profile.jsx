import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Componet/Navbar';
import userPlaceholder from "../assets/UserPlaceholder.png";


function Profile() {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [showAddressForm, setShowAddressForm] = useState(false);

    const [address, setAddress] = useState({
        fullName: '',
        mobile: '',
        addressLine1: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });


    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:5000/api/user/add-address',
                address,
                {
                    withCredentials: true,
                }
            );
            setAddress({
                fullName: '',
                mobile: '',
                addressLine1: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
            });
            setMessage(response.data.message);
            await CheckLogin(); // Refresh user data after adding address
        }
        catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred while adding the address.');
        }
    };

    useEffect(() => {
        CheckLogin();
    }, []);

    const CheckLogin = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/auth/me", {
                withCredentials: true,
            });

            setUser(data.details);
            setIsLoggedIn(true);
            setLoading(false);
        }
        catch (error) {
            console.error("Error checking login status:", error);
            setLoading(false);
        }
    }


    return (
        <div className="min-h-screen px-6 py-2">
            <Navbar isLogged={isLoggedIn} user={user} />

            {isLoggedIn ? (
                <div className="max-w-7xl mx-auto mt-6">

                    {/* Profile Card */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-3">
                        <img
                            className="w-22 h-22 rounded-full object-cover border-4 border-gray-100 mx-auto"
                            src={user.profilePicture || userPlaceholder}
                            alt="Profile"
                        />

                        <h2 className="text-2xl font-bold text-center mt-4">
                            {user.name}
                        </h2>

                        <p className="text-center text-gray-500 mt-1">
                            {user.email}
                        </p>
                    </div>

                    {/* Address Section */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">

                        {/* Saved Addresses */}
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">

                                <h2 className="text-xl font-bold">
                                    Saved Addresses
                                </h2>

                                <button
                                    onClick={() =>
                                        setShowAddressForm(!showAddressForm)
                                    }
                                    className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
                                >
                                    + Add Address
                                </button>
                            </div>

                            {user.addresses?.length > 0 ? (
                                <div className="space-y-4">

                                    {user.addresses.map((address, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-50 border rounded-2xl p-5"
                                        >
                                            <h3 className="font-bold mb-3">
                                                Address #{index + 1}
                                            </h3>

                                            <p>{address.fullName}</p>
                                            <p>{address.mobile}</p>
                                            <p>{address.addressLine1}</p>
                                            <p>
                                                {address.city}, {address.state}
                                            </p>
                                            <p>{address.pincode}</p>
                                            <p>{address.country}</p>
                                        </div>
                                    ))}

                                </div>
                            ) : (
                                <div className="text-center py-10 text-gray-500">
                                    No address added yet
                                </div>
                            )}

                        </div>

                        {/* Address Form */}
                        {(showAddressForm ||
                            !user.addresses ||
                            user.addresses.length === 0) && (
                                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">

                                    <h2 className="text-xl font-bold mb-5">
                                        Add Address
                                    </h2>

                                    <form
                                        onSubmit={handleAddressSubmit}
                                        className="space-y-4"
                                    >

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                value={address.fullName}
                                                onChange={(e) =>
                                                    setAddress({
                                                        ...address,
                                                        fullName: e.target.value,
                                                    })
                                                }
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                            />

                                            <input
                                                type="text"
                                                placeholder="Mobile"
                                                value={address.mobile}
                                                onChange={(e) =>
                                                    setAddress({
                                                        ...address,
                                                        mobile: e.target.value,
                                                    })
                                                }
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                            />

                                            <input
                                                type="text"
                                                placeholder="City"
                                                value={address.city}
                                                onChange={(e) =>
                                                    setAddress({
                                                        ...address,
                                                        city: e.target.value,
                                                    })
                                                }
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                            />

                                            <input
                                                type="text"
                                                placeholder="State"
                                                value={address.state}
                                                onChange={(e) =>
                                                    setAddress({
                                                        ...address,
                                                        state: e.target.value,
                                                    })
                                                }
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                            />

                                            <input
                                                type="text"
                                                placeholder="Pincode"
                                                value={address.zipCode}
                                                onChange={(e) =>
                                                    setAddress({
                                                        ...address,
                                                        zipCode: e.target.value,
                                                    })
                                                }
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                            />

                                            <input
                                                type="text"
                                                placeholder="Country"
                                                value={address.country}
                                                onChange={(e) =>
                                                    setAddress({
                                                        ...address,
                                                        country: e.target.value,
                                                    })
                                                }
                                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                            />

                                        </div>

                                        <textarea
                                            rows="4"
                                            placeholder="Address Line"
                                            value={address.addressLine1}
                                            onChange={(e) =>
                                                setAddress({
                                                    ...address,
                                                    addressLine1: e.target.value,
                                                })
                                            }
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                        />

                                        <button
                                            type="submit"
                                            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
                                        >
                                            Save Address
                                        </button>

                                    </form>

                                    {message && (
                                        <p className="text-center text-green-600 mt-4">
                                            {message}
                                        </p>
                                    )}

                                </div>
                            )}

                    </div>
                </div>
            ) : (
                <div className="mt-6">
                    <h1 className="text-2xl font-bold mb-4">Please log in to view your profile.</h1>
                </div>
            )}
        </div>
    )
}

export default Profile