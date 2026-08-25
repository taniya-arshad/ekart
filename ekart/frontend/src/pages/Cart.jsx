import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {

  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {

    const storedUser =
      localStorage.getItem("user");

    const token =
      localStorage.getItem("token");

    if (
      !storedUser ||
      storedUser === "undefined" ||
      !token ||
      token === "undefined"
    ) {
      return;
    }

    const user =
      JSON.parse(storedUser);

    try {

      const res = await fetch(
        `http://localhost:8081/api/cart/user/${user.id}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to fetch cart"
        );
      }

      const data =
        await res.json();

      setCart(data);

    } catch (err) {

      console.error(err);
    }
  };

  useEffect(() => {

    fetchCart();

  }, []);

  const updateQty = async (
    item,
    newQty
  ) => {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    const token =
      localStorage.getItem("token");

    try {

      await fetch(
        `http://localhost:8081/api/cart/remove?userId=${user.id}&productId=${item.productId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      await fetch(
        "http://localhost:8081/api/cart/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: user.id,
            productId: item.productId,
            quantity: newQty
          })
        }
      );

      fetchCart();

    } catch (err) {

      console.error(err);
    }
  };

  const removeItem = async (
    productId
  ) => {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    const token =
      localStorage.getItem("token");

    try {

      await fetch(
        `http://localhost:8081/api/cart/remove?userId=${user.id}&productId=${productId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      fetchCart();

    } catch (err) {

      console.error(err);
    }
  };

  const totalPrice =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
        item.quantity,
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

              <div
                className="cart-item"
                key={item.productId}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-details">

                  <h4>
                    {item.name}
                  </h4>

                  <p>
                    ₹{item.price}
                  </p>

                  <div className="qty-box">

                    <button
                      onClick={() =>
                        updateQty(
                          item,
                          item.quantity > 1
                            ? item.quantity - 1
                            : 1
                        )
                      }
                    >
                      -
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQty(
                          item,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(
                        item.productId
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

            <div className="cart-summary">

              <h3>
                Total: ₹{totalPrice}
              </h3>

              <button
                className="checkout-btn"
                onClick={() => {

                  const token =
                    localStorage.getItem(
                      "token"
                    );

                  if (
                    !token ||
                    token === "undefined"
                  ) {

                    alert(
                      "Please login first"
                    );

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