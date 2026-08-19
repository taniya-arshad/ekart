import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState, useRef, useEffect } from "react";

function Navbar({
  selectedCategory,
  setSelectedCategory,
  searchText,
  setSearchText
}){

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [showMenu, setShowMenu] = useState(false);
  const [showAdminMenu, setShowAdminMenu] =
    useState(false);

  const dropdownRef = useRef(null);
  const adminRef = useRef(null);
  const categories = [
    "Beauty & Personal Care",
    "Books",
    "Boys' Fashion",
    "Computers",
    "Deals",
    "Digital Music",
    "Electronics",
    "Girls' Fashion",
    "Health & Household",
    "Home & Kitchen",
    "Industrial & Scientific",
    "Kindle Store",
    "Luggage",
    "Men's Fashion",
    "Pet Supplies",
    "Software",
    "Sports & Outdoors"
  ];

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {

    function handleClickOutside(event) {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  return (

    <div className="navbar">

      {/* LEFT SECTION */}
      <div className="nav-left">

        <div
          className="logo"
          onClick={() => navigate("/home")}
        >
          eKart
        </div>

      </div>

      {/* SEARCH + DROPDOWN */}
      <div className="search-container">

        {/* DROPDOWN */}
        <div
          className="dept-dropdown"
          ref={dropdownRef}
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
        >

          {selectedCategory} ▼

          {showMenu && (

            <div className="dropdown-menu">

              {/* ALL CATEGORY */}
              <div
                onClick={() => {
                  setSelectedCategory("All");
                  setShowMenu(false);
                }}
              >
                All
              </div>

              {/* CATEGORY LIST */}
              {categories.map((item, index) => (

                <div
                  key={index}
                  onClick={() => {
                    setSelectedCategory(item);
                    setShowMenu(false);
                  }}
                >
                  {item}
                </div>

              ))}

            </div>

          )}

        </div>

        {/* SEARCH INPUT */}
        <input
          type="text"
          placeholder="Search for products, brands and more"
          className="search-bar"
          value={searchText}
          onChange={(e) =>
            setSearchText(e.target.value)
          }
        />

        {/* SEARCH BUTTON */}
        <button className="search-btn">
          🔍
        </button>

      </div>

      {/* RIGHT SECTION */}
      <div className="nav-actions">

        {token ? (

          <div
            className="nav-item"
            onClick={() => navigate("/profile")}
          >
            My Account
          </div>

        ) : (

          <div
            className="nav-item"
            onClick={() => navigate("/login")}
          >
            Login
          </div>

        )}

        {user?.role === "ADMIN" && (

          <div
            className="admin-dropdown"
            ref={adminRef}
          >

            <div
              className="nav-item"
              onClick={(e) => {

                e.stopPropagation();

                setShowAdminMenu(
                  !showAdminMenu
                );
              }}
            >
              Admin Panel ▼
            </div>

            {showAdminMenu && (
          <div className="admin-menu">

            <div
              onClick={() => {
                navigate("/admin/dashboard");
                setShowAdminMenu(false);
              }}
            >
              Admin Dashboard
            </div>

            <div
              onClick={() => {
                navigate("/admin/products");
                setShowAdminMenu(false);
              }}
            >
              Manage Products
            </div>

            <div
              onClick={() => {
                navigate("/admin/add-product");
                setShowAdminMenu(false);
              }}
            >
              Add Product
            </div>

            <div
              onClick={() => {
                navigate("/admin/orders");
                setShowAdminMenu(false);
              }}
            >
              Manage Orders
            </div>

          </div>


            )}

          </div>

        )}
        {user?.role !== "ADMIN" && (

          <div
            className="nav-item"
            onClick={() => navigate("/cart")}
          >
            Cart 🛒
          </div>

        )}

      </div>

    </div>
  );
}

export default Navbar;