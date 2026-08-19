import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {

  const navigate = useNavigate();
    const [cart, setCart] = useState([]);
   const fetchCart = async () => {
       const storedUser = localStorage.getItem("user");

       if (!storedUser || storedUser === "undefined") return;

       const user = JSON.parse(storedUser);

       try {
         const res = await fetch(`http://localhost:8081/api/cart/user/${user.id}`);
         const data = await res.json();

         console.log("Cart at checkout:", data);
         setCart(data);
       } catch (err) {
         console.error(err);
       }
     };

     // ✅ useEffect only calls it
     useEffect(() => {
       fetchCart();
     }, []);


  // ✅ Update quantity (remove + add)
  const updateQty = async (item, newQty) => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      // remove old
      await fetch(
        `http://localhost:8081/api/cart/remove?userId=${user.id}&productId=${item.productId}`,
        { method: "DELETE" }
      );

      // add updated
      await fetch("http://localhost:8081/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.id,
          productId: item.productId,
          quantity: newQty
        })
      });

      fetchCart(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Remove item
  const removeItem = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await fetch(
        `http://localhost:8081/api/cart/remove?userId=${user.id}&productId=${productId}`,
        { method: "DELETE" }
      );

      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Navbar />

      <div className="cart-container">
        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.productId}>
                {/* ✅ Product Image */}
                <img src={item.image} alt={item.name} />

                <div className="cart-details">
                  {/* ✅ Product Info */}
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>

                  {/* ✅ Quantity Controls */}
                  <div className="qty-box">
                    <button
                      onClick={() =>
                        updateQty(
                          item,
                          item.quantity > 1 ? item.quantity - 1 : 1
                        )
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQty(item, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* ✅ Remove */}
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* ✅ Summary */}
            <div className="cart-summary">
              <h3>Total: ₹{totalPrice}</h3>

              <button
                className="checkout-btn"
                onClick={() => {
                  const token = localStorage.getItem("token");

                  if (!token || token === "undefined") {
                    alert("Please login first");
                    navigate("/login");
                  } else {
                    navigate("/address");
                  }
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;