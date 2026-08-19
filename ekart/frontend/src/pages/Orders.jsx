import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getOrderDetailsByUserId } from "../services/api";
import "./Orders.css";
import BASE_URL from "../api/config";

function Orders() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const handleCancelOrder = async (orderId) => {

    const confirmCancel =
      window.confirm(
        "Are you sure you want to cancel this order?"
      );

    if (!confirmCancel) return;

    try {

      const token =
        localStorage.getItem("token");

      const res = await fetch(
        `${BASE_URL}/orders/cancel/${orderId}`,
        {
          method: "PUT",
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      if (res.ok) {

        alert(
          "Order cancelled successfully"
        );

        const user = JSON.parse(
          localStorage.getItem("user")
        );

        const data =
          await getOrderDetailsByUserId(
            user.id
          );

        setOrders(data);

      } else {

        const error =
          await res.text();

        alert(
          error ||
          "Order could not be cancelled"
        );
      }

    } catch (error) {

      console.error(error);

      alert("Server error");
    }
  };


  const handleReturnOrder = async (orderId) => {

    const confirmReturn =
      window.confirm(
        "Are you sure you want to return this order?"
      );

    if (!confirmReturn) return;

    try {

      const token =
        localStorage.getItem("token");

      const res = await fetch(
        `${BASE_URL}/orders/return/${orderId}`,
        {
          method: "PUT",
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      if (res.ok) {

        alert(
          "Return request submitted successfully"
        );

        const user = JSON.parse(
          localStorage.getItem("user")
        );

        const data =
          await getOrderDetailsByUserId(
            user.id
          );

        setOrders(data);

      } else {

        const error =
          await res.text();

        alert(
          error ||
          "Order could not be returned"
        );
      }

    } catch (error) {

      console.error(error);

      alert("Server error");
    }
  };


  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const user = JSON.parse(
          localStorage.getItem("user")
        );

        const data =
          await getOrderDetailsByUserId(
            user.id
          );

        setOrders(data);

      } catch (error) {

        console.error(error);

        alert("Failed to load orders");
      }
    };

    fetchOrders();

  }, []);


  return (

    <div>

      <Navbar />

      <div className="orders-container">

        <h2>My Orders</h2>

        {orders.length === 0 ? (

          <div className="no-orders">
            <p>No orders found.</p>
          </div>

        ) : (

          orders.map((order) => (

            <div
              key={order.orderId}
              className="order-card"
            >

              <div className="order-header">

                <div>

                  <h3
                    className="order-link"
                    onClick={() =>
                      navigate(
                        `/order/${order.orderId}`
                      )
                    }
                  >
                    Order #{order.orderId}
                  </h3>

                  <p className="order-date">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

                <span
                  className={`order-status ${order.status}`}
                >
                  {order.status}
                </span>

              </div>

              <hr />

              <div className="shipping-section">

                <h4>Shipping Address</h4>

                <p>
                  <strong>
                    {order.fullName}
                  </strong>
                </p>

                <p>
                  {order.phone}
                </p>

                <p>
                  {order.address}
                </p>

                <p>
                  {order.city} - {order.pincode}
                </p>

              </div>

              <hr />

              <div className="products-section">

                <h4>Products</h4>

                {
                  order.items.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="product-row"
                      >

                        <div>

                          <strong>
                            {item.productName}
                          </strong>

                          <p>
                            Qty : {item.quantity}
                          </p>

                        </div>

                        <div>
                          ₹{item.price}
                        </div>

                      </div>

                    )
                  )
                }

              </div>

              <hr />

              <div className="order-footer">

                <h3>
                  Total :
                  ₹{order.totalAmount}
                </h3>

                {
                  (
                    order.status === "PLACED" ||
                    order.status === "SHIPPED"
                  ) && (

                    <button
                      className="cancel-btn"
                      onClick={() =>
                        handleCancelOrder(
                          order.orderId
                        )
                      }
                    >
                      Cancel Order
                    </button>

                  )
                }

                {
                  order.status === "DELIVERED" && (

                    <button
                      className="return-btn"
                      onClick={() =>
                        handleReturnOrder(
                          order.orderId
                        )
                      }
                    >
                      Return Order
                    </button>

                  )
                }

              </div>

            </div>

          ))
        )}

        <div className="back-btn-container">

          <button
            className="logout-button"
            onClick={() =>
              navigate("/profile")
            }
          >
            Back
          </button>

        </div>

      </div>

    </div>
  );
}

export default Orders;