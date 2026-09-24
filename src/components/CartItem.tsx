import { BsTrash } from "react-icons/bs";
import { useCart } from "../context/cart/CartContext";
import type { ProductCart } from "../types/cartTypes";

type CartItemProps = {
  product: ProductCart;
};

function CartItem({ product }: CartItemProps) {
  const { id, imageUrl, name, price, quantity } = product;
  const { removeFromCart } = useCart();

  return (
    <div className="card shadow-sm">
      <div className="row g-0 align-items-center">
        <div className="col-4 col-md-2">
          <img
            src={imageUrl}
            alt={name}
            className="img-fluid rounded-start"
            style={{ height: "120px", objectFit: "cover", width: "100%" }}
          />
        </div>

        <div className="col-8 col-md-10">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className="card-title text-capitalize mb-2">{name}</h5>

                <p className="text-muted mb-1">
                  Quantity: <strong>{quantity}</strong>
                </p>

                <h5 className="text-primary mb-0">${price}</h5>
              </div>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeFromCart(id)}
              >
                <BsTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
