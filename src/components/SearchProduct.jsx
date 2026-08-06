import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import { useProducts } from "../context/products/ProductsContext";

function SearchProduct({ admin }) {
  const { register } = useForm();
  const { handleSearch } = useProducts();

  return (
    <div className="input-group mb-4">
      <span className="input-group-text">
        <BsSearch />
      </span>

      <input
        type="text"
        className="form-control"
        placeholder={
          admin ? "Search producs to manage..." : "Search products..."
        }
        {...register("product", {
          onChange: (e) => handleSearch(e.target.value),
        })}
      />
    </div>
  );
}

export default SearchProduct;
