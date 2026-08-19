import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import BASE_URL from "../api/config";
import "./AddProduct.css";

function AddProduct() {

const { id } = useParams();
const navigate = useNavigate();

const [product, setProduct] =
useState({
name: "",
description: "",
price: "",
category: "",
brand: "",
rating: "",
quantity: "",
image: ""
});

const [message, setMessage] =
useState("");

useEffect(() => {

if (!id) {
  return;
}

const fetchProduct = async () => {

try {

  const res = await fetch(
    `${BASE_URL}/products/${id}`
  );

  if (!res.ok) {

    console.error(
      "Failed to fetch product"
    );

    return;
  }

  const data = await res.json();

  setProduct(data);

} catch (err) {

  console.error(err);
}

};

fetchProduct();

}, [id]);

useEffect(() => {

if (!message) {
  return;
}

const messageElement =
document.getElementById(
  "product-message"
);

if (messageElement) {

  messageElement.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

}

const timer = setTimeout(() => {

navigate("/admin/products");

}, 5000);

return () => {
  clearTimeout(timer);
};

}, [message, navigate]);

const handleChange = (e) => {

setProduct({
  ...product,
  [e.target.name]: e.target.value
});

};

const handleSubmit = async (e) => {

e.preventDefault();

try {

  const url = id
    ? `${BASE_URL}/products/${id}`
    : `${BASE_URL}/products`;

  const method = id
    ? "PUT"
    : "POST";

  const res = await fetch(
    url,
    {
      method: method,
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(
        product
      )
    }
  );

  if (res.ok) {

    if (id) {

      setMessage(
        "Product Updated Successfully"
      );

    } else {

      alert(
        "Product Added Successfully"
      );

      setProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        rating: "",
        quantity: "",
        image: ""
      });

    }

  } else {

    if (id) {

      setMessage(
        "Failed to Update Product"
      );

    } else {

      alert(
        "Failed to Add Product"
      );
    }
  }

} catch (err) {

  console.error(err);

  if (id) {

    setMessage(
      "Failed to Update Product"
    );
  }
}

};

return (

<div>

  <Navbar />

  {message && (

    <div
      id="product-message"
      className={
        message.includes(
          "Successfully"
        )
          ? "product-success-message"
          : "product-error-message"
      }
    >
      {message}
    </div>

  )}

  <div className="add-product-container">

    <h2>
      {id
        ? "Edit Product"
        : "Add Product"}
    </h2>

    <form
      onSubmit={handleSubmit}
      className="product-form"
    >

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={
          product.description
        }
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={
          product.category
        }
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="brand"
        placeholder="Brand"
        value={product.brand}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        step="0.1"
        name="rating"
        placeholder="Rating"
        value={product.rating}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="quantity"
        placeholder="Stock Quantity"
        value={
          product.quantity
        }
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={product.image}
        onChange={handleChange}
      />

      <button type="submit">
        {id
          ? "Update Product"
          : "Add Product"}
      </button>

    </form>

  </div>

</div>

);
}

export default AddProduct;