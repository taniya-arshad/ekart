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
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewSummary, setReviewSummary] = useState({
    averageRating: 0,
    reviewCount: 0
  });

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

  const handleSubmitReview = async (e) => {

    e.preventDefault();

    const user = JSON.parse(
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
        "http://localhost:8081/api/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: user.id,
            productId: product.id,
            rating: rating,
            comment: comment
          })
        }
      );

      const msg = await res.text();

      if (res.ok) {

        showMessage(
          `✅ ${msg}`
        );

        setRating(5);
        setComment("");

        fetch(
          `http://localhost:8081/api/reviews/product/${id}`
        )
          .then((res) => res.json())
          .then((data) => {
            setReviews(data);
          });
       fetch(
          `http://localhost:8081/api/reviews/product/${id}/summary`
        )
          .then((res) => res.json())
          .then((data) => {
            setReviewSummary(data);
          });

      } else if (res.status === 400) {

         showMessage(
           "❌ You have already reviewed this product."
         );

       } else {

         showMessage(
           "❌ Failed to add review. Please try again."
         );
       }

    } catch (err) {

      console.error(err);

      showMessage(
        "❌ Error adding review"
      );
    }
  };

  const getRatingLabel = () => {

    if (rating === 1) {
      return "Poor";
    }

    if (rating === 2) {
      return "Below Average";
    }

    if (rating === 3) {
      return "Average";
    }

    if (rating === 4) {
      return "Very Good";
    }

    return "Excellent";
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

  useEffect(() => {

    fetch(
      `http://localhost:8081/api/reviews/product/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((err) => {
        console.error(err);
      });

  }, [id]);
  useEffect(() => {

  fetch(
    `http://localhost:8081/api/reviews/product/${id}/summary`
  )
    .then((res) => res.json())
    .then((data) => {
      setReviewSummary(data);
    })
    .catch((err) => {
      console.error(err);
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
        <div className="review-summary">

          <div className="summary-stars">

            {Array.from({ length: 5 }, (_, index) => {

              const starNumber = index + 1;
              const average = reviewSummary.averageRating;

              const fillPercentage = Math.min(
                100,
                Math.max(
                  0,
                  (average - (starNumber - 1)) * 100
                )
              );

              return (
                <span
                  key={index}
                  className="summary-star"
                  style={{
                    "--fill": `${fillPercentage}%`
                  }}
                >
                  <span className="star-background">★</span>
                  <span className="star-fill">★</span>
                </span>
              );

            })}

          </div>

          <p className="summary-text">
            {reviewSummary.averageRating.toFixed(1)} out of 5
          </p>

          <p className="summary-count">
            Based on {reviewSummary.reviewCount} review
            {reviewSummary.reviewCount !== 1 ? "s" : ""}
          </p>

        </div>

        <form
          className="review-form"
          onSubmit={handleSubmitReview}
        >

          <h4>Write a Review</h4>

          <label>
            How would you rate this product?
          </label>

          <div className="rating-stars">

            {[1, 2, 3, 4, 5].map((star) => (

              <button
                type="button"
                key={star}
                className={
                  star <= rating
                    ? "star selected"
                    : "star"
                }
                onClick={() =>
                  setRating(star)
                }
              >
                {star <= rating ? "★" : "☆"}
              </button>

            ))}

          </div>

          <p className="rating-label">
            {getRatingLabel()}
          </p>

          <label>
            Comment
          </label>

          <textarea
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            placeholder="Write your review..."
            required
          />

          <button
            type="submit"
            className="btn-primary"
          >
            Submit Review
          </button>

        </form>

        {reviews.length === 0 ? (

          <p>No reviews yet.</p>

        ) : (

          reviews.map((review) => (

            <div
              className="review"
              key={review.id}
            >

              <p className="review-user">
                {review.userName}
              </p>

              <p className="review-rating">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </p>

              <p className="review-date">
                {new Date(
                  review.createdAt
                ).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  }
                )}
              </p>

              <p className="review-comment">
                {review.comment}
              </p>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default ProductDetails;