import { Helmet } from "react-helmet-async";
import {
  BsPersonCircle,
  BsCart,
  BsShieldLock,
  BsBoxSeam,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";

function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <>
      <Helmet>
        <title>Profile | MyStore</title>
        <meta
          name="description"
          content="Manage your MyStore account information and settings."
        />
      </Helmet>

      <div className="container py-5">
        <h1 className="fw-bold mb-4">My Profile</h1>

        <div className="row g-4">
          {/* User info */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center">
                <BsPersonCircle size={90} className="text-primary mb-3" />

                <h3 className="fw-bold">Hello User</h3>

                <p className="text-muted mb-1">{user?.email}</p>

                <span className="badge bg-primary text-capitalize">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h4 className="fw-bold mb-4">Quick Actions</h4>

                <Link
                  to="/cart"
                  className="btn btn-outline-primary w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
                >
                  <BsCart />
                  My Cart
                </Link>

                <button
                  className="btn btn-outline-secondary w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
                  disabled
                >
                  <BsBoxSeam />
                  My Orders (Coming Soon)
                </button>

                <button
                  className="btn btn-outline-warning w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
                  disabled
                >
                  <BsShieldLock />
                  Change Password
                </button>

                <button onClick={logout} className="btn btn-danger w-100">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
