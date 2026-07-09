import React from 'react'
import logo from '../assets/Logo.png'
import { GoogleLogin } from '@react-oauth/google'
import Register3d from './../3dImage/Register-3d.png'
import { useState } from 'react'
import axios from 'axios'
import { data, useNavigate } from 'react-router-dom'


function Register() {

    const [Name, setName] = useState('');
    const [Username, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();



    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/register', {
                name: Name,
                username: Username,
                email: Email,
                password: Password
            }, { withCredentials: true });
            if (data) {
                navigate('/');
            }

        }
        catch (error) {
            console.error('Error registering user:', error);
            setMessage(error.response.data.message || 'An error occurred during registration.');
        }
    }


    return (
        <div className="min-h-screen bg-zinc-100 px-4 py-8 flex items-center justify-center sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/10 lg:grid lg:grid-cols-2">
                <div className="relative hidden overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-zinc-800 px-10 text-white lg:flex xl:px-16">
                    <div className="relative z-10 flex flex-col justify-start pt-14 xl:pt-16">
                        <h1 className="mt-4 max-w-md text-5xl xl:text-5xl font-normal leading-tight">
                            Your next favorite outfit is just a click away.
                        </h1>
                        <p className="mt-4 max-w-md text-lg xl:text-lg text-zinc-300 font-light tracking-wide">
                            Sign up now and explore the latest fashion trends.
                        </p>
                    </div>

                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%)]" />
                    <img
                        className="absolute inset-x-0 inset-y-43 bottom-0 z-10 h-[78%] w-full scale-120 object-contain object-bottom px-6 lg:scale-205 xl:px-10 xl:scale-205 "
                        src={Register3d}
                        alt="3D Login"
                    />
                </div>

                <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14">
                    <div className="flex flex-col items-center text-center">
                        <img className="h-14 w-14 sm:h-16 sm:w-16" src={logo} alt="StyleHub logo" />
                        <h1 className="mt-1 text-2xl sm:text-3xl font-normal text-slate-900">StyleHub</h1>
                        <h2 className="mt-6 text-3xl sm:text-4xl font-normal tracking-tight text-slate-900">
                            Create an Account
                        </h2>
                        <p className="mt-2 text-sm sm:text-base text-zinc-500">
                            Please fill in the details to create your account
                        </p>
                    </div>

                    <form
                        onSubmit={handleRegister}
                        className="mt-8 flex w-full flex-col gap-4">

                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-zinc-400 focus:border-black focus:ring-4 focus:ring-zinc-200"
                        />
                        <input
                            type="text"
                            placeholder="Enter Your Username"
                            value={Username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-zinc-400 focus:border-black focus:ring-4 focus:ring-zinc-200"
                        />
                        <input
                            type="text"
                            placeholder="Enter Your Email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-zinc-400 focus:border-black focus:ring-4 focus:ring-zinc-200"
                        />


                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-zinc-400 focus:border-black focus:ring-4 focus:ring-zinc-200"
                        />

                        <button
                            className="mt-2 w-full cursor-pointer rounded-xl bg-black px-4 py-3 font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-300">
                            Register
                        </button>
                    </form>

                    {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}

                    <div className="mt-6 flex items-center justify-center gap-4 mb-4">
                        <span className="w-1/5 border-b border-zinc-300"></span>
                        <p className="text-sm text-zinc-500">Or continue with</p>
                        <span className="w-1/5 border-b border-zinc-300"></span>
                    </div>

                    <div className="border-2 border-black rounded-3xl inline-block mb-4">
                        <GoogleLogin
                            shape="circle"
                            text="signup_with" />
                    </div>


                    <h3 className="text-md text-center text-zinc-500">
                        Already have an account? <a href="#" className="underline text-black">Login</a>
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Register;