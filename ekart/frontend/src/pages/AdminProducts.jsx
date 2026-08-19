import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./AdminProducts.css";

function AdminProducts() {

const navigate = useNavigate();

const [products, setProducts] = useState([]);
const [showConfirm, setShowConfirm] =
useState(false);
const [selectedProduct, setSelectedProduct] =
useState(null);

const fetchProducts = async () => {


try {

  const res = await fetch(
    "http://localhost:8081/api/products"
  );

  const data = await res.json();

  setProducts(data);

} catch (err) {

  console.error(err);
}


};

useEffect(() => {


fetchProducts();


}, []);

const handleDeactivate = async () => {


try {

  await fetch(
    `http://localhost:8081/api/products/deactivate/${selectedProduct.id}`,
    {
      method: "PUT"
    }
  );

  setShowConfirm(false);
  setSelectedProduct(null);

  fetchProducts();

} catch (err) {

  console.error(err);
}


};

return (


<div>

  <Navbar />

  <div className="admin-products-container">

    <h2>
      Manage Products
    </h2>

    <table className="products-table">

      <thead>

        <tr>

          <th>ID</th>

          <th>Name</th>

          <th>Price</th>

          <th>Stock</th>

          <th>Action</th>

        </tr>

      </thead>

      <tbody>

        {products.map((product) => (

          <tr key={product.id}>

            <td>
              {product.id}
            </td>

            <td>
              {product.name}
            </td>

            <td>
              ₹{product.price}
            </td>

            <td>

              {product.quantity === 0 ? (

                <span
                  style={{
                    color: "#d32f2f",
                    fontWeight: "600"
                  }}
                >
                  Out of Stock
                </span>

              ) : product.quantity <= 5 ? (

                <span
                  style={{
                    color: "#f57c00",
                    fontWeight: "600"
                  }}
                >
                  {product.quantity} Left
                </span>

              ) : (

                <span
                  style={{
                    color: "#2e7d32",
                    fontWeight: "600"
                  }}
                >
                  {product.quantity}
                </span>

              )}

            </td>

            <td>

              <button
                className="edit-btn"
                onClick={() =>
                  navigate(
                    `/admin/edit-product/${product.id}`
                  )
                }
              >
                Edit
              </button>

              <button
                className="deactivate-btn"

                onClick={() => {

                  setSelectedProduct(
                    product
                  );

                  setShowConfirm(
                    true
                  );
                }}
              >
                Deactivate
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

  {showConfirm && (

    <div className="confirm-overlay">

      <div className="confirm-modal">

        <h3>
          Deactivate Product
        </h3>

        <p>

          Are you sure you want
          to deactivate

          <strong>
            {" "}
            {selectedProduct?.name}
          </strong>

          ?

        </p>

        <div className="confirm-actions">

          <button
            className="cancel-btn"
            onClick={() => {

              setShowConfirm(
                false
              );

              setSelectedProduct(
                null
              );
            }}
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            onClick={
              handleDeactivate
            }
          >
            Yes, Deactivate
          </button>

        </div>

      </div>

    </div>

  )}

</div>


);
}

export default AdminProducts;