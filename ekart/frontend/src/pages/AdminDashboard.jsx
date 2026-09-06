import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {

const user = JSON.parse(
  localStorage.getItem("user")
);

const navigate = useNavigate();

const [totalProducts, setTotalProducts] =
  useState(0);

const [totalOrders, setTotalOrders] =
  useState(0);

const [placedOrders, setPlacedOrders] =
  useState(0);

const [returnRequests, setReturnRequests] =
  useState(0);

useEffect(() => {

  const fetchProducts = async () => {

    try {

      const res = await fetch(
        "http://localhost:8081/api/products"
      );

      const data = await res.json();

      setTotalProducts(data.length);

    } catch (err) {

      console.log(err);
    }

  };

  fetchProducts();

}, []);

useEffect(() => {

  const fetchOrderCounts = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await fetch("http://localhost:8081/api/orders/admin/counts", {
                          headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                          }
                        });


      const data = await res.json();

      let total = 0;
      let placed = 0;
      let returns = 0;

      data.forEach((order) => {

        total += order.count;

        if (order.status === "PLACED") {

          placed = order.count;

        }

        if (
          order.status ===
          "RETURN_REQUESTED"
        ) {

          returns = order.count;

        }

      });

      setTotalOrders(total);
      setPlacedOrders(placed);
      setReturnRequests(returns);

    } catch (err) {

      console.error(err);
    }

  };

  fetchOrderCounts();

}, []);

if (user?.role !== "ADMIN") {

  return (
    <h2>
      Access Denied
    </h2>
  );

}

return (

<div>

  <Navbar />

  <div className="admin-container">

    <h2>
      Admin Dashboard
    </h2>

    <div className="admin-stats">

      <div className="admin-stat-card">

        <h3>
          Total Products
        </h3>

        <p>
          {totalProducts}
        </p>

      </div>

      <div className="admin-stat-card">

        <h3>
          Total Orders
        </h3>

        <p>
          {totalOrders}
        </p>

      </div>

      <div className="admin-stat-card">

        <h3>
          Placed Orders
        </h3>

        <p>
          {placedOrders}
        </p>

      </div>

      <div className="admin-stat-card">

        <h3>
          Return Requests
        </h3>

        <p>
          {returnRequests}
        </p>

      </div>

    </div>

    <div className="admin-actions">

      <button
        className="admin-btn"
        onClick={() =>
          navigate("/admin/products")
        }
      >
        Manage Products
      </button>

      <button
        className="admin-btn"
        onClick={() =>
          navigate("/admin/add-product")
        }
      >
        Add Product
      </button>

      <button
        className="admin-btn"
        onClick={() =>
          navigate("/admin/orders")
        }
      >
        Manage Orders
      </button>

    </div>

  </div>

</div>

);
}

export default AdminDashboard;