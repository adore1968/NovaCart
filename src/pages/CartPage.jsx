import { useCart } from "../context/cart/CartContext";
import CartItem from "../components/CartItem";
import Summary from "../components/Summary";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function CartPage() {
  const { cart } = useCart();

  return (
    <>
      <Helmet>
        <title>Shopping Cart | MyStore</title>

        <meta
          name="description"
          content="Review your selected products before completing your purchase."
        />
      </Helmet>

      <div className="container py-4">
        <h1 className="display-5 fw-bold mb-4">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <div className="alert alert-info text-center py-5">
            <h4>Your cart is empty</h4>
            <p className="mb-3">
              Looks like you haven't added any products yet.
            </p>

            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="d-flex flex-column gap-3">
                {cart.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <Summary />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CartPage;
