import React, { useState , set }from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SetPassword() {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            setLoading(true);
            setMessage("");

            const { data } = await axios.post(`http://localhost:5000/api/auth/resetpassword/${token}`, {
                password: newPassword
            }, { withCredentials: true });

            setMessage(data.message);

             setTimeout(() => {
                navigate('/login');
            }, 1000);
        }
        catch (error) {
            setMessage(error.response.data.message || 'An error occurred while resetting the password.');
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

                <h1 className="text-3xl font-bold text-center">
                    Set New Password
                </h1>

                <p className="text-center text-gray-500 mt-3">
                    Enter and confirm your new password.
                </p>

                <div className="mt-8 space-y-4">

                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-black transition-all"
                    />

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-black transition-all"
                    />

                </div>

                {message && (
                    <p className="text-green-500 mt-4 text-md text-gray-600">
                        {message}
                    </p>
                )}

                <button
                    onClick={handleSubmit}
                    className="w-full mt-6 bg-black text-white py-3 rounded-2xl font-medium hover:opacity-90 transition-all cursor-pointer"
                >
                    Update Password
                </button>


            </div>
        </div>
    )
}

export default SetPassword