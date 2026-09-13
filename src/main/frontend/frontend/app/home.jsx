"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const categories = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=700&q=85",
      suppliers: "12,000+ suppliers",
    },
    {
      name: "Industrial Equipment",
      image:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=700&q=85",
      suppliers: "8,500+ suppliers",
    },
    {
      name: "Packaging & Materials",
      image:
        "https://images.unsplash.com/photo-1586528116493-da8b9a4f4f4d?auto=format&fit=crop&w=700&q=85",
      suppliers: "6,200+ suppliers",
    },
    {
      name: "Office Supplies",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=700&q=85",
      suppliers: "9,800+ suppliers",
    },
    {
      name: "Apparel & Textiles",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=700&q=85",
      suppliers: "7,400+ suppliers",
    },
    {
      name: "Agriculture & Food",
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=700&q=85",
      suppliers: "5,900+ suppliers",
    },
  ];

  const products = [
    {
      name: "Wireless Earbuds",
      company: "Shenzhen Tech Co.",
      price: "$12.50",
      moq: "100 pcs",
      image:
        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=85",
    },
    {
      name: "Solar Panel 550W",
      company: "Green Energy Ltd.",
      price: "$78.00",
      moq: "50 pcs",
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=85",
    },
    {
      name: "Ergonomic Office Chair",
      company: "Comfort Furnishings",
      price: "$95.00",
      moq: "20 pcs",
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=85",
    },
    {
      name: "CNC Machine",
      company: "Precision Tools Inc.",
      price: "$12,000",
      moq: "1 pc",
      image:
        "https://images.unsplash.com/photo-1565439396410-9f9b2a9a0a7a?auto=format&fit=crop&w=800&q=85",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">

          {/* Logo */}

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/")}
          >

            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">

              <span className="text-white text-2xl font-bold">
                A
              </span>

            </div>

            <div>

              <h1 className="font-bold text-2xl leading-none text-slate-900">
                AI B2B
              </h1>

              <p className="text-sm text-slate-600 mt-1">
                Marketplace
              </p>

            </div>

          </div>


          {/* Navigation */}

          <div className="hidden lg:flex items-center gap-10 text-base font-semibold text-slate-700">

            <button className="text-blue-600">
              Home
            </button>

            <button className="hover:text-blue-600 transition">
              Products
            </button>

            <button className="hover:text-blue-600 transition">
              Suppliers
            </button>

            <button className="hover:text-blue-600 transition">
              Categories
            </button>

            <button className="hover:text-blue-600 transition">
              About
            </button>

          </div>


          {/* Authentication */}

          <div className="flex items-center gap-3">

            <button
              onClick={() => router.push("/login")}
              className="px-5 py-3 rounded-xl border border-slate-300 text-slate-800 text-base font-semibold hover:border-blue-500 hover:text-blue-600 transition"
            >
              Login
            </button>

            <button
              onClick={() => router.push("/register")}
              className="px-5 py-3 rounded-xl bg-blue-600 text-white text-base font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
            >
              Register
            </button>

          </div>

        </div>

      </nav>


      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">

        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-blue-200/30 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-cyan-200/20 rounded-full blur-3xl" />


        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28">

          <div className="grid lg:grid-cols-2 gap-20 items-center">


            {/* Hero content */}

            <div>

             


              <h2 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-slate-950">

                The smarter way to

                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  buy & sell B2B
                </span>

              </h2>


              <p className="mt-8 text-xl text-slate-700 leading-relaxed max-w-2xl">

                Discover quality products, connect with trusted suppliers,
                compare prices, and grow your business with intelligent
                technology.

              </p>


              {/* Search */}

              <div className="mt-10 flex flex-col sm:flex-row gap-4 max-w-2xl">

                <input
                  type="text"
                  placeholder="Search products, suppliers, categories..."
                  className="flex-1 px-6 py-4.5 rounded-xl border border-slate-300 bg-white text-base text-slate-900 placeholder:text-slate-500 shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />

                <button className="px-9 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-base font-bold transition shadow-lg shadow-blue-500/20">
                  Search
                </button>

              </div>


              {/* Trust points */}

              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5 text-base font-semibold text-slate-700">

                <div className="flex items-center gap-2.5">
                  <span className="text-blue-600 text-lg">✓</span>
                  Verified Suppliers
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-blue-600 text-lg">✓</span>
                  Global Marketplace
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-blue-600 text-lg">✓</span>
                  AI Matching
                </div>

              </div>

            </div>


            {/* Hero image */}

            <div className="relative hidden lg:block">

              <div className="absolute -inset-6 bg-blue-200/30 rounded-[2rem] blur-2xl" />

              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white">

                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=90"
                  alt="Business team working together"
                  className="w-full h-[540px] object-cover"
                />


                {/* Floating AI card */}

                <div className="absolute bottom-7 left-7 right-7 bg-white/95 backdrop-blur rounded-2xl p-6 shadow-xl">

                  <div className="flex items-center gap-5">

                    <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">

                      <span className="text-blue-600 text-lg font-bold">
                        AI
                      </span>

                    </div>

                    <div>

                      <p className="font-bold text-lg text-slate-900">
                        Smart Supplier Matching
                      </p>

                      <p className="text-base text-slate-600 mt-1">
                        Find the right business partner faster
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CATEGORIES ================= */}

      <section className="py-24 bg-slate-50">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="text-center mb-14">

            <p className="text-blue-600 uppercase tracking-widest text-base font-bold">
              Explore
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-950 mt-4">
              Popular Categories
            </h2>

            <p className="text-lg text-slate-600 mt-5">
              Explore thousands of products across major industries.
            </p>

          </div>


          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

            {categories.map((category) => (

              <div
                key={category.name}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer"
              >

                <div className="h-36 overflow-hidden">

                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                </div>


                <div className="p-5">

                  <h3 className="font-bold text-base text-slate-900">
                    {category.name}
                  </h3>

                  <p className="text-sm text-slate-600 mt-2">
                    {category.suppliers}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= FEATURED PRODUCTS ================= */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">

            <div>

              <p className="text-blue-600 uppercase tracking-widest text-base font-bold">
                Trending
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-950 mt-4">
                Featured Products
              </h2>

              <p className="text-lg text-slate-600 mt-4">
                Quality products from trusted suppliers.
              </p>

            </div>


            <button className="mt-6 md:mt-0 px-6 py-3 rounded-xl border border-blue-500 text-blue-600 text-base font-semibold hover:bg-blue-50 transition">
              View All Products →
            </button>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">

            {products.map((product) => (

              <div
                key={product.name}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300"
              >

                <div className="h-60 overflow-hidden bg-slate-100">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                </div>


                <div className="p-6">

                  <h3 className="font-bold text-xl text-slate-900">
                    {product.name}
                  </h3>

                  <p className="text-base text-slate-600 mt-2">
                    {product.company}
                  </p>


                  <div className="mt-6 flex items-end justify-between">

                    <div>

                      <p className="text-2xl font-bold text-slate-950">
                        {product.price}
                      </p>

                      <p className="text-sm text-slate-600 mt-2">
                        Min. order: {product.moq}
                      </p>

                    </div>


                    <button className="px-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-blue-600 transition">
                      Details
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= AI SECTION ================= */}

      <section className="py-28 bg-gradient-to-r from-blue-600 to-cyan-500">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div className="text-white">

              <p className="text-blue-100 uppercase tracking-widest text-base font-bold">
                Why AI B2B
              </p>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-5 leading-tight">
                Smarter trade.
                <br />
                Better decisions.
              </h2>

              <p className="mt-7 text-blue-50 text-xl leading-relaxed max-w-xl">

                Use intelligent tools to discover suppliers,
                compare products, understand pricing, and make
                better business decisions.

              </p>


              <button
                onClick={() => router.push("/register")}
                className="mt-9 px-8 py-4 rounded-xl bg-white text-blue-600 text-base font-bold hover:bg-blue-50 transition shadow-lg"
              >
                Start Trading Today →
              </button>

            </div>


            <div className="grid sm:grid-cols-2 gap-6">

              {[
                {
                  title: "AI Supplier Matching",
                  text: "Find suppliers based on your business requirements.",
                },
                {
                  title: "Smart Pricing",
                  text: "Understand market prices and make better purchasing decisions.",
                },
                {
                  title: "Global Network",
                  text: "Connect with suppliers and businesses from different markets.",
                },
                {
                  title: "Business Insights",
                  text: "Turn marketplace data into useful business insights.",
                },
              ].map((feature) => (

                <div
                  key={feature.title}
                  className="bg-white/10 border border-white/20 backdrop-blur rounded-2xl p-7 text-white hover:bg-white/20 transition"
                >

                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">

                    <span className="font-bold text-base">
                      AI
                    </span>

                  </div>

                  <h3 className="font-bold text-lg">
                    {feature.title}
                  </h3>

                  <p className="text-base text-blue-50 mt-3 leading-relaxed">
                    {feature.text}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="bg-slate-950 text-white">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg">
                  A
                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    AI B2B
                  </h3>

                  <p className="text-sm text-slate-400">
                    Marketplace
                  </p>

                </div>

              </div>

              <p className="text-base text-slate-400 mt-6 leading-relaxed">
                Connecting businesses. Powering smarter trade.
              </p>

            </div>


            <div>

              <h3 className="font-bold text-lg">
                Marketplace
              </h3>

              <div className="mt-5 space-y-4 text-base text-slate-400">

                <p className="hover:text-white cursor-pointer">
                  Products
                </p>

                <p className="hover:text-white cursor-pointer">
                  Suppliers
                </p>

                <p className="hover:text-white cursor-pointer">
                  Categories
                </p>

              </div>

            </div>


            <div>

              <h3 className="font-bold text-lg">
                Company
              </h3>

              <div className="mt-5 space-y-4 text-base text-slate-400">

                <p className="hover:text-white cursor-pointer">
                  About Us
                </p>

                <p className="hover:text-white cursor-pointer">
                  Contact
                </p>

                <p className="hover:text-white cursor-pointer">
                  Privacy Policy
                </p>

              </div>

            </div>


            <div>

              <h3 className="font-bold text-lg">
                Stay Updated
              </h3>

              <p className="text-base text-slate-400 mt-5 leading-relaxed">
                Get marketplace updates and business insights.
              </p>

              <div className="flex mt-5">

                <input
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 px-4 py-3.5 rounded-l-xl bg-white text-slate-900 text-base outline-none"
                />

                <button className="px-5 bg-blue-600 hover:bg-blue-700 rounded-r-xl text-base font-semibold">
                  Subscribe
                </button>

              </div>

            </div>

          </div>


          <div className="border-t border-white/10 mt-14 pt-7 flex flex-col md:flex-row justify-between gap-4 text-base text-slate-500">

            <p>
              © 2026 AI B2B Marketplace. All rights reserved.
            </p>

            <p>
              Smarter trade. Better business.
            </p>

          </div>

        </div>

      </footer>

    </main>
  );
}