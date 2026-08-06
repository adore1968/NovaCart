import { BsPencilSquare } from "react-icons/bs";
import ProductForm from "../components/ProductForm";

function EditProductPage() {
  return (
    <div className="container py-4">
      <div className="mx-auto" style={{ maxWidth: "700px" }}>
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <h1 className="h3 fw-bold d-flex align-items-center gap-2 mb-2">
              <BsPencilSquare />
              Edit Product
            </h1>

            <p className="text-muted mb-4">
              Update the information below to edit this product.
            </p>

            <ProductForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProductPage;
