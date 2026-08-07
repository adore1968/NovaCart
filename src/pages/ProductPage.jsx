import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import Loader from "../components/Loader";
import { useProducts } from "../context/products/ProductsContext";
import { useCart } from "../context/cart/CartContext";
import { useAuth } from "../context/auth/AuthContext";
import { Helmet } from "react-helmet-async";

function ProductPage() {
  const { id } = useParams();
  const { getProduct } = useProducts();
  const { handleAddCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await getProduct(id);
      setProduct(data);
    };

    loadProduct();
  }, [id, getProduct]);

  if (!product) return <Loader />;

  return (
    <>
      <Helmet>
        <title>
          {product ? `${product.name} | MyStore` : "Product | MyStore"}
        </title>

        {product && <meta name="description" content={product.description} />}
      </Helmet>

      <div className="container py-5">
        <div className="card shadow-sm border-0">
          <div className="row g-0">
            <div className="col-lg-6">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="img-fluid rounded-start w-100"
                style={{ height: "500px", objectFit: "cover" }}
              />
            </div>

            <div className="col-lg-6">
              <div className="card-body h-100 d-flex flex-column">
                <span className="badge bg-secondary align-self-start text-capitalize mb-3">
                  {product.category}
                </span>

                <h2 className="fw-bold">{product.name}</h2>

                <h3 className="text-primary my-3">
                  ${product.price.toFixed(2)}
                </h3>

                <p className="text-muted flex-grow-1">{product.description}</p>

                {user?.role === "user" && (
                  <button
                    className="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2"
                    onClick={() => handleAddCart(product)}
                  >
                    <BsCartPlus />
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
