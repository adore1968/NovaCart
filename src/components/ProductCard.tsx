import { Link } from "react-router-dom";
import { BsCartPlus, BsEye, BsStarFill } from "react-icons/bs";
import { useAuth } from "../context/auth/AuthContext";
import { useCart } from "../context/cart/CartContext";
import type { Product } from "../types/productsTypes";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { id, imageUrl, category, name, description, price } = product;
  const { handleAddCart } = useCart();
  const { user } = useAuth();

  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={imageUrl}
        alt={name}
        className="card-img-top"
        style={{ height: "240px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge bg-secondary text-capitalize">{category}</span>

          <small className="text-warning d-flex align-items-center gap-1">
            <BsStarFill />
            4.8
          </small>
        </div>

        <h5 className="card-title fw-semibold">{name}</h5>

        <p className="card-text text-muted flex-grow-1">
          {description.length > 80
            ? description.slice(0, 80) + "..."
            : description}
        </p>

        <h4 className="text-primary fw-bold mb-3">${price.toFixed(2)}</h4>

        <div className="d-grid gap-2">
          <Link
            className="btn btn-outline-primary d-flex justify-content-center align-items-center gap-2"
            to={`/products/${id}`}
          >
            <BsEye />
            View Details
          </Link>

          {user?.role === "user" && (
            <button
              className="btn btn-primary d-flex justify-content-center align-items-center gap-2"
              onClick={() => handleAddCart(product)}
            >
              <BsCartPlus />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
