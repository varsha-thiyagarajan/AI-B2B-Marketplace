"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {

  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  // ==========================================
  // FETCH PRODUCTS
  // ==========================================

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const storedUser =
          localStorage.getItem("user");


        // Check login
        if (!token || !storedUser) {

          router.push("/login");

          return;
        }


        const user =
          JSON.parse(storedUser);


        console.log(
          "Logged-in user:",
          user
        );


        // ==========================================
        // GET PRODUCTS FOR THIS USER
        // ==========================================

        const response = await fetch(
          `http://localhost:8080/api/v1/products/seller/${user.id}`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        if (!response.ok) {

          console.error(
            "Failed to fetch products:",
            response.status
          );

          return;
        }


        const data =
          await response.json();


        console.log(
          "User products:",
          data
        );


        setProducts(data);

      } catch (error) {

        console.error(
          "Error fetching products:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    fetchProducts();

  }, [router]);


  return (

    <main className="min-h-screen bg-slate-50">


      {/* ==========================================
          HEADER
      ========================================== */}

      <header className="bg-white border-b border-slate-200">

        <div
          className="max-w-7xl
                     mx-auto
                     px-6
                     py-5
                     flex
                     items-center
                     justify-between"
        >

          <div>

            <h1 className="text-2xl font-bold text-slate-900">
              My Products
            </h1>

            <p className="text-sm text-slate-600 mt-1">
              Manage the products you have listed
            </p>

          </div>


          <button
            onClick={() =>
              router.push("/products/new")
            }
            className="px-6
                       py-3
                       rounded-xl
                       bg-blue-600
                       text-white
                       font-semibold
                       hover:bg-blue-700
                       shadow-lg
                       shadow-blue-500/20
                       transition"
          >
            + Add Product
          </button>

        </div>

      </header>



      {/* ==========================================
          CONTENT
      ========================================== */}

      <section className="max-w-7xl mx-auto px-6 py-10">


        {/* LOADING */}

        {loading && (

          <div className="flex justify-center py-20">

            <div
              className="w-10
                         h-10
                         border-4
                         border-blue-200
                         border-t-blue-600
                         rounded-full
                         animate-spin"
            />

          </div>

        )}



        {/* NO PRODUCTS */}

        {!loading && products.length === 0 && (

          <div
            className="bg-white
                       rounded-2xl
                       border
                       border-slate-200
                       shadow-sm
                       p-12
                       text-center"
          >

            <div
              className="w-16
                         h-16
                         mx-auto
                         rounded-2xl
                         bg-blue-50
                         flex
                         items-center
                         justify-center
                         text-blue-600
                         text-2xl"
            >
              +
            </div>


            <h2 className="text-xl font-bold text-slate-900 mt-5">
              No products yet
            </h2>


            <p className="text-slate-600 mt-2">
              Start by adding your first product.
            </p>


            <button
              onClick={() =>
                router.push("/products/new")
              }
              className="mt-6
                         px-6
                         py-3
                         rounded-xl
                         bg-blue-600
                         text-white
                         font-semibold
                         hover:bg-blue-700
                         transition"
            >
              Add Your First Product
            </button>

          </div>

        )}



        {/* ==========================================
            PRODUCT GRID
        ========================================== */}

        {!loading && products.length > 0 && (

          <div
            className="grid
                       grid-cols-1
                       md:grid-cols-2
                       lg:grid-cols-3
                       gap-7"
          >

            {products.map((product) => (

              <div
                key={product.id}
                className="bg-white
                           rounded-2xl
                           border
                           border-slate-200
                           shadow-sm
                           overflow-hidden
                           hover:shadow-lg
                           hover:-translate-y-1
                           transition"
              >


                {/* ==================================
                    PRODUCT IMAGE
                ================================== */}

                <div
                  className="h-56
                             bg-slate-100
                             flex
                             items-center
                             justify-center"
                >

                  {product.imageUrl ? (

                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full
                                 h-full
                                 object-cover"
                    />

                  ) : (

                    <div
                      className="text-center
                                 text-slate-400"
                    >

                      <div className="text-4xl mb-2">
                        📦
                      </div>

                      <p className="text-sm">
                        No image available
                      </p>

                    </div>

                  )}

                </div>



                {/* ==================================
                    PRODUCT DETAILS
                ================================== */}

                <div className="p-6">


                  {/* CATEGORY */}

                  <span
                    className="inline-block
                               px-3
                               py-1
                               rounded-full
                               bg-blue-50
                               text-blue-700
                               text-xs
                               font-semibold"
                  >
                    {product.category}
                  </span>



                  {/* NAME */}

                  <h2
                    className="text-xl
                               font-bold
                               text-slate-900
                               mt-4"
                  >
                    {product.name}
                  </h2>



                  {/* DESCRIPTION */}

                  <p
                    className="text-sm
                               text-slate-600
                               mt-2
                               leading-relaxed
                               line-clamp-3"
                  >
                    {product.description}
                  </p>



                  {/* PRICE */}

                  <div className="mt-5">

                    <p className="text-xs text-slate-500">
                      Price
                    </p>

                    <p
                      className="text-2xl
                                 font-bold
                                 text-blue-600
                                 mt-1"
                    >
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </p>

                  </div>



                  {/* QUANTITY INFORMATION */}

                  <div
                    className="grid
                               grid-cols-2
                               gap-4
                               mt-5
                               pt-5
                               border-t
                               border-slate-100"
                  >

                    <div>

                      <p className="text-xs text-slate-500">
                        Available
                      </p>

                      <p className="text-sm font-bold text-slate-900 mt-1">
                        {product.quantity}
                      </p>

                    </div>


                    <div>

                      <p className="text-xs text-slate-500">
                        Minimum Order
                      </p>

                      <p className="text-sm font-bold text-slate-900 mt-1">
                        {product.minimumOrderQuantity}
                      </p>

                    </div>

                  </div>



                  {/* PRODUCT ID */}

                  <div className="mt-5">

                    <p className="text-xs text-slate-400">
                      Product ID: #{product.id}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>

  );
}