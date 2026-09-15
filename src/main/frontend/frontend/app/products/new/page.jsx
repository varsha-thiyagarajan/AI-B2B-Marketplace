"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  // Product form state
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minimumOrderQuantity, setMinimumOrderQuantity] = useState("");
  const [category, setCategory] = useState("");

  // Image state
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Publish state
  const [isPublishing, setIsPublishing] = useState(false);


  // ==============================
  // IMAGE SELECTION
  // ==============================

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImageFile(file);

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };


  // ==============================
  // PUBLISH PRODUCT
  // ==============================

  const handlePublishProduct = async () => {

    // Basic validation
    if (!productName.trim()) {
      alert("Please enter a product name.");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a product description.");
      return;
    }

    if (!price || Number(price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (!quantity || Number(quantity) <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (
      !minimumOrderQuantity ||
      Number(minimumOrderQuantity) <= 0
    ) {
      alert("Please enter a valid minimum order quantity.");
      return;
    }

    if (!category) {
      alert("Please select a category.");
      return;
    }


    try {

      setIsPublishing(true);


      // Get JWT and logged-in user
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");


      // Check login
      if (!token || !storedUser) {

        alert("Please login first.");

        router.push("/login");

        return;
      }


      const user = JSON.parse(storedUser);


      // Product data sent to Spring Boot
      const productData = {

        name: productName,

        description: description,

        price: Number(price),

        quantity: Number(quantity),

        minimumOrderQuantity:
          Number(minimumOrderQuantity),

        category: category,

        seller: {
          id: user.id,
        },
      };


      console.log(
        "Product being sent:",
        productData
      );


      // ==============================
      // CREATE PRODUCT
      // ==============================

      const response = await fetch(
        "http://localhost:8080/api/v1/products",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(productData),
        }
      );


      // Handle backend error
     if (!response.ok) {
  const errorText = await response.text();

  console.error("Product creation failed");
  console.error("Status:", response.status);
  console.error("Status Text:", response.statusText);
  console.error("Response:", errorText);

  alert(
    `Failed to create product. Status: ${response.status}`
  );

  return;
}


      // Read created product
      const createdProduct =
        await response.json();


      console.log(
        "Product created:",
        createdProduct
      );


      console.log(
        "Created Product ID:",
        createdProduct.id
      );


      if(imageFile)
      {
        const imageFormData=new FormData();
        imageFormData.append("file",imageFile);
        console.log("Uploading image to S3...");
        const imageResponse=await fetch( `http://localhost:8080/api/v1/products/${createdProduct.id}/image`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: imageFormData,
    })
  if (!imageResponse.ok) {

    const imageError =
      await imageResponse.text();

    console.error(
      "Image upload failed:",
      imageError
    );

    alert(
      "Product created, but image upload failed."
    );

    return;
  }

  const updatedProduct =
    await imageResponse.json();

  console.log(
    "Image uploaded successfully:",
    updatedProduct
  );

    
      }
alert(
  "Product and image created successfully!"
);


    } catch (error) {

      console.error(
        "Error creating product:",
        error
      );

      alert(
        "Something went wrong while creating the product."
      );

    } finally {

      setIsPublishing(false);

    }
  };


  return (
    <main className="min-h-screen bg-slate-50">


      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <header className="bg-white border-b border-slate-200">

        <div
          className="max-w-7xl mx-auto px-6 py-5
                     flex items-center justify-between"
        >

          <div>

            <h1 className="text-2xl font-bold text-slate-900">
              Add New Product
            </h1>

            <p className="text-sm text-slate-600 mt-1">
              Create a professional product listing for your buyers
            </p>

          </div>


          <button
            onClick={() => router.push("/")}
            className="px-5 py-2.5 rounded-xl
                       border border-slate-300
                       text-slate-800
                       font-semibold
                       hover:border-blue-500
                       hover:text-blue-600
                       transition"
          >
            Back to Marketplace
          </button>

        </div>

      </header>



      {/* ===================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================== */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div
          className="grid grid-cols-1
                     lg:grid-cols-3
                     gap-8"
        >


          {/* ================================= */}
          {/* LEFT SIDE - PRODUCT FORM */}
          {/* ================================= */}

          <div className="lg:col-span-2">

            <div
              className="bg-white
                         rounded-2xl
                         border border-slate-200
                         shadow-sm
                         p-8"
            >


              {/* FORM HEADER */}

              <div className="mb-8">

                <h2 className="text-xl font-bold text-slate-900">
                  Product Information
                </h2>

                <p className="text-sm text-slate-600 mt-1">
                  Provide accurate information about your product.
                </p>

              </div>



              {/* ============================= */}
              {/* PRODUCT NAME */}
              {/* ============================= */}

              <div className="mb-6">

                <label
                  className="block
                             text-sm
                             font-semibold
                             text-slate-800
                             mb-2"
                >
                  Product Name
                </label>


                <input
                  type="text"

                  placeholder="e.g. Industrial Electric Motor"

                  value={productName}

                  onChange={(e) =>
                    setProductName(e.target.value)
                  }

                  className="w-full
                             px-4
                             py-3
                             rounded-xl
                             border
                             border-slate-300
                             bg-white
                             text-slate-900
                             placeholder:text-slate-500
                             outline-none
                             focus:border-blue-500
                             focus:ring-4
                             focus:ring-blue-500/10
                             transition"
                />

              </div>



              {/* ============================= */}
              {/* DESCRIPTION */}
              {/* ============================= */}

              <div className="mb-6">

                <label
                  className="block
                             text-sm
                             font-semibold
                             text-slate-800
                             mb-2"
                >
                  Description
                </label>


                <textarea
                  rows="5"

                  placeholder="Describe the product, specifications, applications, materials, and other important details..."

                  value={description}

                  onChange={(e) =>
                    setDescription(e.target.value)
                  }

                  className="w-full
                             px-4
                             py-3
                             rounded-xl
                             border
                             border-slate-300
                             bg-white
                             text-slate-900
                             placeholder:text-slate-500
                             outline-none
                             resize-none
                             focus:border-blue-500
                             focus:ring-4
                             focus:ring-blue-500/10
                             transition"
                />

              </div>



              {/* ============================= */}
              {/* PRICE + QUANTITY */}
              {/* ============================= */}

              <div
                className="grid
                           grid-cols-1
                           md:grid-cols-2
                           gap-6
                           mb-6"
              >


                {/* PRICE */}

                <div>

                  <label
                    className="block
                               text-sm
                               font-semibold
                               text-slate-800
                               mb-2"
                  >
                    Price (₹)
                  </label>


                  <input
                    type="number"

                    placeholder="25000"

                    min="0"

                    value={price}

                    onChange={(e) =>
                      setPrice(e.target.value)
                    }

                    className="w-full
                               px-4
                               py-3
                               rounded-xl
                               border
                               border-slate-300
                               bg-white
                               text-slate-900
                               placeholder:text-slate-500
                               outline-none
                               focus:border-blue-500
                               focus:ring-4
                               focus:ring-blue-500/10
                               transition"
                  />

                </div>



                {/* AVAILABLE QUANTITY */}

                <div>

                  <label
                    className="block
                               text-sm
                               font-semibold
                               text-slate-800
                               mb-2"
                  >
                    Available Quantity
                  </label>


                  <input
                    type="number"

                    placeholder="100"

                    min="1"

                    value={quantity}

                    onChange={(e) =>
                      setQuantity(e.target.value)
                    }

                    className="w-full
                               px-4
                               py-3
                               rounded-xl
                               border
                               border-slate-300
                               bg-white
                               text-slate-900
                               placeholder:text-slate-500
                               outline-none
                               focus:border-blue-500
                               focus:ring-4
                               focus:ring-blue-500/10
                               transition"
                  />

                </div>

              </div>



              {/* ============================= */}
              {/* MOQ + CATEGORY */}
              {/* ============================= */}

              <div
                className="grid
                           grid-cols-1
                           md:grid-cols-2
                           gap-6
                           mb-8"
              >


                {/* MOQ */}

                <div>

                  <label
                    className="block
                               text-sm
                               font-semibold
                               text-slate-800
                               mb-2"
                  >
                    Minimum Order Quantity
                  </label>


                  <input
                    type="number"

                    placeholder="10"

                    min="1"

                    value={minimumOrderQuantity}

                    onChange={(e) =>
                      setMinimumOrderQuantity(
                        e.target.value
                      )
                    }

                    className="w-full
                               px-4
                               py-3
                               rounded-xl
                               border
                               border-slate-300
                               bg-white
                               text-slate-900
                               placeholder:text-slate-500
                               outline-none
                               focus:border-blue-500
                               focus:ring-4
                               focus:ring-blue-500/10
                               transition"
                  />

                </div>



                {/* CATEGORY */}

                <div>

                  <label
                    className="block
                               text-sm
                               font-semibold
                               text-slate-800
                               mb-2"
                  >
                    Category
                  </label>


                  <select
                    value={category}

                    onChange={(e) =>
                      setCategory(e.target.value)
                    }

                    className="w-full
                               px-4
                               py-3
                               rounded-xl
                               border
                               border-slate-300
                               bg-white
                               text-slate-900
                               outline-none
                               focus:border-blue-500
                               focus:ring-4
                               focus:ring-blue-500/10
                               transition"
                  >

                    <option value="" disabled>
                      Select category
                    </option>

                    <option value="Industrial Equipment">
                      Industrial Equipment
                    </option>

                    <option value="Electronics">
                      Electronics
                    </option>

                    <option value="Raw Materials">
                      Raw Materials
                    </option>

                    <option value="Packaging">
                      Packaging
                    </option>

                    <option value="Office Supplies">
                      Office Supplies
                    </option>

                    <option value="Safety Equipment">
                      Safety Equipment
                    </option>

                    <option value="Construction">
                      Construction
                    </option>

                    <option value="Automotive">
                      Automotive
                    </option>

                  </select>

                </div>

              </div>



              {/* ============================= */}
              {/* BUTTONS */}
              {/* ============================= */}

              <div
                className="flex
                           items-center
                           justify-end
                           gap-4
                           pt-6
                           border-t
                           border-slate-200"
              >

                {/* CANCEL */}

                <button
                  type="button"

                  onClick={() =>
                    router.push("/")
                  }

                  className="px-6
                             py-3
                             rounded-xl
                             border
                             border-slate-300
                             text-slate-800
                             font-semibold
                             hover:bg-slate-50
                             transition"
                >
                  Cancel
                </button>



                {/* PUBLISH */}

                <button
                  type="button"

                  onClick={handlePublishProduct}

                  disabled={isPublishing}

                  className="px-7
                             py-3
                             rounded-xl
                             bg-blue-600
                             text-white
                             font-semibold
                             hover:bg-blue-700
                             disabled:bg-blue-400
                             disabled:cursor-not-allowed
                             shadow-lg
                             shadow-blue-500/20
                             transition"
                >

                  {isPublishing
                    ? "Publishing..."
                    : "Publish Product"}

                </button>

              </div>

            </div>

          </div>



          {/* ================================= */}
          {/* RIGHT SIDE - IMAGE */}
          {/* ================================= */}

          <div>

            <div
              className="bg-white
                         rounded-2xl
                         border border-slate-200
                         shadow-sm
                         p-6
                         sticky
                         top-6"
            >


              <h2 className="text-lg font-bold text-slate-900">
                Product Image
              </h2>


              <p className="text-sm text-slate-600 mt-1 mb-5">
                Add a clear image of your product.
              </p>



              {/* IMAGE UPLOAD */}

              <label
                htmlFor="product-image"
                className="block cursor-pointer"
              >

                <div
                  className="border-2
                             border-dashed
                             border-slate-300
                             rounded-2xl
                             overflow-hidden
                             hover:border-blue-500
                             transition"
                >

                  {imagePreview ? (

                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="w-full h-64 object-cover"
                    />

                  ) : (

                    <div
                      className="h-64
                                 flex
                                 flex-col
                                 items-center
                                 justify-center
                                 px-6
                                 text-center"
                    >

                      <div
                        className="w-16
                                   h-16
                                   rounded-2xl
                                   bg-blue-50
                                   flex
                                   items-center
                                   justify-center
                                   mb-4"
                      >

                        <svg
                          className="w-8 h-8 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="M12 16V4m0 0L8 8m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                          />

                        </svg>

                      </div>


                      <p className="font-semibold text-slate-900">
                        Upload product image
                      </p>


                      <p className="text-sm text-slate-600 mt-2">
                        PNG, JPG or WEBP
                      </p>


                      <p className="text-xs text-slate-500 mt-1">
                        Maximum recommended size: 5MB
                      </p>

                    </div>

                  )}

                </div>

              </label>



              <input
                id="product-image"

                type="file"

                accept="image/png,image/jpeg,image/webp"

                onChange={handleImageChange}

                className="hidden"
              />



              {/* ============================= */}
              {/* AI ASSISTANT */}
              {/* ============================= */}

              <div
                className="mt-6
                           p-5
                           rounded-2xl
                           bg-gradient-to-br
                           from-blue-50
                           to-cyan-50
                           border
                           border-blue-100"
              >

                <div className="flex items-start gap-3">


                  <div
                    className="w-10
                               h-10
                               rounded-xl
                               bg-blue-600
                               text-white
                               flex
                               items-center
                               justify-center
                               font-bold"
                  >
                    AI
                  </div>


                  <div>

                    <h3 className="font-bold text-slate-900">
                      AI Listing Assistant
                    </h3>


                    <p
                      className="text-sm
                                 text-slate-700
                                 mt-1
                                 leading-relaxed"
                    >
                      Generate a professional product description,
                      category suggestion, and listing content automatically.
                    </p>


                    <button
                      type="button"
                      className="mt-3
                                 text-sm
                                 font-semibold
                                 text-blue-600
                                 hover:text-blue-700"
                    >
                      Try AI Assistant →
                    </button>

                  </div>

                </div>

              </div>



              {/* ============================= */}
              {/* LISTING TIPS */}
              {/* ============================= */}

              <div className="mt-6">

                <h3
                  className="text-sm
                             font-bold
                             text-slate-900
                             mb-3"
                >
                  Listing Tips
                </h3>


                <ul
                  className="space-y-2
                             text-sm
                             text-slate-600"
                >

                  <li>
                    ✓ Use a clear product name
                  </li>

                  <li>
                    ✓ Mention important specifications
                  </li>

                  <li>
                    ✓ Add accurate pricing
                  </li>

                  <li>
                    ✓ Upload a high-quality image
                  </li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}