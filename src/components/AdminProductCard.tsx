import { Link } from "react-router-dom";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { useProducts } from "../context/products/ProductsContext";
import type { Product } from "../types/productsTypes";

type AdminProductCardProps = {
  product: Product;
};

function AdminProductCard({ product }: AdminProductCardProps) {
  const { id, imageUrl, category, name, price } = product;
  const { deleteProduct } = useProducts();

  const handleDeleteProduct = (id: string): void => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={imageUrl}
        alt={name}
        className="card-img-top"
        style={{ height: "220px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <span className="badge bg-secondary align-self-start text-capitalize mb-2">
          {category}
        </span>

        <h5 className="card-title fw-semibold">{name}</h5>

        <h4 className="text-primary fw-bold mb-4">${price.toFixed(2)}</h4>

        <div className="mt-auto d-grid gap-2">
          <Link
            className="btn btn-warning d-flex align-items-center justify-content-center gap-2"
            to={`/admin/edit-product/${id}`}
          >
            <BsPencilSquare />
            Edit
          </Link>

          <button
            className="btn btn-danger d-flex align-items-center justify-content-center gap-2"
            type="button"
            onClick={() => handleDeleteProduct(id)}
          >
            <BsTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProductCard;
