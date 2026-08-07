import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 | MyStore</title>

        <meta
          name="description"
          content="The page you are looking for does not exist."
        />
      </Helmet>

      <div className="container text-center py-5">
        <h1 className="display-1 fw-bold">404</h1>
        <h2>Page not found</h2>
        <p className="text-muted">
          The page you are looking for does not exist.
        </p>
        <Link to="/" className="btn btn-primary">
          Return to the home page
        </Link>
      </div>
    </>
  );
}

export default NotFound;
