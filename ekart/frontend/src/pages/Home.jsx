import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
const [searchText, setSearchText] = useState("");
  useEffect(() => {
    fetch("http://localhost:8081/api/products")
      .then(res => res.json())
      .then(data => {
        console.log("Products:", data);
        setProducts(data);
      })
      .catch(err => console.error(err));
  }, []);

  const navigate = useNavigate();

 const filteredProducts = products.filter((p) => {

   const categoryMatch =
     selectedCategory === "All" ||
     (
       p.category &&
       p.category
         .trim()
         .toLowerCase() ===
       selectedCategory
         .trim()
         .toLowerCase()
     );

   const searchMatch =
     p.name?.toLowerCase().includes(
       searchText.toLowerCase()
     ) ||
     p.brand?.toLowerCase().includes(
       searchText.toLowerCase()
     ) ||
     p.category?.toLowerCase().includes(
       searchText.toLowerCase()
     );

   return categoryMatch && searchMatch;
 });

  return (
    <div>

      <Navbar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <div className="banner">
        <h2>Welcome to eKart</h2>
        <p>Best deals available here</p>
      </div>

      {/* Products Grid */}
      <div className="products-container">

        {filteredProducts.length === 0 ? (
          <p style={{ padding: "20px" }}>
            No products available
          </p>
        ) : (
          filteredProducts.map((p) => (
            <div
              key={p.id}
              className="product-card"
              onClick={() =>
                navigate(`/product/${p.id}`, {
                  state: { fromUI: true }
                })
              }
            >
              <img src={p.image} alt={p.name} />

              <h3>{p.name}</h3>

              <p className="price">₹{p.price}</p>

              <button className="btn-primary">
                Add to Cart
              </button>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Home;