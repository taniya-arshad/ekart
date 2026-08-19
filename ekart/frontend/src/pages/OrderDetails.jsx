import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import BASE_URL from "../api/config";
import "./Orders.css";

function OrderDetails() {

const { id } = useParams();
const navigate = useNavigate();

const [order, setOrder] =
  useState(null);

useEffect(() => {

const fetchOrder = async () => {

  try {

    const res = await fetch(
      `${BASE_URL}/orders/details/${id}`
    );

    if (!res.ok) {

      console.error(
        "Failed to fetch order details"
      );

      return;
    }

    const data = await res.json();

    setOrder(data);

  } catch (error) {

    console.error(error);
  }

};

if (id) {
  fetchOrder();
}

}, [id]);

if (!order) {

return (

<div>

  <Navbar />

  <div className="orders-container">

    <p>
      Loading order details...
    </p>

  </div>

</div>

);
}

return (

<div>

  <Navbar />

  <div className="orders-container">

    <h2>
      Order Details
    </h2>

    <div className="order-card">

      <div className="order-header">

        <div>

          <h3>
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

        <h4>
          Shipping Address
        </h4>

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

        <h4>
          Products
        </h4>

        {order.items &&
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
          )}

      </div>

      <hr />

      <div className="order-footer">

        <h3>
          Total :
          ₹{order.totalAmount}
        </h3>

      </div>

    </div>

    <div className="back-btn-container">

      <button
        className="logout-button"
        onClick={() =>
          navigate("/orders")
        }
      >
        Back to Orders
      </button>

    </div>

  </div>

</div>

);
}

export default OrderDetails;