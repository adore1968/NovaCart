import { Link } from "react-router-dom";
import {
  BsArrowRight,
  BsBoxSeam,
  BsController,
  BsCpu,
  BsHeadphones,
  BsTruck,
  BsShieldCheck,
  BsStar,
} from "react-icons/bs";
import { useAuth } from "../context/auth/AuthContext";

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="container py-5">
      {/* Hero */}
      <div className="bg-dark text-white rounded-4 p-5 mb-5">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <h1 className="display-4 fw-bold mb-3">Welcome to MyStore</h1>

            <p className="lead mb-4">
              Discover premium gaming, electronics and office accessories at the
              best prices.
            </p>

            <div className="d-flex gap-3 flex-wrap">
              <Link
                to="/products"
                className="btn btn-primary btn-lg d-flex align-items-center gap-2"
              >
                Shop Now
                <BsArrowRight />
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin/products"
                  className="btn btn-outline-light btn-lg"
                >
                  Admin Panel
                </Link>
              )}
            </div>
          </div>

          <div className="col-lg-5 text-center mt-4 mt-lg-0">
            <BsBoxSeam size={180} />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 text-center">
            <div className="card-body">
              <BsTruck size={45} className="text-primary mb-3" />
              <h5>Fast Shipping</h5>
              <p className="text-muted">
                Receive your products quickly and safely.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 text-center">
            <div className="card-body">
              <BsShieldCheck size={45} className="text-success mb-3" />
              <h5>Secure Shopping</h5>
              <p className="text-muted">
                Your purchases are protected from start to finish.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 text-center">
            <div className="card-body">
              <BsStar size={45} className="text-warning mb-3" />
              <h5>Premium Quality</h5>
              <p className="text-muted">
                Carefully selected products with the best quality.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <h2 className="fw-bold mb-4">Shop by Category</h2>

      <div className="row g-4 mb-5">
        <div className="col-6 col-lg-3">
          <div className="card h-100 shadow-sm border-0 text-center">
            <div className="card-body py-4">
              <BsController size={45} className="text-primary mb-3" />
              <h5>Gaming</h5>
            </div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card h-100 shadow-sm border-0 text-center">
            <div className="card-body py-4">
              <BsCpu size={45} className="text-primary mb-3" />
              <h5>Electronics</h5>
            </div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card h-100 shadow-sm border-0 text-center">
            <div className="card-body py-4">
              <BsHeadphones size={45} className="text-primary mb-3" />
              <h5>Accessories</h5>
            </div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="card h-100 shadow-sm border-0 text-center">
            <div className="card-body py-4">
              <BsBoxSeam size={45} className="text-primary mb-3" />
              <h5>Office</h5>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-light rounded-4 p-5 text-center">
        <h2 className="fw-bold mb-3">Ready to start shopping?</h2>

        <p className="text-muted mb-4">
          Browse our catalog and find your next favorite product.
        </p>

        <Link
          to="/products"
          className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2"
        >
          Browse Products
          <BsArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
