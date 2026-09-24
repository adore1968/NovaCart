import { useState, type ReactNode } from "react";
import { toast } from "react-toastify";
import { useProducts } from "../products/ProductsContext";
import { CartContext } from "./CartContext";
import type { Product } from "../../types/productsTypes";
import type { ProductCart } from "../../types/cartTypes";

export type CartProviderProps = {
  children: ReactNode;
};

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<ProductCart[]>([]);

  const { products } = useProducts();

  const handleAddCart = (product: Product): void => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);

      if (exists) {
        return prevCart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }

      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        },
      ];
    });
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (id: string): void => {
    const product = products.find((product) => product.id === id);
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    toast.success(`${product?.name || "Product"} removed from cart`);
  };

  const clearCart = (): void => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      setCart([]);
      toast.success("Your cart has been cleared");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, handleAddCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
