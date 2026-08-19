import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Profile.css";

function Profile() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const handleOrders = () => {

    navigate("/orders");
  };

  const handleAddresses = () => {

    navigate("/my-addresses");
  };

  return (

    <div>

      <Navbar />

      <div className="profile-container">

        <h2>My Account</h2>

        <div className="profile-card">

          <p>
            <strong>Name:</strong> {user?.name}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          <button
            className="logout-button"
            onClick={handleOrders}
          >
            My Orders
          </button>

          <button
            className="logout-button"
            onClick={handleAddresses}
          >
            My Addresses
          </button>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;