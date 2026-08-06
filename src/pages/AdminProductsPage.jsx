import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsBoxSeam, BsPlusCircle } from "react-icons/bs";
import Loader from "../components/Loader";
import AdminProductCard from "../components/AdminProductCard";
import Pagination from "../components/Pagination";
import { useProducts } from "../context/products/ProductsContext";
import SearchProduct from "../components/SearchProduct";

function AdminProductsPage() {
  const { loading, products, refreshPagination } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexLastProduct = currentPage * productsPerPage;

  const indexFirstProduct = indexLastProduct - productsPerPage;

  const currentProducts = products.slice(indexFirstProduct, indexLastProduct);

  useEffect(() => {
    setCurrentPage(1);
  }, [refreshPagination]);

  const changePage = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="fw-bold d-flex align-items-center gap-2 mb-1">
            <BsBoxSeam />
            Products Management
          </h1>

          <p className="text-muted mb-0">
            Manage your store products ({products.length} total)
          </p>
        </div>

        <Link
          className="btn btn-success d-flex align-items-center gap-2"
          to="/admin/add-product"
        >
          <BsPlusCircle />
          Add Product
        </Link>
      </div>

      <SearchProduct admin={true} />

      {products.length === 0 ? (
        <div className="alert alert-warning text-center py-5">
          <h4>No products available</h4>

          <p className="mb-3">Start by creating your first product.</p>

          <Link className="btn btn-success" to="/admin/add-product">
            Add Product
          </Link>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {currentProducts.map((product) => (
              <div className="col-12 col-md-6 col-lg-4" key={product.id}>
                <AdminProductCard product={product} />
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={changePage}
            variant="success"
          />
        </>
      )}
    </div>
  );
}

export default AdminProductsPage;
