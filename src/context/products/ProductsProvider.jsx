import { useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import {
  getProductRequest,
  getProductsRequest,
  deleteProductRequest,
  createProductRequest,
  editProductRequest,
} from "../../api/products";
import { toast } from "react-toastify";

function ProductsProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshPagination, setRefreshPagination] = useState(0);

  const handleSearch = (value) => {
    setSearch(value.trim());
    setRefreshPagination((prev) => prev + 1);
  };

  const getProducts = async (search) => {
    try {
      const res = await getProductsRequest(search);
      setProducts(res.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setProducts([]);
      } else {
        console.log(error);
        toast.error("Error loading products");
      }
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async (id) => {
    try {
      const res = await getProductRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Error loading product");
    }
  };

  const createProduct = async (product) => {
    try {
      const res = await createProductRequest(product);

      setProducts((prevProducts) => [...prevProducts, res.data]);

      setRefreshPagination((prev) => prev + 1);

      toast.success("Product created successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error creating product");
    }
  };

  const editProduct = async (id, product) => {
    try {
      const res = await editProductRequest(id, product);

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === res.data.id ? res.data : product,
        ),
      );

      toast.success("Product updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error updating product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductRequest(id);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id),
      );

      setRefreshPagination((prev) => prev + 1);

      toast.success("Product deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
    }
  };

  useEffect(() => {
    getProducts(search);
  }, [search]);

  return (
    <ProductsContext.Provider
      value={{
        loading,
        products,
        refreshPagination,
        getProducts,
        getProduct,
        createProduct,
        editProduct,
        deleteProduct,
        handleSearch,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsProvider;
