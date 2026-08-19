import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-price">₹{product.price}</p>

        <button className="add-btn">Add to Cart</button>
      </div>

    </div>
  );
}

export default ProductCard;