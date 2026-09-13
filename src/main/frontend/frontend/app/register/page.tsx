"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:8080/api/v1/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
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

            console.log("Registered user:", data);

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

            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />


            <div className="relative w-full max-w-6xl">

                <div className="grid lg:grid-cols-2 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200">


                    {/* REGISTER FORM */}

                    <div className="p-9 sm:p-14 lg:p-16 order-2 lg:order-1">

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
                                Create Account
                            </p>

                            <h2 className="text-5xl font-bold text-slate-950 mt-5">
                                Join the marketplace
                            </h2>

                            <p className="text-lg text-slate-600 mt-5 leading-relaxed">
                                Create your business account and start trading.
                            </p>

                        </div>


                        <form
                            onSubmit={handleRegister}
                            className="mt-10 space-y-6"
                        >

                            {/* COMPANY NAME */}

                            <div>

                                <label className="block text-base font-bold text-slate-800 mb-3">
                                    Company name
                                </label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="ABC Industries"
                                    className="w-full px-5 py-4 rounded-xl border border-slate-300 bg-slate-50 text-base text-slate-900 placeholder:text-slate-500 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                                    required
                                />

                            </div>


                            {/* EMAIL */}

                            <div>

                                <label className="block text-base font-bold text-slate-800 mb-3">
                                    Business email
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

                                <label className="block text-base font-bold text-slate-800 mb-3">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a secure password"
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

                                {loading
                                    ? "Creating account..."
                                    : "Create Account"}

                            </button>

                        </form>


                        <div className="mt-10 text-center">

                            <p className="text-base text-slate-600">

                                Already have an account?{" "}

                                <button
                                    onClick={() => router.push("/login")}
                                    className="font-bold text-blue-600 hover:text-blue-700"
                                >
                                    Sign in
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


                    {/* RIGHT PANEL */}

                    <div className="hidden lg:flex relative bg-gradient-to-br from-blue-600 to-cyan-500 p-14 text-white flex-col justify-between order-1 lg:order-2">

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
                                    Built for Business
                                </p>

                                <h2 className="text-5xl font-bold leading-tight mt-5">
                                    Grow your
                                    <br />
                                    business globally.
                                </h2>

                                <p className="mt-7 text-lg text-blue-50 leading-relaxed max-w-md">
                                    Discover new suppliers, showcase products,
                                    and unlock smarter opportunities with
                                    AI-powered B2B commerce.
                                </p>

                            </div>

                        </div>


                        {/* BENEFITS */}

                        <div className="space-y-5">

                            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">

                                <div className="flex items-center gap-5">

                                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center font-bold text-base">
                                        01
                                    </div>

                                    <div>

                                        <h3 className="font-bold text-lg">
                                            Discover suppliers
                                        </h3>

                                        <p className="text-base text-blue-100 mt-1">
                                            Find the right business partners.
                                        </p>

                                    </div>

                                </div>

                            </div>


                            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">

                                <div className="flex items-center gap-5">

                                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center font-bold text-base">
                                        02
                                    </div>

                                    <div>

                                        <h3 className="font-bold text-lg">
                                            Make smarter decisions
                                        </h3>

                                        <p className="text-base text-blue-100 mt-1">
                                            Use AI-powered marketplace tools.
                                        </p>

                                    </div>

                                </div>

                            </div>


                            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">

                                <div className="flex items-center gap-5">

                                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center font-bold text-base">
                                        03
                                    </div>

                                    <div>

                                        <h3 className="font-bold text-lg">
                                            Grow globally
                                        </h3>

                                        <p className="text-base text-blue-100 mt-1">
                                            Connect with businesses worldwide.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}