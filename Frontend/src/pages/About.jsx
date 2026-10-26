import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faCompass,
    faGem,
    faHeart,
    faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Navbar from "../Componet/Navbar";
import Footer from "../Componet/Footer";
import logo from "../assets/Logo.png";
import heroImage from "../assets/heroImg.png";

const values = [
    {
        icon: faCompass,
        title: "Curated with purpose",
        text: "Every collection is selected to make everyday dressing feel more considered and effortless.",
    },
    {
        icon: faGem,
        title: "Quality that lasts",
        text: "We look for comfortable fabrics, thoughtful details, and pieces that stay in rotation.",
    },
    {
        icon: faHeart,
        title: "Style for real life",
        text: "From first plans to slow Sundays, StyleHub is made for the way you actually live.",
    },
    {
        icon: faShieldHalved,
        title: "A simpler experience",
        text: "Clear choices, secure checkout, and support that is there when you need it.",
    },
];

function About() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const image = new Image();
        image.src = heroImage;
        image.onload = () => setLoading(false);
        image.onerror = () => setLoading(false);

        return () => {
            image.onload = null;
            image.onerror = null;
        };
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-100">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
                    <p className="text-sm text-gray-500">Loading StyleHub...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 px-4 py-5 text-slate-950 sm:px-6 lg:px-8">
            <Navbar />

            <main className="mx-auto max-w-7xl py-8 sm:py-12">
                <section className="grid overflow-hidden rounded-[32px] bg-black text-white lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="flex flex-col justify-center px-6 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
                        <div className="mb-8 flex items-center gap-3">
                            <img src={logo} alt="StyleHub logo" className="h-12 w-12 rounded-2xl bg-white p-1" />
                            <span className="text-sm font-medium uppercase tracking-[0.22em] text-zinc-400">About StyleHub</span>
                        </div>
                        <h1 className="max-w-xl text-4xl font-semibold leading-tight sm:text-6xl">
                            Clothes that feel like you.
                        </h1>
                        <p className="mt-6 max-w-xl text-base leading-8 text-zinc-300 sm:text-lg">
                            StyleHub is a thoughtful fashion destination for people who want
                            to dress with confidence, comfort, and a point of view.
                        </p>
                        <Link
                            to="/shop"
                            className="mt-9 inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
                        >
                            Explore the collection
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </div>
                    <div className="relative min-h-[320px] overflow-hidden bg-zinc-900 sm:min-h-[420px] lg:min-h-full">
                        <img src={heroImage} alt="StyleHub fashion collection" className="absolute inset-0 h-full w-full object-cover object-center opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
                        <div className="absolute bottom-6 left-6 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:bottom-8 sm:left-8">
                            Everyday, elevated
                        </div>
                    </div>
                </section>

                <section className="grid gap-10 px-2 py-16 md:grid-cols-[1fr_1.3fr] md:items-center md:gap-20 md:px-8 lg:py-24">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Our point of view</p>
                        <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">
                            Less noise. More personal style.
                        </h2>
                    </div>
                    <div className="space-y-5 text-base leading-8 text-zinc-600 sm:text-lg">
                        <p>
                            Fashion should help you express yourself, not make getting
                            dressed harder. We bring together dependable essentials and
                            directional pieces so you can build a wardrobe that feels
                            distinctly yours.
                        </p>
                        <p>
                            StyleHub began with a simple idea: a better online shopping
                            experience should feel inspiring, easy to navigate, and grounded
                            in the details that matter.
                        </p>
                    </div>
                </section>

                <section className="border-y border-zinc-200 py-16 lg:py-20">
                    <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">What guides us</p>
                            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Our values</h2>
                        </div>
                        <p className="max-w-md text-zinc-500">A little more intention in every product, interaction, and delivery.</p>
                    </div>
                    <div className="grid gap-px overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((value) => (
                            <article key={value.title} className="bg-white p-7">
                                <FontAwesomeIcon icon={value.icon} className="text-xl" />
                                <h3 className="mt-8 text-lg font-semibold">{value.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-zinc-500">{value.text}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="flex flex-col items-start justify-between gap-8 px-2 py-16 md:flex-row md:items-center md:px-8 lg:py-24">
                    <div>
                        <h2 className="text-3xl font-semibold sm:text-4xl">Find your next favourite.</h2>
                        <p className="mt-3 text-zinc-500">New looks, familiar comfort, and a wardrobe that moves with you.</p>
                    </div>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:bg-zinc-800"
                    >
                        Shop StyleHub
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default About;
