import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { BsCheckCircle } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/products/ProductsContext";
import { uploadImage } from "../services/cloudinary";
import { VscLoadingCompact } from "react-icons/vsc";

function ProductForm() {
  const {
    formState: { errors },
    control,
    register,
    reset,
    handleSubmit,
  } = useForm();
  const [preview, setPreview] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(false);

  const { getProduct, createProduct, editProduct } = useProducts();
  const navigate = useNavigate();
  const { id } = useParams();

  const image = useWatch({
    control,
    name: "image",
  });

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      const product = await getProduct(id);
      setCurrentImage(product.imageUrl);

      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
      });
    };

    loadProduct();
  }, [id, getProduct, reset]);

  useEffect(() => {
    if (!image?.length) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(image[0]);

    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      let imageUrl = currentImage;

      if (data.image?.length > 0) {
        const uploadedImage = await uploadImage(data.image[0]);
        imageUrl = uploadedImage.secure_url;
      }

      const product = {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        imageUrl,
      };

      if (id) {
        await editProduct(id, product);
      } else {
        await createProduct(product);
      }

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Product Name
        </label>

        <input
          type="text"
          id="name"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          placeholder="Gaming Mouse"
          {...register("name", {
            required: "Product name is required",
          })}
        />

        <div className="invalid-feedback">{errors.name?.message}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>

        <textarea
          id="description"
          rows="4"
          className={`form-control ${errors.description ? "is-invalid" : ""}`}
          placeholder="Describe the product..."
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters long",
            },
          })}
        />

        <div className="invalid-feedback">{errors.description?.message}</div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>

          <input
            type="number"
            id="price"
            step="0.01"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            placeholder="49.99"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: {
                value: 0.01,
                message: "Price must be greater than 0",
              },
            })}
          />

          <div className="invalid-feedback">{errors.price?.message}</div>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>

          <select
            id="category"
            className={`form-select ${errors.category ? "is-invalid" : ""}`}
            {...register("category", {
              required: "Category is required",
            })}
          >
            <option value="">Select a category</option>
            <option value="Gaming">Gaming</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Office">Office</option>
          </select>

          <div className="invalid-feedback">{errors.category?.message}</div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="form-label">
          Product Image
        </label>

        <input
          type="file"
          id="image"
          accept="image/*"
          className={`form-control ${errors.image ? "is-invalid" : ""}`}
          {...register("image", {
            required: !id && "Product image is required",
          })}
        />

        {(preview || currentImage) && (
          <div className="text-center mt-4">
            <p className="fw-semibold text-muted mb-2">Image Preview</p>

            <img
              src={preview || currentImage}
              alt="Preview"
              className="img-thumbnail shadow-sm rounded"
              style={{
                width: "300px",
                height: "300px",
                objectFit: "cover",
              }}
            />
          </div>
        )}
        <small className="text-muted">
          {id
            ? "Leave empty to keep the current image."
            : "Select an image for the product."}
        </small>

        {errors.image && (
          <div className="invalid-feedback">{errors.image.message}</div>
        )}
      </div>

      <button
        className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
        type="submit"
        disabled={VscLoadingCompact}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sn"
              aria-hidden="true"
            ></span>
            <span>{id ? "Updating..." : "Creating..."}</span>
          </>
        ) : (
          <>
            <BsCheckCircle />
            {id ? "Update Product" : "Create Product"}
          </>
        )}
      </button>
    </form>
  );
}

export default ProductForm;
