import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAddressesByUserId } from "../api/addressApi";
import BASE_URL from "../api/config";

function MyAddresses() {

        const [addresses, setAddresses] = useState([]);
        const [editingId, setEditingId] = useState(null);
        const [originalAddress, setOriginalAddress] = useState(null);

        const [editForm, setEditForm] = useState({
          fullName: "",
          phone: "",
          addressLine: "",
          city: "",
          pincode: ""
        });

        const [showNewAddressForm, setShowNewAddressForm] =
          useState(false);

        const [newAddressForm, setNewAddressForm] = useState({
          fullName: "",
          phone: "",
          addressLine: "",
          city: "",
          pincode: ""
        });

        const [message, setMessage] = useState("");
  const fetchAddresses = async () => {

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) return;

    const user = JSON.parse(storedUser);

    try {

      const res =
        await getAddressesByUserId(user.id);

      const data = await res.json();

      setAddresses(data);

    } catch (err) {

      console.error(err);
    }
  };

  useEffect(() => {

    fetchAddresses();

  }, []);

  const handleEdit = (address) => {

    setEditingId(address.id);
    setOriginalAddress(address);
    setEditForm({
      fullName: address.fullName,
      phone: address.phone,
      addressLine: address.addressLine,
      city: address.city,
      pincode: address.pincode
    });
  };

  const handleChange = (e) => {

    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };
   const handleNewAddressChange = (e) => {

     setNewAddressForm({
       ...newAddressForm,
       [e.target.name]: e.target.value
     });

   };
  const handleSave = async () => {
    if (
      originalAddress &&
      editForm.fullName === originalAddress.fullName &&
      editForm.phone === originalAddress.phone &&
      editForm.addressLine === originalAddress.addressLine &&
      editForm.city === originalAddress.city &&
      editForm.pincode === originalAddress.pincode
    ) {

      setMessage("ℹ️ No changes detected");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }
    try {

      const token =
        localStorage.getItem("token");

      const res = await fetch(
        `${BASE_URL}/addresses/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(editForm)
        }
      );

      if (res.ok) {

        setMessage("✅ Address updated successfully");

        setTimeout(() => {
          setMessage("");
        }, 3000);

        setEditingId(null);

        fetchAddresses();

      } else {

        setMessage("❌ Failed to update address");

        setTimeout(() => {
          setMessage("");
        }, 3000);
      }

    } catch (err) {

      console.error(err);

      setMessage("❌ Server error");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };
 const handleAddAddress = async () => {

   if (
     !newAddressForm.fullName ||
     !newAddressForm.phone ||
     !newAddressForm.addressLine ||
     !newAddressForm.city ||
     !newAddressForm.pincode
   ) {

     setMessage("❌ Please fill all fields");

     window.scrollTo({
       top: 0,
       behavior: "smooth"
     });

     setTimeout(() => {
       setMessage("");
     }, 3000);

     return;
   }

   try {

     const storedUser =
       localStorage.getItem("user");

     const user =
       JSON.parse(storedUser);

     const token =
       localStorage.getItem("token");

     const res = await fetch(
       `${BASE_URL}/addresses`,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
         },
         body: JSON.stringify({
           userId: user.id,
           ...newAddressForm
         })
       }
     );

     if (res.ok) {

       setMessage("✅ Address added successfully");

       window.scrollTo({
         top: 0,
         behavior: "smooth"
       });

       setTimeout(() => {
         setMessage("");
       }, 3000);

       setNewAddressForm({
         fullName: "",
         phone: "",
         addressLine: "",
         city: "",
         pincode: ""
       });

       setShowNewAddressForm(false);

       fetchAddresses();

     } else {

       const error = await res.text();

       setMessage(`❌ ${error}`);

       window.scrollTo({
         top: 0,
         behavior: "smooth"
       });

       setTimeout(() => {
         setMessage("");
       }, 3000);

     }

   } catch (err) {

     console.error(err);

     setMessage("❌ Server error");

     window.scrollTo({
       top: 0,
       behavior: "smooth"
     });

     setTimeout(() => {
       setMessage("");
     }, 3000);

   }

 };
  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this address?"
      );

    if (!confirmDelete) return;

    try {

      const token =
        localStorage.getItem("token");

      const res = await fetch(
        `${BASE_URL}/addresses/${id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (res.ok) {

        setMessage("✅ Address deleted successfully");
        window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                });
        setTimeout(() => {
          setMessage("");
        }, 3000);

        fetchAddresses();

      } else {

        const error = await res.text();

        setMessage(`❌ ${error}`);
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        setTimeout(() => {
          setMessage("");
        }, 3000);

      }

    } catch (err) {

      console.error(err);

      setMessage("❌ Server error");
         window.scrollTo({
           top: 0,
           behavior: "smooth"
         });
      setTimeout(() => {
        setMessage("");
      }, 3000);

    }

  };

  const handleCancel = () => {

    setEditingId(null);

    setEditForm({
      fullName: "",
      phone: "",
      addressLine: "",
      city: "",
      pincode: ""
    });
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

        <div className="address-page-header">

          <h2>My Addresses</h2>

          <button
            className="save-address-btn"
            onClick={() => {
              setShowNewAddressForm(
                !showNewAddressForm
              );

              setEditingId(null);
            }}
          >
            {
              showNewAddressForm
                ? "Cancel"
                : "+ Add New Address"
            }
          </button>

        </div>
        {showNewAddressForm && (

          <div
            className="profile-card"
            style={{ marginBottom: "20px" }}
          >

            <div className="edit-form">

              <input
                name="fullName"
                value={newAddressForm.fullName}
                onChange={handleNewAddressChange}
                placeholder="Full Name"
              />

              <input
                name="phone"
                value={newAddressForm.phone}
                onChange={handleNewAddressChange}
                placeholder="Phone"
              />

              <textarea
                name="addressLine"
                value={newAddressForm.addressLine}
                onChange={handleNewAddressChange}
                placeholder="Address"
              />

              <input
                name="city"
                value={newAddressForm.city}
                onChange={handleNewAddressChange}
                placeholder="City"
              />

              <input
                name="pincode"
                value={newAddressForm.pincode}
                onChange={handleNewAddressChange}
                placeholder="Pincode"
              />

              <div className="address-action-buttons">

                <button
                  className="save-address-btn"
                  onClick={handleAddAddress}
                >
                  Save Address
                </button>

                <button
                  className="cancel-address-btn"
                  onClick={() =>
                    setShowNewAddressForm(false)
                  }
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        )}
        {
          addresses.length === 0 ? (

            <p>No addresses found.</p>

          ) : (

            addresses.map((address) => (

              <div
                key={address.id}
                className="profile-card"
                style={{ marginBottom: "15px" }}
              >

                {
                  editingId === address.id ? (

                    <div className="edit-form">

                      <input
                        name="fullName"
                        value={editForm.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                      />

                      <input
                        name="phone"
                        value={editForm.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                      />

                      <textarea
                        name="addressLine"
                        value={editForm.addressLine}
                        onChange={handleChange}
                        placeholder="Address"
                      />

                      <input
                        name="city"
                        value={editForm.city}
                        onChange={handleChange}
                        placeholder="City"
                      />

                      <input
                        name="pincode"
                        value={editForm.pincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                      />

                      <div className="address-action-buttons">

                        <button
                          className="save-address-btn"
                          onClick={handleSave}
                        >
                          Save Changes
                        </button>

                        <button
                          className="cancel-address-btn"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>

                      </div>

                    </div>

                  ) : (

                    <>
                      <div className="address-header">

                        <span className="address-name">
                          {address.fullName}
                        </span>

                        <span className="address-phone">
                          {address.phone}
                        </span>

                      </div>

                      <div className="address-body">

                        <p>
                          {address.addressLine}
                        </p>

                        <p>
                          {address.city} - {address.pincode}
                        </p>

                      </div>

                      <div className="address-action-buttons">

                        <button
                          className="save-address-btn"
                          onClick={() => handleEdit(address)}
                        >
                          Edit Address
                        </button>

                        <button
                          className="cancel-address-btn"
                          onClick={() => handleDelete(address.id)}
                        >
                          Delete Address
                        </button>

                      </div>

                    </>

                  )
                }

              </div>

            ))

          )
        }

      </div>

    </div>
  );
}

export default MyAddresses;