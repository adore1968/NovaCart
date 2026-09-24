import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BsHouse,
  BsBoxSeam,
  BsCart3,
  BsPerson,
  BsShieldLock,
  BsBoxArrowRight,
  BsList,
  BsX,
} from "react-icons/bs";
import { useAuth } from "../context/auth/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState<boolean>(false);

  const closeMenu = (): void => setOpen(false);

  const handleLogout = (): void => {
    logout();
    closeMenu();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/" onClick={closeMenu}>
          MyStore
        </Link>

        <button
          className="navbar-toggler border border-light"
          type="button"
          onClick={() => setOpen(!open)}
        >
          {open ? <BsX size={28} /> : <BsList size={28} />}
        </button>

        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-2"
                to="/"
                onClick={closeMenu}
              >
                <BsHouse />
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-2"
                to="/products"
                onClick={closeMenu}
              >
                <BsBoxSeam />
                Products
              </Link>
            </li>

            {!user && (
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center gap-2"
                  to="/login"
                  onClick={closeMenu}
                >
                  <BsPerson />
                  Login
                </Link>
              </li>
            )}

            {user?.role === "user" && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center gap-2"
                    to="/cart"
                    onClick={closeMenu}
                  >
                    <BsCart3 />
                    Cart
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center gap-2"
                    to="/profile"
                    onClick={closeMenu}
                  >
                    <BsPerson />
                    Profile
                  </Link>
                </li>
              </>
            )}

            {user?.role === "admin" && (
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center gap-2"
                  to="/admin/products"
                  onClick={closeMenu}
                >
                  <BsShieldLock />
                  Admin
                </Link>
              </li>
            )}

            {user && (
              <li className="nav-item mt-2 mt-lg-0">
                <button
                  className="btn btn-danger d-flex align-items-center gap-2"
                  onClick={handleLogout}
                >
                  <BsBoxArrowRight />
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
