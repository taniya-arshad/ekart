import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import MyAddresses from "./pages/MyAddresses";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import AdminOrders from "./pages/AdminOrders";
import "./App.css";

function App() {

return (

<Routes>

  <Route
    path="/login"
    element={<Login />}
  />

  <Route
    path="/register"
    element={<Register />}
  />

  <Route
    path="/home"
    element={<Home />}
  />

  <Route
    path="/product/:id"
    element={<ProductDetails />}
  />

  <Route
    path="/cart"
    element={<Cart />}
  />

  <Route
    path="/address"
    element={<Address />}
  />

  <Route
    path="/profile"
    element={<Profile />}
  />

  <Route
    path="/orders"
    element={<Orders />}
  />

  <Route
    path="/order/:id"
    element={<OrderDetails />}
  />

  <Route
    path="/my-addresses"
    element={<MyAddresses />}
  />
  <Route
    path="/admin/dashboard"
    element={<AdminDashboard />}
  />



  <Route
    path="/admin/products"
    element={<AdminProducts />}
  />

  <Route
    path="/admin/add-product"
    element={<AddProduct />}
  />

  <Route
    path="/admin/edit-product/:id"
    element={<AddProduct />}
  />

  <Route
    path="/admin/orders"
    element={<AdminOrders />}
  />

</Routes>

);
}

export default App;