import { BsCartCheck, BsTrash } from "react-icons/bs";
import { useCart } from "../context/cart/CartContext";

function Summary() {
  const { cart, clearCart } = useCart();

  const total = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );

  return (
    <div className="card shadow-sm sticky-top" style={{ top: "90px" }}>
      <div className="card-body">
        <h3 className="card-title d-flex align-items-center gap-2 mb-4">
          <BsCartCheck />
          Order Summary
        </h3>

        <div className="d-flex justify-content-between mb-2">
          <span>Items</span>
          <strong>{cart.length}</strong>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <span>Total</span>
          <strong className="fs-4 text-primary">${total.toFixed(2)}</strong>
        </div>

        <hr />

        <button className="btn btn-success w-100 mb-2" type="button">
          Checkout
        </button>

        <button
          className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
          type="button"
          onClick={clearCart}
        >
          <BsTrash />
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Summary;
