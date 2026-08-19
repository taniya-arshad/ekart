import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./ProductDetails.css";
function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");

  const showMessage = (text) => {

    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
    const handleBuyNow = () => {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {

        setMessage("❌ Please login first");

        setTimeout(() => {
          setMessage("");
        }, 3000);

        return;
      }

      navigate("/address", {
        state: {
          buyNowItem: {
            productId: product.id,
            quantity: qty,
            price: product.price,
            name: product.name
          }
        }
      });
    };
  const handleAddToCart = async () => {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    if (!user) {

      showMessage(
        "❌ Please login first"
      );

      return;
    }

    try {

      const res = await fetch(
        "http://localhost:8081/api/cart/add",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            userId: user.id,
            productId: product.id,
            quantity: qty
          })
        }
      );

      const msg =
        await res.text();

      showMessage(`✅ ${msg}`);

    } catch (err) {

      console.error(err);

      showMessage(
        "❌ Error adding to cart"
      );
    }
  };

  useEffect(() => {

    fetch(
      "http://localhost:8081/api/products"
    )
      .then((res) => res.json())
      .then((data) => {

        const found = data.find(
          (p) =>
            p.id === parseInt(id)
        );

        setProduct(found);
      });

  }, [id]);

  if (!product) {

    return <p>Loading...</p>;
  }

  return (

    <div>

      <Navbar />

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      <div className="product-page">

        <div className="left-section">

          <img
            src={product.image}
            alt={product.name}
          />

        </div>

        <div className="middle-section">

          <h2>{product.name}</h2>

          <p className="price">
            ₹{product.price}
          </p>

          <p className="desc">
            {product.description}
          </p>

          {product.quantity === 0 ? (

            <p className="out-of-stock">
              Currently Unavailable...
            </p>

          ) : product.quantity <= 5 ? (

            <p className="stock-warning">
              Only {product.quantity} left!
            </p>

          ) : null}

        </div>

        <div className="right-section">

          <h3>
            ₹{product.price * qty}
          </h3>

          <p className="stock">

            {product.quantity > 0
              ? "In Stock"
              : "Out of Stock"}

          </p>

          <div className="qty-box">

            <button
              onClick={() =>
                setQty(
                  qty > 1
                    ? qty - 1
                    : 1
                )
              }
            >
              -
            </button>

            <span>{qty}</span>

            <button
              onClick={() =>
                setQty(
                  qty < product.quantity
                    ? qty + 1
                    : qty
                )
              }
            >
              +
            </button>

          </div>

          {product.quantity === 0 ? (

            <button
              className="btn-primary disabled-btn"
              disabled
            >
              Out of Stock
            </button>

          ) : (

            <>
              <button
                className="btn-primary"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <button
                className="btn-buy"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </>

          )}

        </div>

      </div>

      <div className="reviews-section">

        <h3>Customer Reviews</h3>

        <div className="review">

          <p>⭐⭐⭐⭐⭐</p>

          <p>
            Excellent product,
            highly recommended!
          </p>

        </div>

        <div className="review">

          <p>⭐⭐⭐⭐</p>

          <p>
            Good quality but
            packaging could be better.
          </p>

        </div>

        <div className="review">

          <p>⭐⭐⭐</p>

          <p>
            Average experience.
          </p>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;