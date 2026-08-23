import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Profile.css";

function Profile() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [name, setName] = useState(
    user?.name || ""
  );

  const [email, setEmail] = useState(
    user?.email || ""
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const showMessage = (text) => {

    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleEdit = () => {

    setName(user?.name || "");
    setEmail(user?.email || "");

    setEditing(true);
  };

  const handleCancel = () => {

    setName(user?.name || "");
    setEmail(user?.email || "");

    setEditing(false);
  };

  const handleSave = async () => {

    if (!name.trim() || !email.trim()) {

      showMessage(
        "❌ Name and email cannot be empty."
      );

      return;
    }

    try {

      const res = await fetch(
        `http://localhost:8081/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim()
          })
        }
      );

      const msg = await res.text();

      if (res.ok) {

        const updatedUser = {
          ...user,
          name: name.trim(),
          email: email.trim()
        };

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        showMessage(
          "✅ Profile updated successfully."
        );

        setEditing(false);

      } else if (res.status === 409) {

        showMessage(
          "❌ Email already exists."
        );

      } else {

        showMessage(
          "❌ Failed to update profile."
        );
      }

    } catch (err) {

      console.error(err);

      showMessage(
        "❌ Error updating profile."
      );
    }
  };

  const handleChangePassword = () => {

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setChangingPassword(true);
  };

  const handleCancelPassword = () => {

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setChangingPassword(false);
  };

  const handlePasswordSave = async () => {

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {

      showMessage(
        "❌ All password fields are required."
      );

      return;
    }

    if (newPassword !== confirmPassword) {

      showMessage(
        "❌ New password and confirm password do not match."
      );

      return;
    }

    if (newPassword.length < 6) {

      showMessage(
        "❌ New password must be at least 6 characters."
      );

      return;
    }

    try {

      const res = await fetch(
        `http://localhost:8081/api/users/${user.id}/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword
          })
        }
      );

      const msg = await res.text();

      if (res.ok) {

        showMessage(
          "✅ Password changed successfully."
        );

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setChangingPassword(false);

      } else if (res.status === 400) {

        showMessage(
          "❌ Current password is incorrect."
        );

      } else {

        showMessage(
          "❌ Failed to change password."
        );
      }

    } catch (err) {

      console.error(err);

      showMessage(
        "❌ Error changing password."
      );
    }
  };

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

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      <div className="profile-container">

        <h2>My Account</h2>

        <div className="profile-card">

          {editing ? (

            <>
              <p>
                <strong>Name:</strong>
              </p>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <p>
                <strong>Email:</strong>
              </p>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <button
                className="logout-button"
                onClick={handleSave}
              >
                Save Changes
              </button>

              <button
                className="logout-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>

          ) : changingPassword ? (

            <>
              <p>
                <strong>Current Password:</strong>
              </p>

              <input
                type="password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                placeholder="Enter current password"
              />

              <p>
                <strong>New Password:</strong>
              </p>

              <input
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Enter new password"
              />

              <p>
                <strong>Confirm New Password:</strong>
              </p>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
              />

              <button
                className="logout-button"
                onClick={handlePasswordSave}
              >
                Change Password
              </button>

              <button
                className="logout-button"
                onClick={handleCancelPassword}
              >
                Cancel
              </button>
            </>

          ) : (

            <>
              <p>
                <strong>Name:</strong>{" "}
                {user?.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {user?.email}
              </p>

              <button
                className="logout-button"
                onClick={handleEdit}
              >
                Edit Profile
              </button>

              <button
                className="logout-button"
                onClick={handleChangePassword}
              >
                Change Password
              </button>

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
            </>

          )}

        </div>

      </div>

    </div>
  );
}

export default Profile;
