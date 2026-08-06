import { useEffect, useState } from "react";
import { BsBoxSeam } from "react-icons/bs";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { useProducts } from "../context/products/ProductsContext";
import SearchProduct from "../components/SearchProduct";

function ProductsPage() {
  const { loading, products, refreshPagination } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold d-flex align-items-center gap-2 mb-1">
            <BsBoxSeam />
            Products
          </h1>

          <p className="text-muted mb-0">
            {products.length} products available
          </p>
        </div>
      </div>
      <SearchProduct />

      {products.length === 0 ? (
        <div className="alert alert-info text-center py-5">
          <h4>No products found</h4>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {currentProducts.map((product) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={product.id}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        </>
      )}
    </div>
  );
}

export default ProductsPage;
