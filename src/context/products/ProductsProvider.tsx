import { useEffect, useState, type ReactNode } from "react";
import {
  getProductRequest,
  getProductsRequest,
  deleteProductRequest,
  createProductRequest,
  editProductRequest,
} from "../../api/products";
import { toast } from "react-toastify";
import { ProductsContext } from "./ProductsContext";
import type {
  Product,
  ProductFormType,
  ProductValid,
} from "../../types/productsTypes";
import axios from "axios";

type ProductsProviderProps = {
  children: ReactNode;
};

function ProductsProvider({ children }: ProductsProviderProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [refreshPagination, setRefreshPagination] = useState<number>(0);

  const handleSearch = (value: string): void => {
    setSearch(value.trim());
    setRefreshPagination((prev) => prev + 1);
  };

  const getProducts = async (search: string): Promise<void> => {
    try {
      const res = await getProductsRequest(search);
      setProducts(res.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setProducts([]);
      } else {
        console.log(error);
        toast.error("Error loading products");
      }
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async (id: string): Promise<Product | undefined> => {
    try {
      const res = await getProductRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Error loading product");
    }
  };

  const createProduct = async (product: ProductValid): Promise<void> => {
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

  const editProduct = async (
    id: string,
    product: ProductValid,
  ): Promise<void> => {
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

  const deleteProduct = async (id: string): Promise<void> => {
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
