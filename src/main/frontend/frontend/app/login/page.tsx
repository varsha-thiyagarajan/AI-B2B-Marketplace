"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:8080/api/v1/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data);
                return;
            }

            console.log("Logged in user:", data);

            router.push("/");

        } catch (error) {
            setError("Unable to connect to backend.");
            console.error(error);

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-6 py-14">

            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />


            <div className="relative w-full max-w-6xl">

                <div className="grid lg:grid-cols-2 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200">


                    {/* LEFT PANEL */}

                    <div className="hidden lg:flex relative bg-gradient-to-br from-blue-600 to-cyan-500 p-14 text-white flex-col justify-between">

                        <div>

                            <div
                                className="flex items-center gap-3 cursor-pointer"
                                onClick={() => router.push("/")}
                            >

                                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">

                                    <span className="text-2xl font-bold">
                                        A
                                    </span>

                                </div>

                                <div>

                                    <h1 className="font-bold text-2xl">
                                        AI B2B
                                    </h1>

                                    <p className="text-sm text-blue-100 mt-1">
                                        Marketplace
                                    </p>

                                </div>

                            </div>


                            <div className="mt-24">

                                <p className="uppercase tracking-widest text-base text-blue-100 font-bold">
                                    Welcome Back
                                </p>

                                <h2 className="text-5xl font-bold leading-tight mt-5">
                                    Smarter trade
                                    <br />
                                    starts here.
                                </h2>

                                <p className="mt-7 text-lg text-blue-50 leading-relaxed max-w-md">
                                    Connect with trusted suppliers, discover
                                    quality products, and grow your business
                                    through an intelligent B2B marketplace.
                                </p>

                            </div>

                        </div>


                        <div className="grid grid-cols-2 gap-5">

                            <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/20">

                                <p className="text-3xl font-bold">
                                    AI
                                </p>

                                <p className="text-base text-blue-100 mt-2">
                                    Smart matching
                                </p>

                            </div>


                            <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/20">

                                <p className="text-3xl font-bold">
                                    B2B
                                </p>

                                <p className="text-base text-blue-100 mt-2">
                                    Global marketplace
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* LOGIN */}

                    <div className="p-9 sm:p-14 lg:p-16">

                        <div className="lg:hidden flex items-center gap-3 mb-12">

                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center">

                                <span className="text-white text-2xl font-bold">
                                    A
                                </span>

                            </div>

                            <div>

                                <h1 className="font-bold text-2xl text-slate-900">
                                    AI B2B
                                </h1>

                                <p className="text-sm text-slate-600 mt-1">
                                    Marketplace
                                </p>

                            </div>

                        </div>


                        <div>

                            <p className="text-blue-600 text-base font-bold uppercase tracking-widest">
                                Account Login
                            </p>

                            <h2 className="text-5xl font-bold text-slate-950 mt-5">
                                Welcome back
                            </h2>

                            <p className="text-lg text-slate-600 mt-5 leading-relaxed">
                                Sign in to continue to your marketplace.
                            </p>

                        </div>


                        <form
                            onSubmit={handleLogin}
                            className="mt-10 space-y-7"
                        >

                            {/* EMAIL */}

                            <div>

                                <label className="block text-base font-bold text-slate-800 mb-3">
                                    Email address
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@company.com"
                                    className="w-full px-5 py-4 rounded-xl border border-slate-300 bg-slate-50 text-base text-slate-900 placeholder:text-slate-500 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                                    required
                                />

                            </div>


                            {/* PASSWORD */}

                            <div>

                                <div className="flex justify-between items-center mb-3">

                                    <label className="block text-base font-bold text-slate-800">
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                                    >
                                        Forgot password?
                                    </button>

                                </div>

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full px-5 py-4 rounded-xl border border-slate-300 bg-slate-50 text-base text-slate-900 placeholder:text-slate-500 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                                    required
                                />

                            </div>


                            {/* ERROR */}

                            {error && (

                                <div className="rounded-xl bg-red-50 border border-red-200 px-5 py-4">

                                    <p className="text-base text-red-600 font-medium">
                                        {error}
                                    </p>

                                </div>

                            )}


                            {/* BUTTON */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-base text-white font-bold transition shadow-lg shadow-blue-500/20"
                            >

                                {loading ? "Signing in..." : "Sign In"}

                            </button>

                        </form>


                        <div className="mt-10 text-center">

                            <p className="text-base text-slate-600">

                                Don't have an account?{" "}

                                <button
                                    onClick={() => router.push("/register")}
                                    className="font-bold text-blue-600 hover:text-blue-700"
                                >
                                    Create one
                                </button>

                            </p>

                        </div>


                        <button
                            onClick={() => router.push("/")}
                            className="mt-9 w-full text-base text-slate-500 hover:text-slate-800 font-medium transition"
                        >
                            ← Back to marketplace
                        </button>

                    </div>

                </div>

            </div>

        </main>
    );
}