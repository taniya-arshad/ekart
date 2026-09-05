import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./AdminOrders.css";

function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [ordersPerPage, setOrdersPerPage] = useState(10);

  const placedCount = orders.filter(
    order => order.status === "PLACED"
  ).length;

  const shippedCount = orders.filter(
    order => order.status === "SHIPPED"
  ).length;

  const deliveredCount = orders.filter(
    order => order.status === "DELIVERED"
  ).length;

  const cancelledCount = orders.filter(
    order => order.status === "CANCELLED"
  ).length;

  const returnRequestedCount = orders.filter(
    order => order.status === "RETURN_REQUESTED"
  ).length;

  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:8081/api/orders/admin",
        {
          headers: {
            "Authorization":
              `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setOrders(data);

    } catch (err) {

      console.error(err);

    }

  };

  const toggleOrder = (orderId) => {

    if (expandedOrders.includes(orderId)) {

      setExpandedOrders(
        expandedOrders.filter(
          id => id !== orderId
        )
      );

    } else {

      setExpandedOrders([
        ...expandedOrders,
        orderId
      ]);

    }

  };

  useEffect(() => {

    fetchOrders();

  }, []);

  const filteredOrders = orders.filter((order) => {

    const matchesStatus =
      statusFilter === "ALL"
        ? true
        : order.status === statusFilter;

    const matchesSearch =

      order.orderId
        .toString()
        .includes(searchTerm.toLowerCase())

      ||

      order.items?.some((item) =>
        item.productName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );

    return matchesStatus && matchesSearch;

  });

  const indexOfLastOrder =
    currentPage * ordersPerPage;

  const indexOfFirstOrder =
    indexOfLastOrder - ordersPerPage;

  const currentOrders =
    filteredOrders.slice(
      indexOfFirstOrder,
      indexOfLastOrder
    );

  const totalPages =
    Math.ceil(
      filteredOrders.length /
      ordersPerPage
    );

  return (

    <div>

      <Navbar />

      <div className="admin-orders-container">

        <h2>Manage Orders</h2>

        <div className="summary-cards">

          {/* TOTAL */}

          <div
            className={`summary-card total-card ${
              statusFilter === "ALL"
                ? "active-card"
                : ""
            }`}
            onClick={() => {
              setStatusFilter("ALL");
              setCurrentPage(1);
            }}
          >

            <div className="summary-title">
              Total Orders
            </div>

            <div className="summary-value">
              {orders.length}
            </div>

          </div>

          {/* PLACED */}

          <div
            className={`summary-card placed-card ${
              statusFilter === "PLACED"
                ? "active-card"
                : ""
            }`}
            onClick={() => {
              setStatusFilter("PLACED");
              setCurrentPage(1);
            }}
          >

            <div className="summary-title">
              Placed
            </div>

            <div className="summary-value">
              {placedCount}
            </div>

          </div>

          {/* SHIPPED */}

          <div
            className={`summary-card shipped-card ${
              statusFilter === "SHIPPED"
                ? "active-card"
                : ""
            }`}
            onClick={() => {
              setStatusFilter("SHIPPED");
              setCurrentPage(1);
            }}
          >

            <div className="summary-title">
              Shipped
            </div>

            <div className="summary-value">
              {shippedCount}
            </div>

          </div>

          {/* DELIVERED */}

          <div
            className={`summary-card delivered-card ${
              statusFilter === "DELIVERED"
                ? "active-card"
                : ""
            }`}
            onClick={() => {
              setStatusFilter("DELIVERED");
              setCurrentPage(1);
            }}
          >

            <div className="summary-title">
              Delivered
            </div>

            <div className="summary-value">
              {deliveredCount}
            </div>

          </div>

          {/* CANCELLED */}

          <div
            className={`summary-card cancelled-card ${
              statusFilter === "CANCELLED"
                ? "active-card"
                : ""
            }`}
            onClick={() => {
              setStatusFilter("CANCELLED");
              setCurrentPage(1);
            }}
          >

            <div className="summary-title">
              Cancelled
            </div>

            <div className="summary-value">
              {cancelledCount}
            </div>

          </div>

          {/* RETURN REQUESTED */}

          <div
            className={`summary-card return-card ${
              statusFilter === "RETURN_REQUESTED"
                ? "active-card"
                : ""
            }`}
            onClick={() => {
              setStatusFilter(
                "RETURN_REQUESTED"
              );
              setCurrentPage(1);
            }}
          >

            <div className="summary-title">
              Return Requested
            </div>

            <div className="summary-value">
              {returnRequestedCount}
            </div>

          </div>

        </div>

        <div className="tool-bar">

          <input
            type="text"
            className="search-input"
            placeholder="Search by Order ID or Product..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          <select
            className="status-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >

            <option value="ALL">
              All Orders
            </option>

            <option value="PLACED">
              Placed
            </option>

            <option value="SHIPPED">
              Shipped
            </option>

            <option value="DELIVERED">
              Delivered
            </option>

            <option value="CANCELLED">
              Cancelled
            </option>

            <option value="RETURN_REQUESTED">
              Return Requested
            </option>

          </select>

          <div className="page-size-container">

            <label>Show</label>

            <select
              className="page-size-select"
              value={ordersPerPage}
              onChange={(e) => {
                setOrdersPerPage(
                  Number(e.target.value)
                );
                setCurrentPage(1);
              }}
            >

              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>

            </select>

          </div>

        </div>

        {currentOrders.map((order) => (

          <div
            key={order.orderId}
            className="order-card"
          >

            <div className="order-header">

              <div>

                <div className="order-id">
                  Order #{order.orderId}
                </div>

                <div className="order-date">
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </div>

              </div>

              <span
                className={`status-badge ${order.status}`}
              >
                {order.status}
              </span>

            </div>

            <div className="order-divider"></div>

            <div className="products-section">

              <div className="products-header">

                <h4 className="section-title">
                  Products
                </h4>

                <button
                  className="toggle-btn"
                  onClick={() =>
                    toggleOrder(
                      order.orderId
                    )
                  }
                >
                  {
                    expandedOrders.includes(
                      order.orderId
                    )
                      ? "Hide Details ▲"
                      : "View Details ▼"
                  }
                </button>

              </div>

              {expandedOrders.includes(
                order.orderId
              ) && (

                <>

                  <div className="customer-details">

                    <h4 className="section-title">
                      Customer Details
                    </h4>

                    <div className="customer-row">
                      <strong>Name:</strong>{" "}
                      {order.customerName}
                    </div>

                    <div className="customer-row">
                      <strong>Email:</strong>{" "}
                      {order.customerEmail}
                    </div>

                    <div className="customer-row">
                      <strong>Phone:</strong>{" "}
                      {order.phone}
                    </div>

                    <div className="customer-row">
                      <strong>
                        Shipping Address:
                      </strong>{" "}
                      {order.address}
                    </div>

                  </div>

                  <div className="order-divider"></div>

                  {order.items?.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="item-row"
                      >

                        <div className="item-details">

                          <div className="item-name">
                            {item.productName}
                          </div>

                          <div className="item-qty">
                            Qty :{" "}
                            {item.quantity}
                          </div>

                        </div>

                        <div className="item-price">
                          ₹{item.price}
                        </div>

                      </div>

                    )
                  )}

                </>

              )}

            </div>

            <div className="order-divider"></div>

            <div className="order-summary">

              <span>
                Items
              </span>

              <strong>
                {order.items?.length}
              </strong>

            </div>

            <div className="order-summary total-row">

              <span>
                Order Total
              </span>

              <strong className="order-total">
                ₹{order.totalAmount}
              </strong>

            </div>

            <div className="order-divider"></div>

            <div className="order-actions">

              {order.status === "PLACED" && (

                <button
                  className="status-btn"
                  onClick={async () => {
                    const token =
                        localStorage.getItem("token");

                      await fetch(
                        `http://localhost:8081/api/orders/admin/status/${order.orderId}`,
                        {
                          method: "PUT",
                          headers: {
                            "Authorization": `Bearer ${token}`
                          }
                        }
                      );
                    fetchOrders();

                  }}
                >
                  Mark as Shipped
                </button>

              )}

              {order.status === "SHIPPED" && (

                <button
                  className="status-btn"
                  onClick={async () => {

                    const token =
                        localStorage.getItem("token");

                      await fetch(
                        `http://localhost:8081/api/orders/admin/status/${order.orderId}`,
                        {
                          method: "PUT",
                          headers: {
                            "Authorization": `Bearer ${token}`
                          }
                        }
                      );

                    fetchOrders();

                  }}
                >
                  Mark as Delivered
                </button>

              )}
               {order.status === "RETURN_REQUESTED" && (

                 <button
                   className="status-btn"
                   onClick={async () => {

                     try {

                       const token =
                         localStorage.getItem("token");

                       const res = await fetch(
                         `http://localhost:8081/api/orders/admin/return/${order.orderId}`,
                         {
                           method: "PUT",
                           headers: {
                             "Authorization": `Bearer ${token}`
                           }
                         }
                       );

                       console.log(
                         "Return response:",
                         res.status
                       );

                       const responseText =
                         await res.text();

                       console.log(
                         "Return response body:",
                         responseText
                       );

                       if (res.ok) {

                         fetchOrders();

                       } else {

                         console.error(
                           "Return failed:",
                           responseText
                         );

                       }

                     } catch (error) {

                       console.error(
                         "Return request error:",
                         error
                       );

                     }

                   }}
                 >
                   Mark as Returned
                 </button>

               )}

              {order.status === "DELIVERED" && (

                <span className="delivered-text">
                  ✓ Delivered
                </span>

              )}

              {order.status === "CANCELLED" && (

                <span className="delivered-text">
                  Order Cancelled
                </span>

              )}



            </div>

          </div>

        ))}

        <div className="pagination">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => (

              <button
                key={index}
                className={
                  currentPage === index + 1
                    ? "active-page"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(
                    index + 1
                  )
                }
              >
                {index + 1}
              </button>

            )
          )}

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
          >
            Next
          </button>

        </div>

      </div>

    </div>

  );

}

export default AdminOrders;