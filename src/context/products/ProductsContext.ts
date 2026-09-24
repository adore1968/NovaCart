import { createContext, useContext } from "react";
import type { Product, ProductValid } from "../../types/productsTypes";

export type ProductsContextType = {
  loading: boolean;
  products: Product[];
  refreshPagination: number;
  getProduct: (id: string) => Promise<Product | undefined>;
  deleteProduct: (id: string) => Promise<void>;
  handleSearch: (search: string) => void;
  createProduct: (product: ProductValid) => Promise<void>;
  editProduct: (id: string, product: ProductValid) => Promise<void>;
};

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used inside of ProductsProvider");
  }
  return context;
};
