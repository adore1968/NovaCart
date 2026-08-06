import { BsPlusCircle } from "react-icons/bs";
import ProductForm from "../components/ProductForm";

function CreateProductPage() {
  return (
    <div className="container py-4">
      <div className="mx-auto" style={{ maxWidth: "700px" }}>
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <h1 className="h3 fw-bold d-flex align-items-center gap-2 mb-2">
              <BsPlusCircle />
              Add Product
            </h1>

            <p className="text-muted mb-4">
              Fill in the information below to create a new product.
            </p>

            <ProductForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProductPage;
