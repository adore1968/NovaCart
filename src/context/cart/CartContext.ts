import { createContext, useContext } from "react";
import type { ProductCart } from "../../types/cartTypes";
import type { Product } from "../../types/productsTypes";

export type CartContextType = {
  cart: ProductCart[];
  handleAddCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside of CartProvider");
  }
  return context;
};
