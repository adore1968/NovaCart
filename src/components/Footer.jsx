import { Link } from "react-router-dom";
import {
  BsGithub,
  BsLinkedin,
  BsEnvelope,
  BsTelephone,
  BsShieldCheck,
  BsTruck,
  BsStar,
} from "react-icons/bs";

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 py-5">
      <div className="container">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-md-4">
            <h4 className="fw-bold">MyStore</h4>
            <p className="text-secondary">
              Your destination for gaming, electronics and premium accessories.
            </p>
          </div>

          {/* Links */}
          <div className="col-md-3">
            <h5 className="mb-3">Quick Links</h5>

            <ul className="list-unstyled">
              <li className="mb-2">
                <Link className="text-decoration-none text-light" to="/">
                  Home
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  className="text-decoration-none text-light"
                  to="/products"
                >
                  Products
                </Link>
              </li>

              <li className="mb-2">
                <Link className="text-decoration-none text-light" to="/cart">
                  Cart
                </Link>
              </li>

              <li>
                <Link className="text-decoration-none text-light" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3">
            <h5 className="mb-3">Contact</h5>

            <p className="mb-2 d-flex align-items-center gap-2">
              <BsEnvelope />
              jg345762@gmail.com
            </p>

            <p className="d-flex align-items-center gap-2">
              <BsTelephone />
              +54 11 1234-5678
            </p>
          </div>

          {/* Features */}
          <div className="col-md-2">
            <h5 className="mb-3">Why Us?</h5>

            <p className="mb-2 d-flex align-items-center gap-2">
              <BsTruck />
              Fast Shipping
            </p>

            <p className="mb-2 d-flex align-items-center gap-2">
              <BsShieldCheck />
              Secure Shopping
            </p>

            <p className="d-flex align-items-center gap-2">
              <BsStar />
              Premium Quality
            </p>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="mb-0 text-secondary">
            © 2026 MyStore. All rights reserved.
          </p>

          <div className="d-flex gap-3">
            <a
              href="https://github.com/adore1968"
              target="_blank"
              rel="noreferrer"
              className="text-light fs-4"
            >
              <BsGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/germán-gómez-8a6067246/"
              target="_blank"
              rel="noreferrer"
              className="text-light fs-4"
            >
              <BsLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
