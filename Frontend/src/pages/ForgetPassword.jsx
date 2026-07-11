import React, { useState } from 'react'
import axios from 'axios';


function ForgetPassword() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setMessage("");

            const { data } = await axios.post('http://localhost:5000/api/auth/forgotpassword', {
                email
            }, { withCredentials: true });

            setMessage(data.message);

           
        }
        catch (error) {
            
            setMessage(error.response.data.message || 'An error occurred while sending the password reset email.');
        }
        finally {
            setLoading(false);
        }
    }
    {/* loading screen */ }
    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-xl">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl px-10 py-8 border border-white">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-14 h-14 border-[3px] border-gray-200 border-t-black rounded-full animate-spin"></div>

                        <h2 className="text-lg font-semibold text-gray-900">
                            Loading...
                        </h2>

                        <p className="text-sm text-gray-500">
                            Please wait a moment
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

                <h1 className="text-3xl font-bold text-center text-black">
                    Forgot Password
                </h1>

                <p className="text-gray-500 text-center mt-3 text-sm sm:text-base">
                    Enter your email address and we'll send you a password reset link.
                </p>

                <div className="mt-8">
                    <label className="block text-sm font-medium mb-2">
                        Email Address
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-black transition-all"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full mt-6 bg-black text-white py-3 rounded-2xl font-medium hover:opacity-90 transition-all cursor-pointer"
                >
                    Send Reset Link
                </button>

                {message && (
                    <p className="text-green-500 mt-4 text-md text-gray-600">
                        {message}
                    </p>
                )}

                <p className="text-center text-gray-500 text-sm mt-5">
                    Remember your password?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-black font-medium cursor-pointer"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    )
}

export default ForgetPassword