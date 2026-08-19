import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import "./Address.css";
import BASE_URL from "../api/config";
import { placeOrder } from "../api/orderApi";
import {
  useNavigate,
  useLocation
} from "react-router-dom";
function Address() {

  const navigate = useNavigate();
  const location = useLocation();
  const buyNowItem =location.state?.buyNowItem;
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] =
    useState(false);
  const [loading, setLoading] =
      useState(false);

  const [message, setMessage] = useState("");

  const messageRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  const [cart, setCart] = useState([]);

  const showMessage = (text) => {

    setMessage(text);

    setTimeout(() => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }, 100);

    setTimeout(() => {

      setMessage("");

    }, 3000);
  };

  useEffect(() => {

    const fetchData = async () => {

      const storedUser =
        localStorage.getItem("user");

      if (!storedUser) return;

      const user = JSON.parse(storedUser);
          if (
          cart.length === 0 &&
          !buyNowItem
        ) {

          showMessage(
            "❌ Your cart is empty"
          );

          setLoading(false);

          return;
        }

      try {

        const cartRes = await fetch(
          `${BASE_URL}/cart/user/${user.id}`
        );

        const cartData =
          await cartRes.json();

        setCart(cartData);

        const token =
          localStorage.getItem("token");

        const addressRes = await fetch(
          `${BASE_URL}/addresses/user/${user.id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        const addressData =
          await addressRes.json();

        setSavedAddresses(addressData);

        if (addressData.length > 0) {
          setSelectedAddress(addressData[0]);
        }

      } catch (err) {

        console.error(err);
      }
    };

    fetchData();

  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

     const handlePlaceOrder = async () => {

       if (loading) return;

       setLoading(true);

       const storedUser =
         localStorage.getItem("user");

    const user =
      JSON.parse(storedUser);

    let finalAddress;

    if (showNewAddressForm) {

      if (
        !form.name ||
        !form.phone ||
        !form.address
      ) {

        showMessage(
          "❌ Please fill all required fields"
        );
        setLoading(false);
        return;
      }

      finalAddress = {
        fullName: form.name,
        phone: form.phone,
        addressLine: form.address,
        city: form.city,
        pincode: form.pincode
      };

    } else {

      finalAddress = selectedAddress;
    }

    if (!finalAddress) {

      showMessage(
        "❌ Please select an address"
      );
setLoading(false);
      return;
    }

    const orderItems = buyNowItem
      ? [
          {
            productId:
              buyNowItem.productId,
            quantity:
              buyNowItem.quantity,
            price:
              buyNowItem.price,
            totalAmount:
              buyNowItem.price *
              buyNowItem.quantity
          }
        ]
      : cart.map((item) => ({
          productId:
            item.productId,
          quantity:
            item.quantity,
          price:
            item.price,
          totalAmount:
            item.price *
            item.quantity
        }));

    const totalAmount = buyNowItem
      ? buyNowItem.price *
        buyNowItem.quantity
      : cart.reduce(
          (total, item) =>
            total +
            item.price *
              item.quantity,
          0
        );


    try {

      const token =
        localStorage.getItem("token");

      if (showNewAddressForm) {

        const saveAddressRes = await fetch(
          `${BASE_URL}/addresses`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`
            },
            body: JSON.stringify({
              userId: user.id,
              fullName: form.name,
              phone: form.phone,
              addressLine: form.address,
              city: form.city,
              pincode: form.pincode
            })
          }
        );

        if (!saveAddressRes.ok) {

          showMessage(
            "This address already exists in your saved addresses ❌"
          );
setLoading(false);
          return;
        }
    const addressRes = await fetch(
      `${BASE_URL}/addresses/user/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

        const addresses = await addressRes.json();

        // Take the newest address
        finalAddress = addresses[0];

      }
    const orderData = {

      userId: user.id,

      addressId: finalAddress.id,

      address:
        finalAddress.addressLine,

      fullName:
        finalAddress.fullName,

      phone:
        finalAddress.phone,

      city:
        finalAddress.city,

      pincode:
        finalAddress.pincode,

      totalAmount,

      items: orderItems
    };
      console.log(orderData);
      const res =
        await placeOrder(orderData);
        console.log(orderData,"<------------------------------");

      if (res.ok) {

        if (!buyNowItem) {

          await fetch(
            `${BASE_URL}/cart/clear/${user.id}`,
            {
              method: "DELETE"
            }
          );
        }
        setLoading(false);
        showMessage(
          "✅ Order placed successfully"
        );

        setTimeout(() => {

          navigate("/home");

        }, 2500);

      } else {
         setLoading(false);

        showMessage(
          "❌ Failed to place order"
        );
      }

    } catch (err) {

      console.error(err);
     setLoading(false);
      showMessage(
        "❌ Server error"
      );
    }
  };

  return (

    <div>

      <Navbar />

      {message && (
        <div
           ref={messageRef}
              className={
                message.includes("❌")
                  ? "error-message"
                  : "success-message" }
        >
          {message}
        </div>
      )}

      <div className="address-container">

        <h2>Delivery Address</h2>
           {buyNowItem && (

             <div className="buy-now-summary">

               <h3>Buying Now</h3>

               <p>
                 {buyNowItem.name}
               </p>

               <p>
                 Qty: {buyNowItem.quantity}
               </p>

               <p>
                 Total:
                 ₹
                 {buyNowItem.price *
                   buyNowItem.quantity}
               </p>

             </div>

           )}
        {savedAddresses.length > 0 && (

          <>
            <h3>Saved Addresses</h3>

            <select
              className="address-select"
              value={
                selectedAddress?.id || ""
              }
              onChange={(e) => {

                const selected =
                  savedAddresses.find(
                    (a) =>
                      a.id ===
                      Number(
                        e.target.value
                      )
                  );

                setSelectedAddress(
                  selected
                );

                setShowNewAddressForm(
                  false
                );
              }}
            >

              {savedAddresses.map(
                (address) => (

                  <option
                    key={address.id}
                    value={address.id}
                  >
                    {address.fullName}
                    {" - "}
                    {address.city}
                  </option>

                )
              )}

            </select>
          </>
        )}

        <button
          className="add-address-btn"
          onClick={() =>
            setShowNewAddressForm(
              !showNewAddressForm
            )
          }
        >
          + Add New Address
        </button>

        <hr />

        {showNewAddressForm ? (

          <div className="edit-form">

            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Full Address"
              onChange={handleChange}
            />

            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
            />

            <input
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
            />

          </div>

        ) : (

          selectedAddress && (

            <div className="selected-address-card">

              <h4>
                Selected Address
              </h4>

              <p>
                <strong>
                  {selectedAddress.fullName}
                </strong>
              </p>

              <p>
                {selectedAddress.phone}
              </p>

              <p>
                {
                  selectedAddress.addressLine
                }
              </p>

              <p>
                {selectedAddress.city}
                {" - "}
                {
                  selectedAddress.pincode
                }
              </p>

            </div>

          )
        )}

        <button
                   className="place-order-btn"
                   onClick={handlePlaceOrder}
                   disabled={loading}
                 >
                   {
                     loading
                       ? "Placing Order..."
                       : "Place Order"
                   }
                 </button>

      </div>

    </div>
  );
}

export default Address;